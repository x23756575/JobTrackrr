import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import myImage from "./assets/JobTrackr.png";
import bg from "./assets/jbg.png";
import React from "react";


export default function PaymentsPage(){
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    async function startCheckout(userId: number) {
        try {
            const response = await fetch(`${apiBaseUrl}/payments/create-checkout-session?userId=1`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create checkout session');
            }

            const data = await response.json();
            window.location.href = data.checkoutUrl;
        } catch (error) {
            console.error('Error starting checkout:', error);
        }
    }


    return(
        <>
            <div className="overflow-x-hidden overflow-y-auto min-h-screen bg-gray-50 animate-scroll-bg"
                 style={{
                     backgroundImage: `url(${bg})`,
                     backgroundSize: "cover",
                     backgroundPosition: "center",
                 }}
            >
            <nav className="bg-white shadow-sm relative">
                <div className="max-w-7xl mx-auto py-2 flex items-center">

                    <Link to="/" className="text-xl md:text-3xl font-bold text-blue-600">
                        PathToHire
                    </Link>
                    <div className="ml-4 flex gap-4 font-medium text-sm">
                        <Link to="/home" className="text-gray-700 hover:text-blue-600">Home</Link>
                        <Link to="/scan" className="text-gray-700 hover:text-blue-600">
                            Resume scanner
                        </Link>
                        <Link to="/track" className="text-gray-700 hover:text-blue-600">
                            Applications
                        </Link>
                        <Link to="/rewrite" className="text-gray-700 hover:text-blue-600">Rephrase your resume</Link>
                        <Link to="/calendar" className="text-gray-700 hover:text-blue-600">
                            Calendar
                        </Link>

                    </div>



                </div>
            </nav>
                <p className="text-center text-5xl font-bold m-9">PathToHire plans</p>

                <div className="grid grid-cols-auto  md:grid-cols-[1fr_1fr] gap-14 justify-center h-100 md:w-[calc(100%-180px)] px-45 mx-auto mt-4 mb-18">

                    <motion.div className="p-[.15rem] rounded-lg bg-gradient-to-r from-gray-500 to-gray-700 "
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
                                       className="text-transparent bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text mr-1">Unlimited</span> file uploads!
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
                                    Track your application with our Calendar

                           </span>
                            <span className="flex justify-start mb-2">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-check-icon lucide-check mr-1"><path
                                       d="M20 6 9 17l-5-5"/>
                                </svg>
                                    Rephrase your resume for FREE
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
                                    Resume AI feedback
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
                            <a>
                                <motion.div className="mt-13 bg-gradient-to-r from-indigo-600 to-purple-500 px-14 py-3 rounded-xl inline-block dark:hover:bg-slate-100 shadow relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
                                            whileHover={{scale:1.02}}
                                            whileTap={{scale:0.98}}
                                onClick={() => startCheckout()}>
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
            </div>

        </>

    );
}