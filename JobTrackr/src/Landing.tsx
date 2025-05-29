import { Link } from 'react-router-dom';
import {useEffect, useRef, useState} from "react";
import gsap from 'gsap';
import './App.css';
import myImage from './assets/JobTrackr.png';
import bg from './assets/jbg.png';
import blur from'./assets/blur.png';
import robot from './assets/robot.png';
import { ScrollTrigger} from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import { TextPlugin } from 'gsap/TextPlugin';
import { motion } from 'framer-motion';
import google from "./assets/google.png"


const faqs = [
    {
        question: "What is PathToHire?",
        answer:
            "PathToHire is a tool that helps you track job applications, scan resumes, and compare them to job descriptions using AI.",
    },
    {
        question: "How does the resume scanner work?",
        answer:
            "Your resume is compared against 50+ job descriptions using NLP models, and we return a relevancy percentage with feedback.",
    },
    {
        question: "Is this service free?",
        answer:
            "Yes! Basic features like resume scanning, job description comparison and tracking applications are free.",
    },
    {
        question: "How does the relevancy check work?",
        answer:
            "Job Trackr compares your resume against 50+ job descriptions (tech only rn), highlighting matches and gaps so you can tailor your resume better.",
    },
    {
        question: "Can I add job descriptions manually?",
        answer:
            "Yes, you can paste job descriptions directly into the app.",
    },
    {
        question: "How do I track my application status?",
        answer:
            "You can mark each application with statuses like Applied, Interviewing, Rejected, or Hired. This helps you stay organized and focused.✨",
    },
    {
        question: "Is my data private and secure?",
        answer:
            "We protect your data by storing it securely and will never share it with third parties without your permission.",
    },
    {
        question: "Does Job Trackr offer job listings?",
        answer:
            "Currently, Job Trackr doesn’t provide job listings but allows you to add and track your own job descriptions and applications.",
    },
    {
        question: "Can I message recruiters or contacts through Job Trackr?",
        answer:
            "Yes, you can communicate directly within the app to keep all conversations organized.",
    },
    {
        question: "Can I export my tracked data?",
        answer:
            "(If you have export feature) Yes, you can export your application history and resume data for offline use or backups.",
    },
    {
        question: "What file types are supported for resumes?",
        answer:
            "Job Trackr supports PDF, DOC, and DOCX resume files for scanning.",
    }
];

export default function Landing() {

    const apiBaseUrl = import.meta.env.VITE_API_BASE_GOOGLE;

    const leftCard = useRef(null);
    const rightCard = useRef(null);
    const thirdCenterCard = useRef(null);

    gsap.registerPlugin(ScrollTrigger,SplitText,TextPlugin);

    const jb = useRef(null);
    const your = useRef(null)
    const hunt = useRef(null)
    const wit = useRef(null);
    const img = useRef(null);

    const tl = gsap.timeline();
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggle = (index: number) => {
        if (openIndexes.includes(index)) {
            setOpenIndexes(openIndexes.filter(i => i !== index));
        } else {
            setOpenIndexes([...openIndexes, index]);
        }
    };
    useEffect(() => {

        const isMobile = window.innerWidth < 768;

        if (!jb.current || !your.current){
            console.log(your.current, your, "doesnt exist")
        }
        tl.fromTo(
            jb.current,
            { y: -300 },
            {
                y: 0,
                duration: 2,
                ease: 'bounce.out',
                scaleX: 1,
                scaleY: 1,
                transformOrigin: 'center bottom',
            }
        );
        tl.to(your.current, {
            scaleY: 0.8,
            duration: 0.3,
            transformOrigin: "bottom center",
            ease: "elastic.out(1,.4)"
        },.6)
        .to(your.current, {
            scaleY: 1,
            duration: 1,
            ease: "back.out(5)",
            color:"#7942FD"
        },.7)
        const element = wit.current;
        const text = element.textContent;
        let index = text.length;

// Step-by-step deletion
        function deleteText() {
            if (index > 0) {
                element.textContent = text.slice(0, --index);
                gsap.delayedCall(0.05, deleteText); // typing speed
            } else {
                // Once all characters are gone, replace with SVG
                element.innerHTML = `
      <svg width="70" height="70" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    `;
                gsap.fromTo(element, {x:-400, opacity: 0 }, {x:10, opacity: 1, duration: .7, ease:"power1" });

            }
        }

// Start after a delay
        gsap.delayedCall(2, deleteText); // wait 2s, then start


        // .set(img.current, { display: "block" }, ">")
        // .fromTo(
        //     img.current,
        //     { x:-650,opacity:0 },
        //     {
        //         delay:1,
        //         x: 0,
        //         duration: 2.7,
        //         opacity:1,
        //         transformOrigin: "right center",
        //         ease: "elastic.out(1,.9)"
        //     },
        //     1.5
        // );
        SplitText.create(hunt.current, {
            type: "chars",
            onSplit(self) {
                gsap.from(self.chars, {
                    delay:.8,
                    duration: .02,
                    y: -100,
                    autoAlpha: 1,
                    stagger: .3

                });
            }
        });

        // tl.to(your.current, {y: 0,scaleY:1,rotation:0, duration: 1.5, ease: "elastic.out"},1.5);

            tl.to(jb.current, { rotation:25 }, .3);
            tl.to(jb.current, { rotation:0,duration:4, ease: "elastic.out" },1.5 );
            tl.to(jb.current, {duration:3, color: "blue",   textShadow: "0px 0px 12px rgba(59, 130, 246, .2)"});


            // gsap.fromTo(
            //     jb.current,
            //     { y: -300 },
            //     {
            //         y: 0,
            //         duration: 2,
            //         ease: 'bounce.out',
            //         scaleX: 1,
            //         scaleY: 1,
            //         transformOrigin: 'center bottom',
            //     }
            // );
            //
            // tl.to(jb.current, { rotation:25 }, "jb+=.2");
            // tl.to(jb.current, { rotation:0,duration:3, ease: "elastic.out" }, "jb+=1.4" );
            // tl.to(jb.current, {duration:3, color: "blue",   textShadow: "0px 0px 12px rgba(59, 130, 246, .2)"}, "jb+=2.2" );

    }, []);

    return (
        <div className="overflow-x-hidden overflow-y-hidden min-h-screen bg-gray-50 animate-scroll-bg"
             style={{
                 backgroundImage: `url(${bg})`,
                 backgroundSize: "cover",
                 backgroundPosition: "center",
             }}
        >

            <nav className="bg-white shadow-sm relative">
                <div className="max-w-7xl mx-auto py-2 flex items-center">
                    <Link to="/home">
                        <img
                            src={myImage}
                            alt="PathToHire Logo"
                            className="h-12 md:h-16"
                        />
                    </Link>
                    <span className="text-2xl md:text-3xl font-bold text-blue-600">PathToHire</span>

                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-0 md:py-12">
                <section className="flex flex-col text-center">
                    <h1 className="flex flex-col items-center text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800">
                        <span className="mb-2">Simplify <span ref={your} className="inline-block">Your </span> <span className="inline-block" ref={hunt}>Hunt</span></span>
                        <span className="flex items-center gap-2 mb-3">
                            <span ref={wit} className="inline-block">with</span><span className="mt-2" ><svg ref={img} style={{ display: "none" }} xmlns="http://www.w3.org/2000/svg"
                                                                                           width="60" height="60" viewBox="0 0 24 24"
                                                                                           fill="none" stroke="currentColor"
                                                                                           stroke-width="2" stroke-linecap="round"
                                                                                           stroke-linejoin="round"
                                                                                           className="lucide lucide-arrow-right-icon lucide-arrow-right"><path
                            d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></span> <span ref={jb}
                                                                                           className="bg-gradient-to-r from-indigo-600 to-purple-500 text-transparent bg-clip-text p-1 transform -rotate-1">PathToHire</span>
                        </span>
                        <span className="flex justify-center items-center text-2xl md:text-3xl mb-6 font-normal gap-2">
                            Track
                            <svg
                                xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="lucide lucide-file-text-icon lucide-file-text mt-1"><path
                                d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path
                                d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path
                                d="M16 17H8"/>
                            </svg>
                            Scan
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                     className="lucide lucide-check-check-icon lucide-check-check mt-1"><path d="M18 6 7 17l-5-5"/><path
                                    d="m22 10-7.5 7.5L13 16"/>
                                </svg>
                            Apply
                        </span>
                        <span
                            className="mt-2 text-xl md:text-2xl px-4 py-2 bg-indigo-100 rounded-full text-indigo-600 transform hover:scale-105 transition-transform cursor-pointer">
                            Perfect your Resume in One Click
                        </span>
                    </h1>


                        <motion.div className="flex justify-center w-full mt-8 bg-white mb-6  md:mb-1"
                            whileHover={{scale:1.02}}
                            whileTap={{scale:0.98}}
                            >
                            <a href={`${apiBaseUrl}/oauth2/authorization/google`}>
                            <div
                                className="flex items-center gap-3 px-6 py-3 font-medium border border-gray-200 rounded-lg shadow-sm hover:bg-blue-50 transition-colors duration-200"
                            >
                                <img className="h-9 w-9" src={google} alt="Google logo" />
                                <span className="font-semibold text-gray-700">Login with Google</span>
                            </div>
                            </a>
                        </motion.div>

                </section>
            </main>

            <div className=" px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 px-15 mb-20">
                    <div
                        className="bg-white p-6 rounded-xl shadow border border-gray-100 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                        <div
                            className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round" className="lucide lucide-brain-icon lucide-brain">
                                <path
                                    d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
                                <path
                                    d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
                                <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
                                <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
                                <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
                                <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
                                <path d="M19.938 10.5a4 4 0 0 1 .585.396"/>
                                <path d="M6 18a4 4 0 0 1-1.967-.516"/>
                                <path d="M19.967 17.484A4 4 0 0 1 18 18"/>
                            </svg>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Resume vs. Job Description</h3>
                        <p className="text-gray-600 text-sm">
                            Upload your resume and a job description for <span className="text-blue-500 font-semibold">FREE</span> We will analyse using advanced NLP (powered by Stanford CoreNLP) to show how well you match, highlight missing skills, and suggest improvements.
                        </p>

                    </div>
                    <div
                        className="bg-white p-6 rounded-xl shadow border border-gray-100 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                        <div
                            className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"

                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round" className="lucide lucide-bot-icon lucide-bot">
                                <path d="M12 8V4H8"/>
                                <rect width="16" height="12" x="4" y="8" rx="2"/>
                                <path d="M2 14h2"/>
                                <path d="M20 14h2"/>
                                <path d="M15 13v2"/>
                                <path d="M9 13v2"/>
                            </svg>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">AI Assistant</h3>
                        <p className="text-gray-600 text-sm">
                            Upload your resume and our AI assistant sends it to a local Ollama LLM for deep analysis. It extracts key skills, summarizes strengths, and offers personalized feedback fast and for <span className="text-blue-500 font-semibold">FREE</span>
                        </p>


                    </div>

                    <div
                        className="bg-white p-6 rounded-xl shadow border border-gray-100 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                        <div
                            className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 64 64"
                                fill="none"
                                width="26"
                                height="26"
                            >
                                <path
                                    d="M55.707 11.293l-10-10A1.115 1.115 0 0045 1H9a1 1 0 00-1 1v60a1 1 0 001 1h46a1 1 0 001-1V12a1.092 1.092 0 00-.293-.707zM52.586 11H46V4.414zM10 61V3h34v9a1 1 0 001 1h9v48z"
                                    fill="#28282b"
                                />
                                <path
                                    d="M34 8h7a1 1 0 100-2h-7a1 1 0 100 2zM34 13h7a1 1 0 100-2h-7a1 1 0 100 2zM50 16H34a1 1 0 100 2h16a1 1 0 100-2zM50 21H34a1 1 0 100 2h16a1 1 0 100-2zM50 26H34a1 1 0 100 2h16a1 1 0 100-2zM50 31H14a1 1 0 100 2h36a1 1 0 100-2zM50 36H14a1 1 0 100 2h36a1 1 0 100-2zM50 41H14a1 1 0 100 2h36a1 1 0 100-2zM50 46H14a1 1 0 100 2h36a1 1 0 100-2zM50 51H14a1 1 0 100 2h36a1 1 0 100-2zM50 56H14a1 1 0 100 2h36a1 1 0 100-2zM22 19a5 5 0 10-5-5 5.006 5.006 0 005 5zm0-8a3 3 0 11-3 3 3 3 0 013-3z"
                                    fill="#28282b"
                                />
                                <path
                                    d="M14 28h16a1 1 0 001-1V7a1 1 0 00-1-1H14a1 1 0 00-1 1v20a1 1 0 001 1zm1.473-2a7.325 7.325 0 0113.054 0zM29 8v15.164a9.325 9.325 0 00-14 0V8z"
                                    fill="#28282b"
                                />
                            </svg>


                        </div>
                        <h3 className="font-semibold text-lg mb-2">Resume Scanner</h3>
                        <p className="text-gray-600 text-sm">
                            We compare your resume against <span className="font-semibold text-green-500 ">50+ job descriptions </span>for <span className="text-blue-500 font-semibold">FREE </span> using AI and provide a relevancy score as a percentage, so you know exactly how well you match.
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-auto  md:grid-cols-[1fr_1fr] gap-14 justify-center h-100 md:w-[calc(100%-180px)] px-45 mx-auto mt-4 mb-18">

                <motion.div className="p-[.15rem] rounded-lg bg-gradient-to-r from-gray-500 to-gray-700"
                    whileHover={{scale: 1.01,animationDuration:2}}
                >
                    <div className="bg-white rounded-md p-6 h-full px-5 py-2.5n   dark:hover:bg-slate-100 shadow relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]">
                        <h1 className="text-left text-white font-semibold bg-gradient-to-r from-gray-400 to-gray-600 rounded-4xl px-5 py-1 inline-block  ">Jobless
                        </h1>
                        <span className="ml-2 font-semibold text-md text-gray-500">Start applying with 'confidence'</span>
                        <p className="text-5xl font-bold bg-gradient-to-r from-gray-600 to-gray-800 text-transparent bg-clip-text my-3 ml-1">FREE</p>

                        <span className="flex justify-start mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black"
                                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check-icon lucide-check mr-1"><path
                                d="M20 6 9 17l-5-5"/>
                            </svg>
                               <span
                                   className="text-transparent bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text mr-1">Limit</span>of 5 file uploads!
                        </span>
                        <span className="flex justify-start mb-2 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black"
                                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check-icon lucide-check mr-1"><path
                                d="M20 6 9 17l-5-5"/>
                            </svg>
                                Access to Resume-Job Description Comparison
                       </span>
                        <span className="flex justify-start mb-2">
                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black"
                                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check-icon lucide-check mr-1"><path
                                   d="M20 6 9 17l-5-5"/>
                            </svg>
                                Scan your resume against 50+ job descriptions!
                       </span>
                        <span className="flex justify-start mb-2">
                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black"
                                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check-icon lucide-check mr-1"><path
                                   d="M20 6 9 17l-5-5"/>
                            </svg>
                                Keep Track of Your Applications

                       </span>
                        <span className="flex justify-start mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black"
                             stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check-icon lucide-check mr-1"><path
                            d="M20 6 9 17l-5-5"/>
                            </svg>
                               Discord and email support
                           </span>



                    </div>
                </motion.div>

                <motion.div className="p-[.15rem] rounded-lg bg-gradient-to-r from-indigo-600 to-purple-500"
                whileHover={{scale: 1.01,animationDuration:2}}
                >
                    <div className="bg-white rounded-md p-6 h-full dark:hover:bg-slate-100 shadow relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]">
                        <h1 className="text-left text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-500 rounded-4xl px-5 py-1 inline-block ">Employed
                        </h1>
                        <span className="ml-2 font-semibold text-md text-gray-500">Perfect to land a job!</span>
                        <p className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 text-transparent bg-clip-text my-3 mb-6">€2.99</p>

                        <span className="flex justify-start mb-2  ml-1">
                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="url(#indigoToPurple)" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" className="lucide lucide-check-icon lucide-check mr-1">
                                  <path d="M20 6 9 17l-5-5"/>
                                  <defs>
                                    <linearGradient id="indigoToPurple" x1="0%" y1="0%" x2="100%" y2="0%">
                                      <stop offset="0%" stop-color="#4f46e5"/>
                                      <stop offset="100%" stop-color="#a855f7"/>
                                    </linearGradient>
                                  </defs>
                               </svg>
                               <span className="font-bold text-transparent bg-gradient-to-r from-indigo-800 to-blue-800 bg-clip-text mr-1">Unlimited</span>  file uploads!
                        </span>
                        <span className="flex justify-start mb-2 items-center ml-1">
                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="url(#indigoToPurple)" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" className="lucide lucide-check-icon lucide-check mr-1">
                                  <path d="M20 6 9 17l-5-5"/>
                                  <defs>
                                    <linearGradient id="indigoToPurple" x1="0%" y1="0%" x2="100%" y2="0%">
                                      <stop offset="0%" stop-color="#4f46e5"/>
                                      <stop offset="100%" stop-color="#a855f7"/>
                                    </linearGradient>
                                  </defs>
                               </svg>
                                Access to AI assistant Jobi
                           </span>
                        <span className="flex justify-start mb-2 ml-1">
                               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="url(#indigoToPurple)" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" className="lucide lucide-check-icon lucide-check mr-1">
                                  <path d="M20 6 9 17l-5-5"/>
                                  <defs>
                                    <linearGradient id="indigoToPurple" x1="0%" y1="0%" x2="100%" y2="0%">
                                      <stop offset="0%" stop-color="#4f46e5"/>
                                      <stop offset="100%" stop-color="#a855f7"/>
                                    </linearGradient>
                                  </defs>
                               </svg>
                                Includes Jobless plan features
                           </span>
                        <a href="http://localhost:8080/oauth2/authorization/google">
                            <motion.div className="mt-13 bg-gradient-to-r from-indigo-600 to-purple-500 px-14 py-3 rounded-xl inline-block dark:hover:bg-slate-100 shadow relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
                            whileHover={{scale:1.02}}
                            whileTap={{scale:0.98}}>
                                <button className="font-semibold text-2xl text-white">
                                    Purchase
                                </button>
                            </motion.div>
                        </a>


                        {/*<span className="flex justify-start mb-2 ml-1">*/}
                        {/*       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"*/}
                        {/*            fill="none" stroke="url(#indigoToPurple)" stroke-width="2" stroke-linecap="round"*/}
                        {/*            stroke-linejoin="round" className="lucide lucide-check-icon lucide-check mr-1">*/}
                        {/*          <path d="M20 6 9 17l-5-5"/>*/}
                        {/*          <defs>*/}
                        {/*            <linearGradient id="indigoToPurple" x1="0%" y1="0%" x2="100%" y2="0%">*/}
                        {/*              <stop offset="0%" stop-color="#4f46e5"/>*/}
                        {/*              <stop offset="100%" stop-color="#a855f7"/>*/}
                        {/*            </linearGradient>*/}
                        {/*          </defs>*/}
                        {/*       </svg>*/}
                        {/*        */}
                        {/*   </span>*/}


                    </div>

                </motion.div>

            </div>
            <div className="w-[calc(100vw)]">

                <div className="max-w-3xl mx-auto px-5 py-8">
                    <h2 className="text-2xl font-bold mb-6 text-center md:mt-20  mt-110">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: .99999}}
                                key={index}
                                className="border border-gray-200 rounded-lg p-4 shadow-sm"
                                onClick={() => toggle(index)}
                            >
                                <button
                                    className="w-full text-left flex justify-between items-center text-blue-600 font-medium text-lg"
                                >
                                {faq.question}
                                    <span className="ml-2">
                                    {openIndexes.includes(index) ? "−" : "+"}
                                  </span>
                                </button>
                                    {openIndexes.includes(index) && (
                                        <p className="mt-3 text-gray-700 text-sm">{faq.answer}</p>
                                    )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <footer className="mt-12 py-6 bg-white bg-opacity-80">
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center text-gray-600">
                    <span className="absolute left-0 bottom-0">© 2025 PathToHire. All rights reserved.</span>
                    <Link to="/terms-of-service"><span className="p-4">Terms Of Service</span></Link>
                    <Link to="/privacy-policy"><span className="p-4">Privacy Policy</span></Link>
                </div>
            </footer>
        </div>
    );
}