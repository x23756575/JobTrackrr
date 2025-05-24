import { Link, useNavigate } from 'react-router-dom';
import myImage from './assets/JobTrackr.png';
import './index.css';
import pdf from './assets/pdf.png';
import docx from './assets/docx.png';
import Dropzone from "./Dropzone.tsx"
import axios from "axios";
import * as cheerio from "cheerio";
import React, {useEffect} from "react";
import { motion } from 'framer-motion';


export default function Home() {

    const navigate = useNavigate();
    const imageCSS = "h-[22px] w-[22px] ml-2"

    return (
        <div className="min-h-screen bg-white">

            <nav className="bg-white shadow-sm relative">
                <div className="max-w-7xl px-4 sm:px-6 py-2 flex items-center">

                    <Link to="/" className="flex items-center">
                        <span className="text-xl md:text-3xl font-bold text-blue-600">JobTrackr</span>
                    </Link>

                    <div className="flex justify-start gap-4 font-medium md:text-sm text-xs items-center ml-3 pt-1">
                        <Link to="/home" className="text-gray-700 hover:text-blue-600">Resume scanner</Link>
                        <Link to="/scan" className="text-gray-700 hover:text-blue-600">Applications</Link>
                        <Link to="/track" className="text-gray-700 hover:text-blue-600">Calendar</Link>
                    </div>

                </div>
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr] gap-4 p-4 min-h-[calc(100vh-100px)]">
                <div className="bg-red-500 p-4 rounded text-white min-h-[200px] md:min-h-full">
                    1
                </div>
                <div className="bg-white p-4 rounded text-white min-h-[300px]">
                    <Dropzone/>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col animate-fade-in min-h-[600px]">
                    <header className="font-bold tracking-wide text-center text-blue-500 text-2xl mb-6">
                        RESUME FEEDBACK HUB
                    </header>

                    <motion.div
                        onClick={() => navigate('/scan')}
                        whileHover={{scale:1.02}}
                        whileTap={{scaleX:0.9,scaleY:0.97}}
                        className="cursor-pointer bg-[#50A2FF] text-white font-semibold shadow-xl text-lg text-center py-4 px-6 rounded-md hover:opacity-90 transition duration-300 mb-6"
                    >
                        Scan My Resume
                        <div className="flex justify-center items-center gap-2 mt-2">
                            <span className="text-xs text-gray-200 opacity-80">pdf, doc and docx supported</span>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-4 flex-1">
                        {[
                            { title: "Experience Match", color: "bg-blue-50", icon: "💼", desc: "Compares your experience against relevant job listings for precise matching"},
                            { title: "Skill Coverage", color: "bg-green-50", icon: "🛠️", desc: "Analyzes your skills across 50+ job descriptions for comprehensive extraction" },
                            { title: "Formatting Score", color: "bg-yellow-50", icon: "🧾", desc: "Evaluates resume formatting using advanced parsing techniques" },
                            { title: "Keyword Optimization", color: "bg-purple-50", icon: "🔍", desc: "Keyword optimization powered by Stanford CoreNLP" },
                        ].map((card, idx) => (
                            <div
                                key={idx}
                                className={`rounded-xl p-4 ${card.color} shadow-md hover:shadow-xl transition-transform hover:scale-[1.02] duration-300 border border-gray-100`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="text-2xl">{card.icon}</div>
                                    <div className="text-base font-semibold text-gray-800">{card.title}</div>
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}