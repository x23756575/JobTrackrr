import bg from "./assets/jbg.png";
import './App.css'
import {motion} from "framer-motion";
import {type FormEvent, useEffect, useState} from 'react';
import { button } from "framer-motion/client";
import gsap from 'gsap';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import axios from "axios";
import {toast} from "react-toastify";

interface formData {
    job:string;
    position:string;
    status:string;
    description:string;
}
const initialFormState: formData = {
    job: '',
    position: '',
    status: '',
    description: ''
};

// Now use this constant as the initial value in useState:


export default function TrackPage(){
    const [form, setForm] = useState<formData>(initialFormState);
    const [hideForm, setHideForm] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    gsap.registerPlugin(ScrollToPlugin);

    const cancelForm = () => {

        setForm(initialFormState);
        setHideForm(true);

    }
    useEffect(() => {
        if (hideForm) {

        gsap.to(window, {duration: 1, scrollTo: {y: 0}, ease: "power2.out"});
        }
    }, [hideForm]);

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        console.log("submitted")
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/application',form )

            if(response.status === 200){
                setHideForm(true)
                setForm(initialFormState)
            }
            console.log(response.data)
        } catch (err) {
            setError('Invalid credentials or an error occurred');

            console.error('Login error:', err);
        }

    };



    // const stats ={
    //     total:
    //     interviewing:
    //     rejected:
    //     offers:
    // }

    // function submitApplication = async() =>{
    //
    //
    //
    // }
    return(
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 animate-scroll-bg" style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <motion.span
                            initial={{ opacity: 0}}
                            animate={{ opacity: 1}}
                            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent text-center sm:text-left"
                        >
                            JobTrackr
                        </motion.span>
                    </div>
                </nav>
                <div className="grid grid-cols-4 mx-auto gap-5 mt-6 w-[calc(100vw-150px)] mb-[50px]">
                    <div className="bg-[#FEFEFF] rounded-lg shadow">
                        <p className="text-md p-4 text-gray-600" >Total applications</p>
                        <p className="text-2xl font-bold ml-4 mb-4">21</p>
                    </div>
                    <div className="bg-[#FEFEFF] rounded-lg shadow">
                        <p className="text-md p-4 text-gray-600 ">Interviews</p>
                        <p className="text-2xl text-purple-500 font-bold ml-4 mb-4">15</p>
                    </div>
                    <div className=" bg-[#FEFEFF] rounded-lg shadow">
                        <p className="text-md p-4 text-gray-600">Offers</p>
                        <p className="text-2xl text-indigo-600 font-bold ml-4 mb-4">4</p>
                    </div>
                    <div className="bg-[#FEFEFF] rounded-lg shadow">
                        <p className="text-md p-4 text-gray-600">Rejections</p>
                        <p className="text-2xl text-red-600  font-bold ml-4 mb-4">2</p>
                    </div>
                </div>
                <div className="grid grid-rows-[auto_1fr] w-[calc(100vw-150px)] h-[100vh] mx-auto">
                    <div className={`flex justify-start items-center w-auto ${hideForm ?  'p-0 ': 'p-4'}`}>
                        <div className={`rounded-lg  w-full ${!hideForm ? 'bg-white shadow-md p-6' : ''}`}>
                            {!hideForm && <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <label htmlFor="job" className="text-sm font-medium text-gray-700 mb-1">Company</label>
                                    <input
                                        type="text"
                                        id="job"
                                        placeholder="Enter company name"
                                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        value={form.job}
                                        onChange={(e) => setForm({...form, job:e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="position" className="text-sm font-medium text-gray-700 mb-1">Position</label>
                                    <input
                                        type="text"
                                        id="position"
                                        placeholder="Enter job position"
                                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        value={form.position}
                                        onChange={(e) => setForm({...form, position:e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        id="status"
                                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        value={form.status}
                                        onChange={(e) => setForm({...form, status:e.target.value})}
                                        required
                                    >
                                        <option value="">Select status</option>
                                        <option className="font-bold text-gray-600" value="applied">Applied</option>
                                        <option className="font-bold text-purple-500" value="interviewing">Interviewing</option>
                                        <option className="font-bold text-indigo-600" value="offered">Offered</option>
                                        <option className="font-bold text-red-600" value="rejected">Rejected</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea
                                        id="description"
                                        rows={3}
                                        placeholder="Add notes about your application"
                                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                        value={form.description}
                                        onChange={(e) => setForm({...form, description:e.target.value})}
                                        required
                                    />
                                </div>
                                <button className="bg-blue-500 text-xs  text-white p-3 px-5 mr-2 rounded-xl"
                                type="submit"
                                >
                                    Track your application
                                </button>
                                <button className="bg-gray-400 text-xs text-white p-3 px-5  rounded-xl"
                                        onClick={cancelForm}
                                        type="button"
                                >
                                    Cancel
                                </button>
                                {!error &&
                                    <span className="">{error}</span>}

                            </form>
                            }
                            {hideForm &&
                            <div className="flex justify-start mb-2 ml-1">
                                <button

                                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white mb-2 py-3 px-4 rounded-xl hover:opacity-90 transition-opacity font-medium"
                                    onClick ={() => setHideForm(prev => !prev)}
                                >
                                    Add Application
                                </button>
                            </div>
                            }
                        </div>


                    </div>
                    <div className="bg-[#FEFEFF] overflow-auto rounded-lg shadow">
                        {/*<hr className="border border-gray-200"/>*/}
                        <div className="w-full ">
                            <h1 className="font-semibold text-2xl border-b border-gray-200 p-3">Your applications</h1>
                        </div>
                        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] w-full bg-gray-50 p-3 pb-4 pl-10">
                            <span className="text-left font-medium text-gray-500">Company</span>
                            <span className="text-left  font-medium text-gray-500">Position</span>
                            <span className="text-left  font-medium text-gray-500">Status</span>
                            <span className="text-left  font-medium text-gray-500">Description</span>
                            <span className="text-left  font-medium text-gray-500">Date applied</span>
                        </div>
                        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr] w-full bg-gray-50 p-3 pb-4 pl-10">
                            <span className="text-left font-bold text-gray-700">Google</span>
                            <span className="text-left  text-gray-700 ">Software engineer</span>
                            <span className="text-left  font-medium text-purple-800">
                                <motion.div className="bg-purple-200 text-xs py-2 px-3 inline-flex rounded-3xl">
                                    Interviewing
                                </motion.div>
                            </span>
                            <span className="text-left  font-medium text-gray-500">Going well</span>
                            <span className="text-left  font-medium text-gray-500">25-03-2025</span>

                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}