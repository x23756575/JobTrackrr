import React, {useEffect, useRef, useState} from 'react';
import axios, { AxiosError } from 'axios';
import gsap from 'gsap';
import './App.css';
import {motion, AnimatePresence, scale} from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProgressBar from "./ProgressBar";
import robot from "./assets/robot.png";
import bg from "./assets/jbg.png";
import circle from "./assets/greycircle.png";
import { InferenceClient } from "@huggingface/inference";
import {Link, useNavigate} from "react-router-dom";
import { OpenAI } from "openai";



export interface ResumeData {
    experienceScore: number;
    educationScore: number;
    skillsScore: number;
    projectsScore: number;
}

interface ScoreMessage {
    text: string;
    color: string;
}


export default function ResumePage(): React.ReactElement {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [hideFile, setHideFile] = useState<boolean>(false);
    const [showSpeech, setShowSpeech] = useState<boolean>(false);
    const [showAdvice, setShowAdvice] = useState<boolean>(false);
    const [ai ,setAI] = useState<string | undefined>(null);
    const [advice, setAdvice] = useState<string>('');
    const [result,setResult] = useState<string>('');
    const [aiLoading, setAiLoading] = useState<boolean>(false);
    const [matchScore, setMatchScore] = useState<number>(0);
    const [paid, setPaid] = useState<boolean>(false);


    const leftCircle = useRef<HTMLImageElement>(null);
    const middleCircle = useRef<HTMLImageElement>(null);
    const rightCircle = useRef<HTMLImageElement>(null);

    const navigate = useNavigate();


    const isMobile = window.innerWidth < 768;

    useEffect(() => {
        if (!leftCircle.current || !middleCircle.current || !rightCircle.current) return;

        gsap.to(leftCircle.current, {
            y: 5, // Reduced animation amplitude
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: 'back.out(1)',
        });

        gsap.to(middleCircle.current, {
            y: 5, // Reduced animation amplitude
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: 'back.out(1)',
            delay: 0.2,  // slight delay to stagger animation
        });

        gsap.to(rightCircle.current, {
            y: 5, // Reduced animation amplitude
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: 'back.out(1)',
            delay: 0.4,  // stagger delay
        });

    }, []);

    useEffect(() => {

        async function fetchPaidStatus() {
            try {
                const timer = setTimeout(async () => {
                    const response = await fetch('http://localhost:8080/haspaid');
                    const hasPaid = await response.json();
                    setPaid(hasPaid)
                    console.log(hasPaid);
                },100);
                return () => clearTimeout(timer);

            } catch (error) {
                console.error(error);
            }
        }fetchPaidStatus()
    }, []);


    const [scores, setScores] = useState({
        experience: '',
        education: '',
        skills: '',
        projects: ''
    });
    const [adviceDone, setAdviceDone] = useState<boolean>(false);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        },
        exit: {
            opacity: 0,
            y: -20,
            transition: { duration: 0.3 }
        }
    };

    useEffect(() => {
        if (adviceDone && advice) {
            const utterance = new SpeechSynthesisUtterance(advice);
            const voices = window.speechSynthesis.getVoices();
            const robotVoice = voices.find((v) => v.name === "Google UK English Male");

            if (robotVoice) utterance.voice = robotVoice;

            utterance.lang = 'en-GB';
            utterance.rate = 0.9;
            utterance.pitch = 0.6;

            window.speechSynthesis.speak(utterance);
            setAdviceDone(false);
        }
    }, [adviceDone, advice]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            toast.info('File selected successfully!');
        }
    };

    const handleSubmit = async (): Promise<void> => {
        if (!selectedFile) {
            toast.error('Please select a file before submitting');
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://192.168.1.4:8080/resume', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data)
            setResumeData(response.data);
            calculateMessage(response.data);
            setMatchScore(response.data.score)

            setHideFile(true);
            toast.success('Resume analyzed successfully!');
        } catch (err) {
            const axiosError = err as AxiosError;
            toast.error(`Upload failed: ${axiosError.response?.data || 'Unknown error'}`);
            setResumeData(null);
            setHideFile(false);
        } finally {
            setIsLoading(false);
        }
    };


    const calculateMessage = (data: ResumeData) => {
        const getScoreMessage = (score: number, max: number): ScoreMessage => {
            const percentage = (score / max) * 100;
            if (percentage < 50) return {
                text: 'Your score suggests room for growth in this area. Consider adding more relevant details.',
                color: 'text-red-500'
            };
            if (percentage < 80) return {
                text: "You're showing promise here! A few more specific achievements could make this even stronger.",
                color: 'text-yellow-500'
            };
            return {
                text: "Impressive strength in this area! Your experience really stands out.",
                color: 'text-green-500'
            };
        };

        setScores({
            experience: getScoreMessage(data.experienceScore, 50).text,
            education: getScoreMessage(data.educationScore, 20).text,
            skills: getScoreMessage(data.skillsScore, 30).text,
            projects: getScoreMessage(data.projectsScore, 25).text
        });
    };

    const getText = async(): Promise<string | null> => {
        try {
            const response = await fetch(`http://localhost:8080/text`);
            if (!response.ok) {
                throw new Error('Failed to fetch resume text');
            }
            const result = await response.text();
            setResult(result);
            return result;
        } catch (error) {
            console.error('Error fetching resume text:', error);
            toast.error('Failed to get resume text for AI analysis');
            return null;
        }

    };

    const prepend: string = `You are a professional resume evaluation assistant with strict rules and zero tolerance for invalid or incomplete resumes.

============================
HARD VALIDATION RULES
============================

IMPORTANT
IF WORD COUNT IS LESS THAN 30 REJECT WITH A MESSAGE ON HOW TO IMPROVE
IMPORTANT

RULE 1: If the resume has fewer than 10 words, respond immediately:
"This is not a valid resume."

RULE 2: If the resume is empty, contains only greetings (e.g. "hi", "hello"), or has fewer than 50 total words, respond ONLY with:
"This is not a valid resume. I can only evaluate actual resume content with proper sections including work experience, education, and skills. Please upload a complete resume for evaluation."

DO NOT evaluate, score, or provide any feedback if either rule applies. STOP immediately.

============================
VALIDATION CONTINUES ONLY IF RULES PASS
============================

Next, check if the resume includes all of the following core sections:
- Contact Information
- Work Experience
- Education
- Skills

If any section is missing, deduct 10 points per missing section. Also explicitly state:
"Missing critical section: [Section Name]"

============================
SPARSITY CHECK
============================

If the resume has fewer than 3 work experiences OR fewer than 5 distinct skills, state:
"Your resume is significantly underdeveloped. It lacks [specific missing elements]. This will severely impact your job prospects."


private static final List<String> JOB_TITLES = Arrays.asList(
    // Original job titles
    "developer", "engineer", "architect", "lead", "manager", "director", "software engineer", "software developer", 
    "full-stack developer", "backend developer", "frontend developer", "data scientist", "data engineer", "senior developer", 
    "junior developer", "product manager", "qa engineer", "test engineer", "ui/ux designer", "machine learning engineer",
    "cloud engineer", "sysadmin", "database administrator", "devops engineer", "technical lead", "software tester", "tech consultant",
    
    // Additional job titles
    "principal engineer", "staff engineer", "distinguished engineer", "fellow", "cto", "chief technology officer", 
    "chief information officer", "cio", "chief data officer", "cdo", "chief security officer", "cso", 
    "chief product officer", "cpo", "vp of engineering", "vp engineering", "vp of technology", "vp technology",
    "head of engineering", "head of development", "head of technology", "head of data", "head of ai", "head of product",
    "engineering manager", "development manager", "technology manager", "data manager", "ai manager", "product manager",
    "technical program manager", "tpm", "program manager", "project manager", "scrum master", "agile coach",
    "release manager", "build engineer", "reliability engineer", "site reliability engineer", "sre",
    "platform engineer", "infrastructure engineer", "network engineer", "systems engineer", "security engineer",
    "cybersecurity engineer", "information security engineer", "infosec engineer", "penetration tester", "pen tester",
    "ethical hacker", "security analyst", "security architect", "network architect", "solutions architect",
    "enterprise architect", "cloud architect", "data architect", "systems architect", "integration architect",
    "android developer", "ios developer", "mobile developer", "react native developer", "flutter developer",
    "web developer", "php developer", "ruby developer", "javascript developer", "java developer", "python developer",
    "c# developer", ".net developer", "node.js developer", "nodejs developer", "go developer", "golang developer", 
    "rust developer", "scala developer", "kotlin developer", "swift developer", "react developer", "angular developer",
    "vue developer", "typescript developer", "unity developer", "game developer", "blockchain developer",
    "smart contract developer", "solidity developer", "embedded developer", "embedded systems engineer",
    "firmware engineer", "hardware engineer", "fpga engineer", "asic designer", "chip designer",
    "verification engineer", "validation engineer", "quality assurance engineer", "qa analyst", "quality engineer",
    "test automation engineer", "manual tester", "qa lead", "testing lead", "automation architect",
    "performance engineer", "performance tester", "load test engineer", "database engineer", "data warehouse engineer",
    "etl developer", "etl engineer", "data integration specialist", "data modeler", "database designer",
    "sql developer", "nosql specialist", "bi developer", "business intelligence developer", "bi analyst",
    "data analyst", "business analyst", "analytics engineer", "reporting analyst", "tableau developer",
    "power bi developer", "looker developer", "visualization specialist", "data visualization engineer",
    "machine learning scientist", "ai researcher", "research scientist", "applied scientist", "nlp engineer",
    "nlp scientist", "computer vision engineer", "computer vision scientist", "deep learning engineer",
    "ai engineer", "machine learning ops engineer", "mlops engineer", "ml engineer", "ai product manager",
    "data product manager", "technical product manager", "product owner", "ux researcher", "user researcher",
    "ux designer", "ui designer", "interaction designer", "visual designer", "product designer",
    "frontend architect", "backend architect", "api designer", "api architect", "microservices architect",
    "devops architect", "devops specialist", "cloud specialist", "aws architect", "aws engineer",
    "azure architect", "azure engineer", "gcp architect", "gcp engineer", "multicloud specialist",
    "kubernetes engineer", "kubernetes administrator", "docker specialist", "terraform engineer",
    "infrastructure architect", "network administrator", "systems administrator", "linux administrator",
    "windows administrator", "cloud administrator", "it specialist", "support engineer", "technical support engineer",
    "support specialist", "customer success engineer", "implementation specialist", "implementation engineer",
    "solutions engineer", "sales engineer", "presales engineer", "developer advocate", "developer relations",
    "developer evangelist", "technical writer", "documentation specialist", "knowledge base manager",
    "software evangelist", "open source maintainer", "open source contributor", "community manager",
    "growth engineer", "growth hacker", "full stack engineer", "frontend engineer", "backend engineer",
    "middleware engineer", "api engineer", "integration engineer", "automation engineer", "robotics engineer",
    "controls engineer", "mechatronics engineer", "simulation engineer", "graphics engineer", "rendering engineer",
    "shader programmer", "game engine developer", "gameplay programmer", "tools programmer", "technical artist",
    "3d programmer", "audio programmer", "cryptography engineer", "quantum computing engineer", "quantum developer",
    "chief architect", "principal architect", "lead architect", "solution delivery manager", "delivery manager",
    "innovation manager", "r&d engineer", "research engineer", "technology consultant", "it consultant",
    "digital transformation consultant", "modernization specialist", "legacy systems specialist"
);

// Expand the list of educational backgrounds
private static final List<String> RELEVANT_DEGREES = Arrays.asList(
    // Original degrees
    "ph.d", "doctorate", "master", "mba", "ms", "m.s", "bachelor", "b.a", "b.s", "ba", "bs", "associate", 
    "diploma", "certificate", "postgraduate", "doctoral", "bachelor of science", "bachelor of arts", "master of science",
    
    // Additional degrees
    "master of arts", "m.a", "ma", "bachelor of engineering", "b.eng", "beng", "master of engineering", "m.eng", "meng",
    "bachelor of technology", "b.tech", "btech", "master of technology", "m.tech", "mtech", "bachelor of computing",
    "master of computing", "bachelor of information technology", "master of information technology", "bachelor of business",
    "master of business", "doctor of philosophy", "doctor of science", "doctor of engineering", "d.eng", "deng",
    "doctor of technology", "d.tech", "dtech", "doctor of information technology", "doctor of business administration", "dba",
    "master of business administration", "executive mba", "emba", "master of computer science", "master of data science",
    "master of artificial intelligence", "master of machine learning", "master of cybersecurity", "master of information security",
    "master of software engineering", "master of computer engineering", "master of information systems", "master of applied science",
    "m.a.sc", "masc", "master of computational science", "master of computational engineering", "bachelor of applied science",
    "b.a.sc", "basc", "bachelor of computer science", "master of statistics", "bachelor of statistics", "master of mathematics",
    "bachelor of mathematics", "bachelor of software engineering", "bachelor of computer engineering", "bachelor of data science",
    "bachelor of artificial intelligence", "bachelor of cybersecurity", "bachelor of information systems",
    "graduate certificate", "professional certificate", "post-graduate diploma", "pgd", "post-graduate certificate", "pgc",
    "advanced diploma", "higher national diploma", "hnd", "higher national certificate", "hnc", "national diploma",
    "national certificate", "technical diploma", "vocational diploma", "vocational certificate", "associate of science",
    "associate of arts", "a.a", "a.s", "aas", "associate of applied science", "foundation degree", "fd",
    "bachelor of computing science", "bachelor of information science", "bachelor of computational science",
    "master of information science", "master of computer applications", "mca", "bachelor of computer applications", "bca",
    "bachelor of it", "bit", "master of it", "mit", "master of professional studies", "mps", "doctor of computing",
    "doctor of computer science", "doctor of information science", "licentiate", "magister", "habilitation",
    "bachelor of business informatics", "master of business informatics", "bachelor of business computing",
    "master of business computing", "integrated master", "msci", "meng", "mmath", "mphys",
    "master of philosophy", "mphil", "master of research", "mres", "doctor of professional studies", "dprof",
    "doctor of engineering practice", "bachelor with honors", "honors degree", "honours degree", "master's degree",
    "doctoral degree", "undergraduate degree", "graduate degree", "terminal degree", "professional doctorate"
);

// Expand the relevant fields of study list
private static final List<String> RELEVANT_FIELDS = Arrays.asList(
    // Original fields
    "computer science", "information technology", "software engineering", "data science", "electrical engineering", 
    "computer engineering", "mathematics", "statistics", "information systems", "artificial intelligence", "data analysis", 
    "robotics", "quantitative finance", "applied mathematics", "software design", "business analytics", "network engineering",
    
    // Additional fields
    "machine learning", "deep learning", "computational linguistics", "natural language processing", "nlp", 
    "computer vision", "human-computer interaction", "hci", "cybersecurity", "information security", 
    "network security", "cryptography", "blockchain technology", "distributed systems", "cloud computing", 
    "edge computing", "internet of things", "iot", "embedded systems", "real-time systems", "operating systems", 
    "systems programming", "compiler design", "programming language theory", "formal methods", 
    "algorithm design", "computational complexity", "parallel computing", "high-performance computing", "hpc", 
    "quantum computing", "quantum information science", "computational physics", "computational chemistry", 
    "computational biology", "bioinformatics", "computational neuroscience", "cognitive science", 
    "cognitive computing", "autonomous systems", "web science", "information retrieval", "database systems", 
    "data management", "big data", "data mining", "web development", "mobile development", "game development", 
    "computer graphics", "animation", "digital media", "multimedia systems", "digital signal processing", "dsp", 
    "control systems", "automation", "mechatronics", "electronic engineering", "telecommunications", 
    "wireless communications", "computer networks", "network architecture", "network protocols", 
    "systems architecture", "software architecture", "software testing", "quality assurance", 
    "software quality", "software verification", "software validation", "requirements engineering", 
    "software project management", "agile methodologies", "devops", "site reliability engineering", "sre", 
    "information theory", "computer algebra", "numerical analysis", "operational research", "operations research", 
    "optimization", "mathematical modeling", "simulation", "computational mathematics", "computational statistics", 
    "statistical learning", "bayesian statistics", "experimental design", "decision science", "data engineering", 
    "information engineering", "knowledge engineering", "knowledge representation", "semantic web", 
    "business intelligence", "business information systems", "management information systems", "mis", 
    "enterprise systems", "it management", "it strategy", "digital strategy", "digital transformation", 
    "fintech", "financial computing", "computational finance", "actuarial science", "risk analysis", 
    "econometrics", "mathematical economics", "computational economics", "web science", "digital humanities", 
    "technology ethics", "digital ethics", "ai ethics", "cyber law", "it law", "technology policy", 
    "information policy", "tech innovation", "r&d", "applied computing", "gaming technology", "virtual reality", "vr", 
    "augmented reality", "ar", "mixed reality", "computer simulations", "computational design", 
    "digital design", "interaction design", "user experience design", "user interface design", "ux/ui design", 
    "information architecture", "systems engineering", "software systems", "enterprise architecture", 
    "solution architecture", "tech architecture", "security engineering", "security architecture", 
    "multimedia engineering", "media informatics", "web engineering", "mobile computing", "pervasive computing", 
    "ubiquitous computing", "computational thinking", "computer ethics", "technology ethics", 
    "computational social science", "computational journalism", "logic programming", "functional programming", 
    "object-oriented design", "system administration", "technical support", "tech communication", 
    "scientific computing", "computational science", "engineering mathematics", "engineering statistics", 
    "mathematical finance", "applied computing", "computing science", "computer systems", "information science", 
    "digital systems", "intelligent systems", "expert systems", "knowledge-based systems", "decision support systems", 
    "business computing", "biomedical computing", "health informatics", "medical informatics", "clinical informatics", 
    "computational social science", "computational linguistics", "computational finance", "digital innovation", 
    "digital business", "digital marketing", "e-commerce technology", "enterprise software development", 
    "cloud architecture", "software product management", "product development", "product design", 
    "technology innovation", "innovation management", "computational engineering", "technology management", 
    "systems analysis", "web services", "service-oriented architecture", "microservices architecture"
);

// Expand the prestigious institution list
private static final List<String> PRESTIGIOUS_SCHOOLS = Arrays.asList(
    // Original schools
    "mit", "stanford", "harvard", "berkeley", "carnegie mellon", "princeton", "oxford", "cambridge", "caltech", 
    "eth zurich", "university of chicago", "columbia", "yale", "cornell", "uc berkeley", "university of oxford",
    "university of cambridge", "imperial college london", "university of toronto", "university of michigan", "university of california",
    
    // Additional schools
    "university of california los angeles", "ucla", "university of california san diego", "ucsd", 
    "university of california santa barbara", "ucsb", "university of california irvine", "uci", 
    "university of california davis", "ucd", "university of washington", "university of illinois", 
    "university of illinois urbana-champaign", "uiuc", "university of illinois at urbana-champaign", 
    "georgia tech", "georgia institute of technology", "university of texas", "ut austin", 
    "university of texas at austin", "university of wisconsin", "university of wisconsin-madison", 
    "purdue university", "university of pennsylvania", "upenn", "penn", "dartmouth college", 
    "brown university", "northwestern university", "nyu", "new york university", 
    "university of southern california", "usc", "duke university", "johns hopkins university", 
    "university of maryland", "university of maryland college park", "umcp", "rice university", 
    "vanderbilt university", "university of north carolina", "unc chapel hill", 
    "university of north carolina at chapel hill", "university of minnesota", "uminn", 
    "university of massachusetts", "umass", "university of massachusetts amherst", 
    "university of colorado", "university of colorado boulder", "cu boulder", 
    "rutgers university", "penn state university", "pennsylvania state university", 
    "university of virginia", "uva", "university of florida", "uf", "university of arizona", 
    "arizona state university", "asu", "university of utah", "ohio state university", 
    "tsinghua university", "peking university", "university of tokyo", "tokyo university", "todai", 
    "seoul national university", "snu", "kaist", "korea advanced institute of science and technology", 
    "national university of singapore", "nus", "nanyang technological university", "ntu singapore", 
    "university of melbourne", "university of sydney", "university of new south wales", "unsw", 
    "australian national university", "anu", "university of queensland", "uq australia", 
    "mcgill university", "university of british columbia", "ubc", "university of waterloo", 
    "university of alberta", "university of montreal", "université de montréal", "udem", 
    "technion", "israel institute of technology", "hebrew university of jerusalem", 
    "tel aviv university", "weizmann institute of science", "swiss federal institute of technology", 
    "epfl", "école polytechnique fédérale de lausanne", "technical university of munich", "tum", 
    "tu munich", "rwth aachen", "rwth aachen university", "heidelberg university", 
    "university of heidelberg", "humboldt university of berlin", "humboldt-universität zu berlin", 
    "kth royal institute of technology", "delft university of technology", "tu delft", 
    "eindhoven university of technology", "tu eindhoven", "wageningen university", 
    "ghent university", "ku leuven", "catholic university of leuven", "sapienza university of rome", 
    "sapienza university", "university of rome", "polytechnic university of milan", "politecnico di milano", 
    "university of bologna", "university of manchester", "university of edinburgh", "university of warwick", 
    "university college london", "ucl", "london school of economics", "lse", "king's college london", 
    "university of bristol", "university of nottingham", "university of sheffield", "university of leeds", 
    "university of southampton", "trinity college dublin", "university of dublin", "university of copenhagen", 
    "copenhagen university", "university of amsterdam", "university of helsinki", "aalto university", 
    "university of oslo", "oslo university", "university of stockholm", "stockholm university", 
    "university of barcelona", "universidad de barcelona", "autonomous university of madrid", 
    "universidad autónoma de madrid", "complutense university of madrid", "universidad complutense de madrid", 
    "university of vienna", "universität wien", "vienna university", "university of geneva", 
    "université de genève", "university of zurich", "universität zürich", "moscow state university", 
    "lomonosov moscow state university", "saint petersburg state university", "university of hong kong", "hku", 
    "chinese university of hong kong", "cuhk", "hong kong university of science and technology", "hkust", 
    "ecole polytechnique", "école polytechnique", "sorbonne university", "université sorbonne", 
    "paris sciences et lettres", "psl university", "psl", "indian institute of technology", "iit", 
    "iit delhi", "iit bombay", "iit madras", "iit kanpur", "iit kharagpur", "indian institute of science", 
    "iisc", "university of tokyo", "tokyo university", "kyoto university", "osaka university", 
    "tohoku university", "nagoya university", "hokkaido university", "chalmers university of technology", 
    "lund university", "uppsala university", "aarhus university", "university of bergen", "norwegian university of science and technology", 
    "ntnu", "university of helsinki", "university of lisbon", "universidade de lisboa", "university of porto", 
    "universidade do porto", "university of são paulo", "universidade de são paulo", "usp", 
    "state university of campinas", "unicamp", "federal university of rio de janeiro", "universidade federal do rio de janeiro", 
    "ufrj", "university of buenos aires", "universidad de buenos aires", "uba", "national autonomous university of mexico", 
    "universidad nacional autónoma de méxico", "unam", "university of cape town", "uct", "university of the witwatersrand", 
    "wits university", "cairo university", "american university in cairo", "auc", "university of jordan", 
    "american university of beirut", "aub", "university of tehran", "sharif university of technology", 
    "king fahd university of petroleum and minerals", "kfupm", "king abdullah university of science and technology", 
    "kaust", "indian statistical institute", "isi", "african institute for mathematical sciences", "aims", 
    "university of nairobi", "makerere university", "university of ghana", "university of namibia", 
    "university of ibadan", "addis ababa university", "university of dar es salaam", "university of mauritius", 
    "istituto superiore di sanità", "university of padua", "university of pisa", "university of florence", 
    "university of groningen", "vrije universiteit amsterdam", "leiden university", "university of freiburg", 
    "goethe university frankfurt", "ludwig maximilian university of munich", "lmu munich", "university of bonn", 
    "charles university", "university of warsaw", "warsaw university", "jagiellonian university", 
    "university of bucharest", "babeș-bolyai university", "polytechnic university of bucharest", 
    "saint petersburg university", "national research university higher school of economics", "hse university", 
    "moscow institute of physics and technology", "mipt", "novosibirsk state university", "zhejiang university", 
    "fudan university", "shanghai jiao tong university", "university of science and technology of china", 
    "harbin institute of technology", "nanjing university", "wuhan university", "sun yat-sen university", 
    "korea university", "yonsei university", "pohang university of science and technology", "postech", 
    "sungkyunkwan university", "hanyang university", "kyung hee university", "tokyo institute of technology", 
    "waseda university", "keio university", "university of tsukuba", "uc davis", "uc irvine", "uc santa barbara", 
    "uc san diego", "uc riverside", "university of california riverside", "ucr", 
    "university of southern california", "usc", "illinois institute of technology", "iit chicago", 
    "rensselaer polytechnic institute", "rpi", "stevens institute of technology", 
    "worcester polytechnic institute", "wpi", "case western reserve university", 
    "university of notre dame", "lehigh university", "northeastern university", 
    "university of pittsburgh", "university of rochester", "boston university", "bu", 
    "stony brook university", "suny stony brook", "university at buffalo", "suny buffalo", 
    "university of connecticut", "uconn", "university of california santa cruz", "ucsc", "university of oregon", 
    "university of tennessee", "university of oklahoma", "university of iowa", "florida state university", "fsu", 
    "texas a&m university", "tamu", "university of georgia", "university of south carolina"
    
    USE THE ABOVE KEYWORDS TO RANK THERE RESUME
REQUIRED SECTION VERIFICATION:

Before scoring, verify the presence of ALL core resume sections: Contact Information, Work Experience, Education, and Skills.
If ANY required section is missing, immediately deduct 10 points per missing section and explicitly state: "Missing critical section: [Section Name]."
Do not infer or assume the existence of sections that are not explicitly present.

QUALITY ASSESSMENT: Only after validation checks, evaluate resumes based on these metrics:

Content relevance and completeness (0-10) - Requires actual job titles, dates, and descriptions
Impact statements with measurable results (0-10) - Must include specific achievements
Technical skills specificity (0-10) - Generic skills like "communication" score low
Education/certification detail (0-10) - Must include institution names and dates
Overall impression (0-10) - Based on formatting, organization, and professionalism

FEEDBACK STRUCTURE:

Begin with the total word count: "Resume word count: [X words]."
Then provide overall score: "Your resume scores [X/50]."
Any score above 35 requires substantive content in all sections - verify before giving high scores
Any resume scoring below 15 must include the statement: "This resume is not competitive in today's job market."
For each missing section, provide direct feedback: "Missing [section name]: This is a critical component of any resume."
Provide specific, actionable improvements without vague generalizations
Do not suggest improvements that cannot be verified from the content (e.g. don't suggest "add more detail to your work experience" if no work experience section exists)

FORMATTING: Use concise, direct language without markdown styling, bullets, or numbering. Each enhancement should appear on a new line.

UNRELATED QUERIES: For any non-resume questions, respond: "Sorry, I only evaluate resumes."

CRITICAL INSTRUCTION: You MUST NOT fabricate or assume sections that don't exist. If given a resume that contains only "hi" or similar minimal text, you must trigger the content validation check and refuse to provide a score. Never award points for non-existent content. Verify actual substantive content before proceeding with evaluation.
Keep total response under 200 words. Be decisive, specific, and unapologetically honest about resume quality.`;


    const handleOllama = async(data: ResumeData) => {

        if(!paid){
            navigate('/payments')
            return;
        }
        setAiLoading(true);
        const apiKey = import.meta.env.VITE_HF_API_KEY;
        const client = new InferenceClient(apiKey);
        const resumeText = await getText();
        const prompt = prepend + resumeText;
        console.log("res" + resumeText)

        try {
            const chatCompletion = await client.chatCompletion({
                provider: "nebius",
                model: "meta-llama/Llama-3.1-8B-Instruct",
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                temperature: 0.6,
                max_tokens: 300,
                top_p: 0.9,
            });
            setAI(chatCompletion.choices[0].message.content);
            setShowAdvice(true)
            setAiLoading(false);
            console.log(chatCompletion.choices[0].message);
            return chatCompletion.choices[0].message;
        } catch (error) {
            console.error("Error fetching chat completion:", error);
            throw error;
        }


        // const aiResponse = await response.json();
        // console.log(aiResponse)
        // console.log(data);

        // console.log(aiResponse);
        // return aiResponse;

        // const resumeText = await getText();
        //
        // const response = await fetch("http://localhost:11434/api/generate", {
        //     method: "POST",
        //     headers: {
        //         "Content-type": "application/json"
        //     },
        //
        //     body: JSON.stringify({
        //         model: "gemma3:12b",
        //         prompt: prepend + resumeText,
        //         stream: false,
        //     }),
        // })
        //
        // const aiResponse = await response.json();

        // if(aiResponse === null || !aiResponse || aiResponse.length === 0){
        //     setAiLoading(true);
        //
        // }else{
        //     setAiLoading(false);
        // }


    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 animate-scroll-bg" style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
            <nav className="bg-white shadow-sm relative">
                <div className="max-w-7xl px-4 sm:px-6 py-2 flex items-center">

                    <Link to="/" className="flex items-center">
                        <span className="text-xl md:text-3xl font-bold text-blue-600">PathToHire</span>
                    </Link>

                    <div className="flex justify-start gap-6 font-medium md:text-sm text-xs items-center ml-3 pt-1">
                        <Link to="/home" className="text-gray-700 hover:text-blue-600">Home</Link>
                        <Link to="/calendar" className="text-gray-700 hover:text-blue-600">Calendar</Link>
                        <Link to="/track" className="text-gray-700 hover:text-blue-600">Applications</Link>
                        <Link to="/rewrite" className="text-gray-700 hover:text-blue-600">Rephrase your resume</Link>
                        <Link to="/payments" className="text-gray-700 hover:text-blue-600">Plans</Link>
                    </div>

                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <AnimatePresence mode="wait">
                    {!hideFile ? (
                        <motion.div
                            key="upload"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="text-center"
                        >
                            <h1 className="text-5xl font-bold mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Resume Analysis
                            </h1>

                            <motion.div
                                className="max-w-md mx-auto bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-200"
                                whileHover={{ y: -5 }}
                            >
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full mb-4 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    accept=".pdf,.doc,.docx"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full py-3 px-6 rounded-xl cursor-pointer text-white font-medium ${
                                        isLoading
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                                    }`}
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Analyzing...' : 'Analyze Resume'}
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="grid grid-cols-1 lg:grid-cols-8 gap-8"
                        >

                            <motion.div whileHover={{scale:1.02}} className="lg:col-span-5 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-200">
                                <div className="grid grid-cols-[auto_1fr] items-center gap-4">
                                        <span className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-md">
                                          Analysis Results
                                        </span>
                                                                        <span className="text-xl text-center font-medium ml-4 text-gray-600 leading-snug max-w-md">
                                          Your <span className="font-bold text-indigo-600">RESUME</span> matched{' '}
                                                                            <span className={`font-bold ${matchScore < 40 ? 'text-red-500' : 'text-green-500'}`}>{matchScore}%</span> of TECH resumes
                                        </span>
                                </div>

                                {resumeData && <ProgressBar data={resumeData} />}

                                <div className="space-y-6 mt-8">
                                    {Object.entries(scores).map(([key, value]) => (
                                        <motion.div
                                            key={key}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            whileTap={{scale:1.05}}
                                            whileHover={{scale:1.02}}
                                            className=" p-4 bg-white rounded-xl shadow-sm"
                                        >
                                            <h3 className="text-lg font-semibold capitalize mb-2">
                                                {key} Score
                                            </h3>
                                            <p className="text-gray-600">{value}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <div className="lg:col-span-3">
                                <motion.div
                                    className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-200"



                                >
                                    <div className="text-center mb-6">
                                        <motion.img
                                            src={robot}
                                            alt="AI Assistant"
                                            className="w-32 h-32 mx-auto mb-4"
                                            animate={{ y: [0, -20, 0] }}
                                            whileHover={{
                                                scale:1.15,
                                                transition: {
                                                    duration: 0.5,
                                                    repeat: Infinity,
                                                    repeatType: "reverse"
                                                }
                                            }}

                                        />
                                        <h3 className="text-xl font-bold text-gray-800">AI Assistant</h3>
                                    </div>

                                    {!showAdvice ? (
                                        <motion.button

                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`w-full py-6 px-6 relative rounded-xl font-extrabold text-3xl ${aiLoading ? 'bg-white': 'bg-gradient-to-r from-blue-600 to-indigo-600'  } m`}

                                            onClick={() => resumeData && handleOllama(resumeData)}
                                        >
                                            {aiLoading ? (
                                                <div className="flex absolute left-1/2 -translate-x-1/2 bottom-1 overflow-visible">

                                                        <motion.div whileHover={{scale:1.3}} className="w-full loader"></motion.div>


                                                </div>
                                            ): (<p className="text-white text-md">Get AI advice</p>)}
                                        </motion.button>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="p-4 bg-blue-50 rounded-xl"
                                        >
                                            {!aiLoading && (<p className="text-gray-800">{ai}</p>)}


                                        </motion.div>
                                    )}
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}