import { motion } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';
import { useDropzone, type DropzoneRef } from 'react-dropzone';
import {ResultsBar} from "./ProgressBar.tsx";
import { Player } from '@lottiefiles/react-lottie-player';
import './App.css';
import gsap from 'gsap';

interface FileWithPath extends File {
    path?: string;
}

interface fileDesc {
    file: File | null;
    jobDesc: string;
}

export default function Dropzone(): React.ReactElement {
    const dropzoneRef = useRef<DropzoneRef>(null);
    const [results, showResults] = useState<boolean>(false);
    const [hovered, setHovered] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [improv, setImprov] = useState<string>('');
    const [skills,setSkills] = useState<string[]>([]);
    const [keys,setKeys] = useState<string[]>([]);
    const [loading, isLoading] = useState<boolean>(false);
    const [imLoading, setImLoading] = useState<boolean>(false);
    const [done, setDone] = useState<boolean>(false);

    const sending = useRef(null);
    const your = useRef(null);
    const data = useRef( null);
    const to = useRef(null);
    const the = useRef(null);
    const multiverse = useRef(null);

    useEffect(() => {
        if (imLoading) {
            console.log("Animation should start - loading state is true");

            setTimeout(() => {
                if (sending.current && your.current && data.current &&
                    to.current && the.current && multiverse.current) {

                    console.log("Refs found, starting animation");

                    gsap.set([sending.current, your.current, data.current,
                        to.current, the.current, multiverse.current], {
                        y: 0,
                        opacity: 1,
                        position: 'relative'
                    });

                    gsap.to(sending.current, {
                        y: '-100vh',
                        x: '-600',
                        fontSize: "50px",
                        rotation:360,
                        opacity: 1,
                        duration: 4,
                        ease: "circ.out",
                        delay: 0.1
                    });

                    gsap.to(your.current, {
                        y: '-100vh',
                        x: '-300',
                        fontSize: "50px",
                        rotation:360,
                        opacity: 1,
                        duration: 4,
                        ease: "circ.out",
                        delay: 0.3
                    });

                    gsap.to(data.current, {
                        y: '-100vh',
                        x: '45',
                        fontSize: "50px",
                        rotation:360,
                        opacity: 1,
                        duration: 4,
                        ease: "circ.out",
                        delay: 0.3
                    });

                    gsap.to(to.current, {
                        y: '-100vh',
                        x: '450',
                        fontSize: "50px",
                        rotation:360,
                        opacity: 1,
                        duration: 4,
                        ease: "circ.out",
                        delay: 0.3
                    });

                    gsap.to(the.current, {
                        y: '-100vh',
                        x: '600',
                        fontSize: "50px",
                        rotation:360,
                        opacity: 1,
                        duration: 4,
                        ease: "circ.out",
                        delay: 0.3
                    });

                    gsap.to(multiverse.current, {
                        y: '-100vh',
                        x: '900',
                        fontSize: "50px",
                        rotation:360,
                        opacity: 1,
                        duration: 4,
                        ease: "power2.out",
                        delay: 0.3
                    });
                } else {
                    console.error("Animation refs missing:", {
                        sending: sending.current,
                        your: your.current,
                        data: data.current,
                        to: to.current,
                        the: the.current,
                        multiverse: multiverse.current
                    });
                }
            }, 3500);
        }

    }, [imLoading]);


    const initialState: fileDesc ={
        file: null,
        jobDesc: '',
    }

    const [form, setForm] = useState<fileDesc>({
        file: null,
        jobDesc: '',
    });

    const openDialog = (): void => {
        if (dropzoneRef.current) {
            dropzoneRef.current.open();
        }
    };

    const onDrop = (acceptedFiles: File[]) => {
        setForm((prev) => ({
            ...prev,
            file: acceptedFiles[0] || null,
        }));
    };
    const formatText = (data: string): string => {
        let result = "";
        for (let i = 0; i < data.length; i++) {
            if (
                i > 0 &&
                /\d/.test(data[i]) &&
                data[i + 1] === '.' &&
                data[i - 1] !== '\n'
            ) {
                result += '\n';
            }
            result += data[i];
        }
        return result;
    };




    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        onDrop,
        accept: {
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'application/pdf': ['.pdf'],
        },
    });

    const handleJobDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            jobDesc: e.target.value,
        }));
    };
    const prepend:string = "From the given keywords, select up to three technical skills relevant to the job role to people looking for jobs. Provide concise, professional bullet points on how to improve those skills in under 40 words and dont give summaries or examples. If fewer than three, say no skills found. Ignore non-technical topics."
    const technicalSkillsList = [
        // Programming Languages
        "javascript", "typescript", "java", "python", "c", "c++", "c#", "go", "rust", "ruby", "swift", "kotlin",
        "php", "perl", "scala", "haskell", "dart", "r", "bash", "shell", "matlab", "vba",

        // Web Development
        "html", "css", "scss", "sass", "less", "ejs", "handlebars",

        // Frontend Frameworks
        "react", "next.js", "vue", "nuxt.js", "angular", "svelte", "preact", "backbone", "ember",

        // Backend Frameworks
        "node.js", "express", "spring", "spring boot", "django", "flask", "rails", "laravel", "asp.net", "fastapi", "phoenix",

        // Mobile Development
        "react native", "flutter", "xamarin", "ionic", "cordova", "android", "ios", "swiftui", "jetpack compose",

        // Databases
        "mysql", "postgresql", "sqlite", "mongodb", "redis", "oracle", "mariadb", "dynamodb", "cassandra", "couchdb", "neo4j", "influxdb", "snowflake", "redshift",

        // DevOps / Cloud
        "docker", "kubernetes", "aws", "azure", "gcp", "terraform", "ansible", "chef", "puppet", "jenkins", "circleci", "travisci", "github actions", "gitlab ci", "openshift", "nomad", "packer", "helm",

        // APIs & Protocols
        "graphql", "rest", "soap", "grpc", "openapi", "swagger", "websocket", "http", "oauth", "jwt",

        // Testing
        "jest", "mocha", "chai", "junit", "pytest", "cypress", "selenium", "playwright", "enzyme", "karma", "rspec",

        // Tools & Build Systems
        "webpack", "vite", "babel", "esbuild", "gulp", "grunt", "rollup", "npm", "yarn", "pnpm", "make", "cmake",

        // UI/UX & Design
        "figma", "sketch", "xd", "photoshop", "illustrator", "invision", "zeplin", "storybook", "tailwind", "bootstrap", "material ui", "chakra ui",

        // Version Control & Collaboration
        "git", "github", "gitlab", "bitbucket", "svn",

        // Data Science & Machine Learning
        "pandas", "numpy", "scipy", "matplotlib", "seaborn", "scikit-learn", "tensorflow", "keras", "pytorch", "xgboost", "lightgbm", "statsmodels", "mlflow", "nltk", "spacy", "openai", "langchain",

        // Data Engineering & Big Data
        "hadoop", "spark", "hive", "pig", "airflow", "kafka", "flink", "beam", "databricks", "dbt",

        // Monitoring & Logging
        "prometheus", "grafana", "elk", "elasticsearch", "logstash", "kibana", "splunk", "new relic", "datadog", "sentry",

        // Security
        "owasp", "burp suite", "wireshark", "metasploit", "nmap", "hashicorp vault", "identity access management", "ssl", "tls",

        // Other Technologies
        "linux", "windows server", "macos", "powershell", "unix", "bash", "zsh",
        "openstack", "vmware", "virtualbox", "vagrant",

        // Project Management
        "jira", "confluence", "trello", "notion", "asana", "monday", "slack", "microsoft teams",

        // Miscellaneous
        "etl", "data pipeline", "api development", "microservices", "monolith", "service mesh", "observability", "containerization", "infrastructure as code", "ci/cd"
    ];

    const submitDropzone = async () => {
        setKeys([])
        setSkills([])
        isLoading(true)
        setImLoading(true)
        setDone(false)

        if (!form.file) {
            isLoading(false);
            setForm(initialState)
            return;
        }

        const data = new FormData();
        data.append('file', form.file);
        data.append('jobDesc', form.jobDesc);

        try {
            const response = await fetch('http://localhost:8080/compareresume', {
                method: 'POST',
                body: data,
            });
            const text = await response.json();
            setKeys(text.matchedKeywords)
            console.log(text.matchedKeywords)
            for(let i = 0; i < text.missedKeywords.length; i++){
                const keyword = text.missedKeywords[i];

                if(  technicalSkillsList.includes(keyword) && keyword.trim().length > 3) {

                    setSkills(prev => [...prev, keyword]);
                }


            }

            if(text === ''){
                console.log("empty")
            }

            if (response.ok) {
                setScore(text.score);
                showResults(true);
                console.log("test 1")
                isLoading(true);
                setImLoading(true);


                    const response = await fetch("http://localhost:11434/api/generate", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },

                        body: JSON.stringify({
                            model: "mistral",
                            prompt: prepend + text.missedKeywords,
                            stream: false,
                        }),
                    })
                    if(response.ok){
                        setImLoading(false);
                        setDone(true);
                    }

                    const aiResponse = await response.json();
                    if(aiResponse){
                        setImLoading(false)
                        setDone(true);
                    }
                    console.log(aiResponse.response);
                    setImprov(aiResponse.response)
                    setDone(prev => !prev)


            } else {
                console.log('Upload failed');
                isLoading(false);
            }
        } catch (error) {
            console.log('Error uploading file');
            isLoading(false);
        }
    };

    return (
        <>
        {!results ? (
            <>
            <h1 className="text-blue-500 font-medium text-2xl text-center  w-full mb-3">Resume Match analysis</h1>
            <div className="grid grid-cols-[auto_1fr] mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none"
                     stroke="blue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-file-text-icon lucide-file-text">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                    <path d="M10 9H8"/>
                    <path d="M16 13H8"/>
                    <path d="M16 17H8"/>
                </svg>
                <h3 className="font-semibold text-black ml-1">Your Resume</h3>
            </div>

            <motion.div {...getRootProps({className: 'dropzone'})}>

                <motion.div
                    className={`container p-4 relative  rounded-2xl text-center transition-all ease-in-out border-2 border-dashed   ${hovered ? 'border-blue-500' : 'border-gray-400'}`}
                    whileHover={{scale: 1.01}}
                    onHoverStart={() => setHovered(true)}
                    onHoverEnd={() => setHovered(false)}

                >
                    <div className="flex justify-center mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-blue-400"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>


                    </div>


                    <input {...getInputProps()} />

                    <p className="text-gray-400 text-center">Drag n Drop some files here

                    </p>
                    <motion.button whileHover={{scale:1.05}}
                                   whileTap={{scale:0.98}}
                                   type="button" onClick={openDialog} className="text-gray-700 mt-2 font-medium text-center p-2 px-3 rounded-md border border-gray-300">
                        Browse Files
                    </motion.button>

                    <aside className="mt-4">
                        <ul>
                            {form.file ? (
                                <li key={form.file.name} className="text-blue-400">
                                    {form.file.name}
                                </li>
                            ) : (
                                <li className="font-bold text-xs text-red-400">No file selected</li>
                            )}
                        </ul>
                    </aside>
                </motion.div>


            </motion.div>
            <div className="mt-6">
                <div className="grid grid-cols-[auto_1fr] mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none"
                         stroke="blue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="lucide lucide-notepad-text-icon lucide-notepad-text">
                        <path d="M8 2v4"/>
                        <path d="M12 2v4"/>
                        <path d="M16 2v4"/>
                        <rect width="16" height="18" x="4" y="4" rx="2"/>
                        <path d="M8 10h6"/>
                        <path d="M8 14h8"/>
                        <path d="M8 18h5"/>
                    </svg>
                    <h3 className="font-semibold text-black ml-1">Job Description</h3>
                </div>

                <div className="relative">
                <textarea
                    id="jobDescription"
                    placeholder="Paste the job description here..."
                    value={form.jobDesc}
                    onChange={handleJobDescChange}
                    className="font-comic font-bold text-md w-full p-4 border border-gray-300 rounded-xl h-full min-h-[200px] focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none resize-none text-gray-700"
                    rows={8}
                />
                </div>
            </div>


            <div className="flex justify-center">
                {!loading ? (
                <motion.button
                    onClick={submitDropzone}
                    whileHover={{scale:1.02}}
                    whileTap={{scale:0.98}}
                    className="bg-gray-400 font-bold text-white p-2 px-4 rounded-md flex items-center justify-center gap-2 mb-6"
                >
                    Compare Resume
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                         className="lucide lucide-circle-arrow-up-icon lucide-circle-arrow-up">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="m16 12-4-4-4 4"/>
                        <path d="M12 16V8"/>
                    </svg>
                </motion.button>
                ):(
                    <div>
                        <motion.div whileHover={{scale:1.02}} className="w-full loader"></motion.div>
                    </div>

                )};

            </div>
                <span className="text-gray-500 text-xs text-center">Our AI will analyze your resume against the job description and provide keyword matching, skills gap analysis, and tailored improvement suggestions.</span>

            </>
        ) : (
            <>
                <h1 className="text-blue-500 font-medium text-2xl text-center w-full mb-3">Resume analysis</h1>

                <div className="grid grid-cols-1 gap-6 mb-8">
                    {/* Match Score Section */}
                    <div className="border rounded-xl p-6 shadow-sm">
                        <h2 className="text-lg font-medium text-gray-800">Overall Match Score</h2>
                        <span className="text-blue-500 text-3xl font-bold">{score}</span>

                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                            <ResultsBar data={score}/>
                        </div>
                    </div>

                    <div className="border rounded-xl p-6 shadow-sm">
                        <div className="flex justify-self-auto gap-35" >
                            <h2 className="text-lg font-medium text-gray-800 mb-4">Your skills</h2>
                            <h2 className="text-lg font-medium text-gray-800 mb-4">Missing skills</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                     stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                     className="lucide lucide-check-circle">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                    <polyline points="22 4 12 14.01 9 11.01"/>
                                </svg>
                                <span className="text-gray-700">{keys[0]}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                     stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                     className="lucide lucide-x-circle">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="15" y1="9" x2="9" y2="15"/>
                                    <line x1="9" y1="9" x2="15" y2="15"/>
                                </svg>
                                <span className="text-gray-700">{skills[1]}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                     stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                     className="lucide lucide-check-circle">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                    <polyline points="22 4 12 14.01 9 11.01"/>
                                </svg>
                                <span className="text-gray-700">{keys[1]}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                     stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                     className="lucide lucide-x-circle">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="15" y1="9" x2="9" y2="15"/>
                                    <line x1="9" y1="9" x2="15" y2="15"/>
                                </svg>
                                <span className="text-gray-700">{skills[3]}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                     stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                     className="lucide lucide-check-circle">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                    <polyline points="22 4 12 14.01 9 11.01"/>
                                </svg>
                                <span className="text-gray-700">{keys[2]}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                     stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                     className="lucide lucide-x-circle">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="15" y1="9" x2="9" y2="15"/>
                                    <line x1="9" y1="9" x2="15" y2="15"/>
                                </svg>
                                <span className="text-gray-700">{skills[5]}</span>
                            </div>
                        </div>
                    </div>

                    <div className="border rounded-xl p-6 shadow-sm">
                        <h2 className="text-lg font-medium text-gray-800 mb-4">Suggested Improvements</h2>
                        {!imLoading ? (
                            <ul className="list-disc pl-6 space-y-2 text-gray-700 text-left font-comic">
                                {formatText(improv)}
                            </ul>
                        ) : (
                            <div className="w-full text-center p-4" style={{ position: 'static', overflow: 'visible' }}>

                                <div className="flex justify-center space-x-2" style={{ position: 'relative', height: '40px', overflow: 'visible' }}>
                                    <span ref={sending} className="z-30 text-gray-400" style={{ position: 'relative', display: 'inline-block' }}>sending</span>
                                    <span ref={your} className="z-30 text-gray-400" style={{ position: 'relative', display: 'inline-block' }}>your</span>
                                    <span ref={data} className="z-30 text-gray-400" style={{ position: 'relative', display: 'inline-block' }}>data</span>
                                    <span ref={to} className="z-30 text-gray-400" style={{ position: 'relative', display: 'inline-block' }}>to</span>
                                    <span ref={the} className="z-30 text-gray-400" style={{ position: 'relative', display: 'inline-block' }}>the</span>
                                    <span ref={multiverse} className="text-gray-400" style={{ position: 'relative', display: 'inline-block' }}>multiverse</span>
                                </div>
                            </div>
                        )}
                    </div>


                </div>

                <div className="flex justify-center space-x-4 mb-8">
                    <motion.button
                        whileHover={{scale:1.02}}
                        whileTap={{scale:0.98}}
                        onClick={() => {showResults(false);
                            setForm(initialState);
                        }}

                        className="bg-blue-500 font-bold text-white p-2 px-4 rounded-md flex items-center justify-center gap-2"
                    >
                        Try Another Resume
                    </motion.button>


                </div>

                <div className="border rounded-xl p-6 shadow-sm mb-6">
                    <h2 className="text-lg font-medium text-gray-800 mb-4">Resume Optimization Tips <span className="text-xs text-gray-500">from<span> jobtrackr</span></span></h2>
                    <p className="text-gray-600 mb-4">Based on common patterns, here are a few ways to improve your resume:</p>
                    <div className="space-y-3">
                        <div className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                 stroke="blue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="lucide lucide-lightbulb mt-1">
                                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                                <path d="M9 18h6"/>
                                <path d="M10 22h4"/>
                            </svg>
                            <p className="text-gray-700">Tailor your resume to each job by using relevant keywords from the job description  </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                 stroke="blue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="lucide lucide-lightbulb mt-1">
                                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                                <path d="M9 18h6"/>
                                <path d="M10 22h4"/>
                            </svg>
                            <p className="text-gray-700">Highlight technical skills clearly in a separate Skills section  </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                 stroke="blue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="lucide lucide-lightbulb mt-1">
                                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                                <path d="M9 18h6"/>
                                <path d="M10 22h4"/>
                            </svg>
                            <p className="text-gray-700">Emphasize accomplishments over responsibilities — use metrics and impact when possible  </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                 stroke="blue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="lucide lucide-lightbulb mt-1">
                                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                                <path d="M9 18h6"/>
                                <path d="M10 22h4"/>
                            </svg>
                            <p className="text-gray-700">Use active, clear language and keep formatting clean and consistent </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                 stroke="blue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="lucide lucide-lightbulb mt-1">
                                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                                <path d="M9 18h6"/>
                                <path d="M10 22h4"/>
                            </svg>
                            <p className="text-gray-700">Include relevant certifications, projects, or contributions (e.g. GitHub, open source) </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                                 stroke="blue" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                 className="lucide lucide-lightbulb mt-1">
                                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                                <path d="M9 18h6"/>
                                <path d="M10 22h4"/>
                            </svg>
                            <p className="text-gray-700">and finally, proof read for grammar and clarity 😊</p>
                        </div>
                    </div>
                </div>

                <span className="text-gray-500 text-xs text-center block mb-6">This analysis is powered by AI and compares your resume's content and structure against the specific requirements in the job description.</span>
            </>
        )}
    </>
    );
}
