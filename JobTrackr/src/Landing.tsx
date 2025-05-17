import { Link } from 'react-router-dom';
import { useEffect, useRef } from "react";
import gsap from 'gsap';
import './App.css';
import myImage from './assets/JobTrackr.png';
import bg from './assets/jbg.png';
import blur from'./assets/blur.png';
import robot from './assets/robot.png';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Landing() {
    const leftCard = useRef(null);
    const rightCard = useRef(null);
    const thirdCenterCard = useRef(null);
    gsap.registerPlugin(ScrollTrigger);

    useEffect(() => {
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            gsap.fromTo(leftCard.current,
                {y: '-100vh'},
                {y: '0', duration: 1.5, ease: 'back.out(1)'}
            );

            gsap.fromTo(rightCard.current,
                {y: '100vh'},
                {y: '0', duration: 1.5, ease: 'back.out(1)'}
            );
        } else {
            gsap.fromTo(leftCard.current,
                {x: '-100vw'},
                {x: '-35', duration: 2, ease: 'back.out(1)'}
            );

            gsap.fromTo(rightCard.current,
                {x: '100vw'},
                {x: '35', duration: 2, ease: 'back.out(1)'}
            );
        }
        gsap.fromTo(
            thirdCenterCard.current,
            { y: '20vh', opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 2,
                ease: 'back.out(1)',
                scrollTrigger: {
                    trigger: thirdCenterCard.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            }
        );

        ScrollTrigger.create({
            trigger: thirdCenterCard.current,
            start: 'top 80%',
            end: 'bottom top',
            onEnter: () => {
                gsap.fromTo(
                    thirdCenterCard.current,
                    { y: '20vh', opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 2,
                        ease: 'back.out(1)',
                        scrollTrigger: {
                            trigger: thirdCenterCard.current,
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                        },
                    }
                );
            },
            onLeave: () => {
                gsap.to(thirdCenterCard.current, {
                    y: '20vh',
                    opacity: 0,
                    duration: 1,
                    ease: 'power1.in',
                });
            },
            onLeaveBack: () => {
                gsap.to(thirdCenterCard.current, {
                    y: '20vh',
                    opacity: 0,
                    duration: 1,
                    ease: 'power1.in',
                });
            },
        });

        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);


    }, []);

    return (
        <div className="overflow-x-hidden overflow-y-hidden min-h-screen bg-gray-50 animate-scroll-bg"
             style={{
                 backgroundImage: `url(${bg})`,
                 backgroundSize: "cover",
                 backgroundPosition: "center",
             }}
        >
            {/* Responsive Navbar */}
            <nav className="bg-white shadow-sm relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <span className="text-2xl md:text-3xl font-bold text-blue-600">JobTrackr</span>
                    <Link to="/home">
                        <img
                            src={myImage}
                            alt="JobTrackr Logo"
                            className="h-12 md:h-16"
                        />
                    </Link>
                </div>
            </nav>

            {/* Main content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
                <section className="text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                        Track, Scan, Apply - <span className="sm:bg-[#fafbfb] p-3 rounded-2xl text-indigo-500 text-5xl">JobTrackr</span> simplifying Your Job Search!
                    </h1>

                    <div className="flex justify-center gap-4 mt-8">
                        <Link
                            to="/signup"
                            className="px-4 md:px-6 py-2 md:py-3 font-medium border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                        >
                            Signup
                        </Link>
                        <Link
                            to="/login"
                            className="px-4 md:px-6 py-2 md:py-3 font-medium border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                        >
                            Login
                        </Link>
                    </div>
                </section>
            </main>

            {/* Cards section - responsive layout */}
            <div className="px-4 sm:px-6 py-8">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center max-w-6xl mx-auto">
                    {/* Left Card */}
                    <div
                        ref={leftCard}
                        className="bg-white rounded-3xl p-6 shadow-indigo-300 shadow-xl w-full md:w-1/2"
                    >
                        <div className="text-gray-800 space-y-4">
                            <h2 className="text-xl text-center md:text-2xl font-bold text-blue-600">
                                Take Control of Your Job Hunt
                            </h2>
                            <p className="text-md font-semibold leading-relaxed">
                                Apply to jobs, track every application, and scan your resume all in one place.
                            </p>
                            <p className="text-sm md:text-md leading-relaxed">
                                Our AI helps you improve your resume instantly, stay organized, and move faster. No clutter, no guesswork, just tools that make job searching easier.
                            </p>
                        </div>
                    </div>

                    {/* Right Card */}
                    <div
                        ref={rightCard}
                        className="bg-white rounded-3xl p-6 shadow-indigo-300 shadow-xl  w-full md:w-1/2"
                    >
                        <div className="text-gray-800 space-y-4">
                            <h2 className="text-xl text-center md:text-2xl font-bold text-blue-600">
                                Advanced AI Resume Scanner
                            </h2>
                            <p className="text-md font-semibold leading-relaxed">
                                Get instant feedback on your resume and optimize it for specific job postings.
                            </p>
                            <p className="text-sm md:text-md leading-relaxed">
                                Our AI analyzes keywords, formatting, and content to help you stand out to recruiters and applicant tracking systems.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 sm:px-6 py-8 flex flex-col md:flex-row gap-6 md:gap-8 justify-center max-w-7xl mx-auto mt-[50px]">

                <div
                    ref={thirdCenterCard}
                    className="bg-white rounded-3xl shadow-indigo-300 shadow-xl w-full md:w-3/4 overflow-hidden"
                >
                    <div
                        className="text-gray-800 flex flex-col justify-center items-center h-full"
                        style={{
                            backgroundImage: `url(${blur})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="relative bg-white bg-opacity-80 h-full w-full flex flex-col justify-center items-center p-6">

                            <img className="absolute top-4 left-2 h-[40px] w-[40px] md:h-[60px] md:w-[60px]" src={robot} />

                            <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-4 text-center">
                                AI-Powered Resume Technology
                            </h2>
                            <p className="text-md font-semibold leading-relaxed text-center mb-3">
                                Unlock your career potential with NLP technology that analyzes resumes like professional recruiters
                            </p>
                            <p className="text-sm leading-relaxed text-center mb-6">
                                Our system uses advanced Natural Language Processing to evaluate your experience (40%), skills (30%),
                                education (20%), and projects (10%) using industry-standard assessment techniques.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mb-6">
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-bold text-blue-700 mb-2">Experience Analysis</h3>
                                    <p className="text-xs text-gray-700">Identifies job titles, duration, seniority, and key achievements through pattern recognition</p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-bold text-blue-700 mb-2">Skill Detection</h3>
                                    <p className="text-xs text-gray-700">Matches against 250+ programming, data, web, and cloud technologies</p>
                                </div>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-bold text-blue-700 mb-2">Education Scoring</h3>
                                    <p className="text-xs text-gray-700">Evaluates degrees, fields of study, and prestigiousness of institutions</p>
                                </div>
                            </div>
                            <Link to="/signup">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
                                    Get Your Resume Score
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="mt-12 py-6 bg-white bg-opacity-80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-gray-600">
                    <p>© 2025 JobTrackr. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}