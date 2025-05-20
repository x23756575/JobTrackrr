import { Link, useNavigate } from 'react-router-dom';
import myImage from './assets/JobTrackr.png';
import './index.css';
import pdf from './assets/pdf.png';
import docx from './assets/docx.png';
import Dropzone from "./Dropzone.tsx"
import axios from "axios";
import * as cheerio from "cheerio";
import {useEffect} from "react";


export default function Home() {

    const navigate = useNavigate();
    const imageCSS = "h-[22px] w-[22px] ml-2"



    return (
        <div className="min-h-screen bg-gray-50 h-full overflow-y-auto">
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

            {/* Grid Section */}
            <div className="grid grid-cols-[1fr_1.5fr_1fr] overflow-y-auto mt-4 mb-2 gap-4 h-[calc(100vh-100px)]">
                <div className="bg-red-500 p-4 rounded text-white h-full">1</div>
                <div className="bg-white p-4 rounded text-white"><Dropzone/></div>
                <div className="bg-gray-100 p-4 rounded shadow-md">
                    <header className="font-bebas tracking-wide text-center text-green-600 text-5xl p-3 rounded-xl">
                        Scan your resume
                    </header>
                    <div className="text-gray-700 text-center">
                        <span>Receive a full custom-tailored analysis of your resume</span>
                        <br/>
                        <div onClick={() => navigate('/scan')}  className="bg-[#76ffad] text-center hover:bg-[#43ff8e] transition-colors duration-300 rounded-md py-2 mt-3">
                            <button className="text-3xl text-gray-600">Click here</button>
                            <div className="flex justify-start">
                                <img className={imageCSS}
                                     src={pdf}/>
                                <img className={imageCSS}
                                     src={docx}/>
                                <span className="text-gray-600 text-xs mt-1 ml-1 p-0">supported</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
