import { Link, useNavigate } from 'react-router-dom';
import myImage from './assets/JobTrackr.png';
import './index.css';
import pdf from './assets/pdf.png';
import docx from './assets/docx.png';
import Dropzone from "./Dropzone.tsx"
import axios from "axios";
import * as cheerio from "cheerio";
import {useEffect} from "react";
import { motion } from 'framer-motion';


export default function Home() {

    const navigate = useNavigate();
    const imageCSS = "h-[22px] w-[22px] ml-2"



    return (
        <div className="min-h-screen bg-white h-full overflow-y-auto overflow-x-hidden">
            {/* Navbar */}
            <nav className="bg-white shadow-sm relative">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
                    <Link to="/home">
                        <img
                            src={myImage}
                            alt="JobTrackr Logo"
                            className="absolute top-[-8px] right-5 h-20"
                        />
                    </Link>
                    <span className="text-3xl font-bold text-blue-600 ml-4">JobTrackr</span>
                </div>
            </nav>

            <div className="grid grid-cols-[auto] md:grid-cols-[1fr_1.5fr_1fr] overflow-y-auto mt-4 mb-2 gap-4 h-[calc(100vh-100px)]">
                {/*first div*/}
                <div className="bg-red-500 p-4 rounded text-white h-full">
                    1
                </div>
                {/*second div*/}
                <div className="bg-white p-4 rounded text-white">
                    <Dropzone/>
                </div>
                {/*third div*/}
                <div className="bg-white p-4 rounded-xl shadow-lg h-full flex flex-col gap-4 animate-fade-in">
                    <header className="font-medium tracking-wide text-center text-blue-600 text-2xl">
                        Smart Resume Scanner
                    </header>
                    <motion.div
                        onClick={() => navigate('/scan')}
                        whileHover={{scale:1.02}}
                        whileTap={{scaleX:0.9,scaleY:0.97}}
                        className="cursor-pointer bg-[#50A2FF] text-white font-semibold shadow-xl text-lg text-center py-3 rounded-md mt-6 hover:opacity-90 transition duration-300"
                    >
                        Scan My Resume
                        <div className="flex justify-center items-center gap-2 mt-2">
                            <span className="text-xs text-gray-600">pdf, doc and docx supported</span>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4 mt-2">
                        {[
                            { title: "Experience Match", color: "bg-blue-50", icon: "💼",desc: "Compares your experience against relevant job listings for precise matching"},
                            { title: "Skill Coverage", color: "bg-green-50", icon: "🛠️",desc: "Analyzes your skills across 50+ job descriptions for comprehensive extraction" },
                            { title: "Formatting Score", color: "bg-yellow-50", icon: "🧾",desc: "Evaluates resume formatting using advanced parsing techniques" },
                            { title: "Keyword Optimization", color: "bg-purple-50", icon: "🔍",desc: "Keyword optimization powered by Stanford CoreNLP" },
                        ].map((card, idx) => (
                            <div
                                key={idx}
                                className={`rounded-xl p-4 ${card.color} shadow-md hover:shadow-xl transition-transform hover:scale-[1.03] duration-300`}
                            >
                                <div className="text-3xl">{card.icon}</div>
                                <div className="mt-2 text-lg font-semibold text-gray-800">{card.title}</div>
                                <p className="text-sm text-gray-500 mt-1">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    );
}
