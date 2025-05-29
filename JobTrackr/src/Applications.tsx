import bg from "./assets/jbg.png";
import './App.css'
import {motion} from "framer-motion";
import {type FormEvent, useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import axios from "axios";
import React from "react";
import bin from "./assets/removebin.png";
import edit from "./assets/editbutton.png";
import abin from "./assets/animbin.gif";
import { Link } from "react-router-dom";
import Timeline from "./Timeline.tsx"


interface formData {
    job:string;
    position:string;
    status:string;
    description:string;
    interviewDate:string;
}
interface trackData{
    id:string;
    job:string;
    position:string;
    status:string;
    description:string;
    date: string;
    interviewDate:string;
}
interface editFormData{
    id:string;
    job:string;
    position:string;
    status:string;
    description:string;
    interviewDate:string;
}
interface appStats{
    interviews:number;
    offers:number;
    hired:number;
    rejections:number;
}

const initialEditState: editFormData = {
    id:'',
    job: '',
    position: '',
    status: '',
    description: '',
    interviewDate:''
};

const initialFormState: formData = {
    job: '',
    position: '',
    status: '',
    description: '',
    interviewDate:''
};

export default function TrackPage(){
    const [form, setForm] = useState<formData>(initialFormState);
    const [hideForm, setHideForm] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [track, setTrack] = useState<trackData[]>([]);
    const [editForm, setEditForm] = useState<editFormData>(initialEditState)
    const [hideEdit,setHideEdit] = useState<boolean>(true);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [timeline , showTimeline] = useState<boolean>(false);
    const [tlId, setTlId] = useState<string>('');
    const [tlPos, setTlPos] = useState<string>('');
    const [tlJob, setTlJob] = useState<string>('');
    const [clickedTL, setClicked] = useState<string>('');

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    const appData = useRef(null);

    const initialStats : appStats = {
        interviews:0,
        offers:0,
        hired:0,
        rejections:0,
    }
    const [stats, setStats] = useState<appStats>(initialStats);
    const [trackId, setTrackId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [updStats,setUpdStats] = useState<boolean>(false);

    gsap.registerPlugin(ScrollToPlugin);

    const cancelForm = () => {
        setForm(initialFormState);
        setHideForm(true);
    }

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const capitalizeWords = (str: string): string => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    useEffect(() => {
        gsap.fromTo(appData.current,
            {y: '-12vh', opacity: .5},
            {y: '0', opacity: 1, duration: 1.5, ease: 'back.out(1)'}
        );
    }, []);

    useEffect(() => {
        if (hideForm || hideEdit) {
            gsap.to(window, {duration: 1, scrollTo: {y: 0}, ease: "power2.out"});
        }
    }, [hideForm, hideEdit]);

    useEffect(() => {
        fetch(`${apiBaseUrl}/appdata`)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                console.log(data);
                setTrack(data);

                const stats : appStats = {
                    interviews:0,
                    offers:0,
                    hired:0,
                    rejections:0,
                }
                for (let i = 0; i < data.length; i++) {
                    if(data[i].status === 'Interviewing'){
                        stats.interviews++;
                    }else if(data[i].status === 'Rejected'){
                        stats.rejections++;
                    }
                    else if(data[i].status === 'Offered'){
                        stats.offers++;
                    }else if(data[i].status === 'Hired'){
                        stats.hired++;
                    }
                    setStats(stats)
                }
            })
            .catch(error => console.error('error', error));
    }, [form, editForm,deleteId,updStats]);



    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        console.log("submitted")
        e.preventDefault();
        try {
            const response = await axios.post(`${apiBaseUrl}/application`, form)

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


    const handleEdit = async(e: FormEvent<HTMLFormElement>): Promise<void> => {
        console.log("submitted")
        try {
            const response = await axios.post(`${apiBaseUrl}/editapp`, editForm)

            if(response.status === 200){
                const updated = await axios.get(`${apiBaseUrl}/appdata`);
                setTrack(updated.data);
                setTrackId(null)
                setHideForm(true)
                setHideEdit(false);
                setEditForm(initialEditState);
            }
            console.log(response.data)
        } catch (err) {
            setError('Invalid credentials or an error occurred');
            console.error('Login error:', err);
        }
    };
    const handleDelete = async(id: string) => {
        console.log("before delete",id)

        try {
            const response = await axios.post(`${apiBaseUrl}/deleteapp?id=${encodeURIComponent(id)}`)


            if(response.status === 200){
                const updated = await axios.get(`${apiBaseUrl}/appdata`);
                setTrack(updated.data);
                setDeleteId(null);
                console.log("deleted")
                console.log(track)


            }
            console.log(response.data)
        } catch (err) {
            setError('Invalid credentials or an error occurred');
            console.error('Login error:', err);
        }
    };

    return(
        <>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 animate-scroll-bg z-[0]" style={{
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
                            <Link to="/scan" className="text-gray-700 hover:text-blue-600">Resume scanner</Link>
                            <Link to="/track" className="text-gray-700 hover:text-blue-600">Applications</Link>
                            <Link to="/rewrite" className="text-gray-700 hover:text-blue-600">Rephrase your resume</Link>
                            <Link to="/payments" className="text-gray-700 hover:text-blue-600">Plans</Link>
                        </div>

                    </div>
                </nav>

                <div className="grid grid-cols-2 sm:grid-cols-4 mx-auto gap-3 sm:gap-5 mt-6 px-4 sm:px-0 sm:w-[calc(100vw-150px)] mb-[30px] sm:mb-[50px] relative z-[0]">
                    <div className="bg-gradient-to-r from-[#FEFEFF] to-green-100 rounded-lg shadow">
                        <p className="text-sm sm:text-md p-3 sm:p-4 text-gray-600">Jobs Landed</p>
                        <p className="text-xl sm:text-2xl text-green-700 font-bold ml-3 sm:ml-4 mb-3 sm:mb-4">{stats.hired}</p>
                    </div>
                    <div className="bg-gradient-to-r from-[#FEFEFF] to-purple-100 rounded-lg shadow">
                        <p className="text-sm sm:text-md p-3 sm:p-4 text-gray-600">Interviews</p>
                        <p className="text-xl sm:text-2xl text-purple-500 font-bold ml-3 sm:ml-4 mb-3 sm:mb-4">{stats.interviews}</p>
                    </div>
                    <div className="bg-gradient-to-r from-[#FEFEFF] to-blue-100 rounded-lg shadow">
                        <p className="text-sm sm:text-md p-3 sm:p-4 text-gray-600">Offers</p>
                        <p className="text-xl sm:text-2xl text-indigo-600 font-bold ml-3 sm:ml-4 mb-3 sm:mb-4">{stats.offers}</p>
                    </div>
                    <div className="bg-gradient-to-r from-[#FEFEFF] to-red-100 rounded-lg shadow">
                        <p className="text-sm sm:text-md p-3 sm:p-4 text-gray-600">Rejections</p>
                        <p className="text-xl sm:text-2xl text-red-600 font-bold ml-3 sm:ml-4 mb-3 sm:mb-4">{stats.rejections}</p>
                    </div>
                </div>
                {timeline && (
                   <>

                        <div className="flex flex-col justify-center items-center sm:w-[10px] md:w-auto">
                            <Timeline className="justify-center" key={tlId} currentStep={tlId}/>
                        </div>
                   </>
                    )};

                <div className="flex flex-col px-4 sm:px-0 sm:w-[calc(100vw-150px)] min-h-[60vh] mx-auto relative z-1 pb-6">
                    {/* Form Section */}
                    <div className={`flex justify-start items-center w-full relative z-25 ${hideForm ? 'p-0' : 'p-4'} mb-4`}>
                        <div className={`rounded-lg w-full ${!hideForm ? 'bg-white shadow-md p-4 sm:p-6' : ''}`}>
                            {!hideForm && (
                                <form className="space-y-4" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex flex-col">
                                            <label htmlFor="status" className="text-sm font-medium text-gray-700 mb-1">Status</label>
                                            <select
                                                id="status"
                                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                value={form.status}
                                                onChange={(e) => setForm({...form, status:e.target.value})}
                                                required
                                            >
                                                <option value="">No status</option>
                                                <option className="font-bold text-green-600" value="Hired">Hired</option>
                                                <option className="font-bold text-purple-500" value="Interviewing">Interviewing</option>
                                                <option className="font-bold text-indigo-600" value="Offered">Offered</option>
                                                <option className="font-bold text-red-600" value="Rejected">Rejected</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="interviewDate" className="text-sm font-medium text-gray-700 mb-1">Interview date (if applicable)</label>
                                            <input
                                                id="interviewDate"
                                                type="datetime-local"
                                                placeholder="30"
                                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                onChange={(e) => setForm({...form, interviewDate:e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            id="description"
                                            maxLength={20}
                                            rows={3}
                                            placeholder="Add notes about your application"
                                            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            value={form.description}
                                            onChange={(e) => setForm({...form, description:e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-2">
                                        <button
                                            className="bg-blue-500 text-sm text-white p-3 px-5 rounded-xl flex-1 sm:flex-none"
                                            type="submit"
                                        >
                                            Track your application
                                        </button>
                                        <button
                                            className="bg-gray-400 text-sm text-white p-3 px-5 rounded-xl flex-1 sm:flex-none"
                                            onClick={cancelForm}
                                            type="button"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                    {!error && <span className="">{error}</span>}
                                </form>
                            )}
                            {hideForm && (
                                <div className="flex justify-start mb-2 ml-1 z-[0]">
                                    <button
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white mb-2 py-3 px-4 rounded-xl hover:opacity-90 transition-opacity font-medium w-full sm:w-auto"
                                        onClick={() => setHideForm(prev => !prev)}
                                    >
                                        Add Application
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-[#FEFEFF] rounded-lg shadow relative flex-1">
                        <div className="w-full z-20 relative">
                            <span className="text-2xl md:px-4 md:py-2 px-2 py-0 rounded rounded-t-xl bg-[#FBF3F4] font-semibold absolute z-10 md:-top-11 -top-7 right-4 text-slate-600">Calendar</span>
                            <div className="flex justify-between items-center bg-[linear-gradient(to_right,_#ecfdf5,_#f5f3ff,_#eff6ff,_#fef2f2)] border-b border-gray-200 p-3 relative">
                                <div>
                                    <h1 className="font-semibold text-xl sm:text-2xl">Your applications</h1>
                                    <p className="text-xs font-semibold text-gray-500 mt-1">Click an application to view timeline</p>
                                </div>


                                    <motion.div whileHover={{scale: 1.1}}>
                                        <Link to="/calendar" className="flex justify-center items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none"
                                                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                     className="lucide lucide-calendar-range-icon lucide-calendar-range sm:w-[50px] sm:h-[50px] mr-11"
                                                    >
                                                    <rect width="18" height="18" x="3" y="4" rx="2"/>
                                                    <path d="M16 2v4"/>
                                                    <path d="M3 10h18"/>
                                                    <path d="M8 2v4"/>
                                                    <path d="M17 14h-6"/>
                                                    <path d="M13 18H7"/>
                                                    <path d="M7 14h.01"/>
                                                    <path d="M17 18h.01"/>
                                                </svg>
                                        </Link>
                                    </motion.div>
                            </div>
                        </div>

                        <div className="hidden sm:grid grid-cols-5 w-full bg-gray-50 p-3 pb-4 pl-10 relative z-10">
                            <span className="text-left font-medium text-gray-500">Company</span>
                            <span className="text-left font-medium text-gray-500">Position</span>
                            <span className="text-left font-medium text-gray-500">Status</span>
                            <span className="text-left font-medium text-gray-500">Description</span>
                            <span className="text-left font-medium text-gray-500">Interview date</span>
                        </div>

                        <div className="w-full p-3 pb-4 sm:pl-10 relative z-5 overflow-auto max-h-[60vh] z-[0]">
                            <div ref={appData} className="space-y-2 sm:space-y-0 sm:[&>*:nth-child(odd)]:bg-gray-50 relative z-0">
                                {track?.map((t: trackData) => (
                                    trackId === t.id ? (
                                        <React.Fragment key={t.id}>
                                            <form className="bg-white p-4 rounded-2xl shadow space-y-3 sm:space-y-0 sm:grid sm:grid-cols-5 sm:gap-2" onSubmit={handleEdit}>
                                                <input
                                                    type="text"
                                                    name="company"
                                                    placeholder="Company"
                                                    value={editForm.job}
                                                    onChange={(e) => setEditForm({ ...editForm, job: e.target.value })}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                                <input
                                                    type="text"
                                                    name="position"
                                                    placeholder="Position"
                                                    value={editForm.position}
                                                    onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                                <select
                                                    name="status"
                                                    value={editForm.status}
                                                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                >
                                                    <option value="">No status</option>
                                                    <option className="font-bold text-green-600" value="Hired">Hired</option>
                                                    <option className="font-bold text-purple-600" value="Interviewing">Interviewing</option>
                                                    <option className="font-bold text-blue-600" value="Offered">Offered</option>
                                                    <option className="font-bold text-red-600" value="Rejected">Rejected</option>
                                                </select>
                                                <input
                                                    type="text"
                                                    name="description"
                                                    placeholder="Description"
                                                    value={editForm.description}
                                                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                                    <input
                                                        type="datetime-local"
                                                        name="interviewDate"
                                                        placeholder=""
                                                        onChange={(e) => setEditForm({ ...editForm, interviewDate: e.target.value })}
                                                        className="w-full sm:w-40 p-2 border border-gray-300 rounded"
                                                    />
                                                    <button
                                                        className="bg-gradient-to-r from-green-300 to-indigo-500 text-white py-2 px-4 rounded-xl hover:opacity-90 transition-opacity font-medium"
                                                        type="submit"
                                                    >
                                                        Save
                                                    </button>
                                                </div>
                                            </form>
                                        </React.Fragment>
                                    ) : (
                                        <div
                                            key={t.id}
                                            className="bg-white sm:bg-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none shadow sm:shadow-none sm:grid sm:grid-cols-5 mb-2 sm:mb-0 sm:py-3 sm:px-4 w-full sm:hover:bg-gray-50 space-y-2 sm:space-y-0 sm:gap-y-1 relative"
                                            onMouseEnter={() => setHoveredId(t.id)}
                                            onMouseLeave={() => setHoveredId(null)}
                                            onClick={() => {
                                                setTlId('')
                                                setTlId(t.status)
                                                setTlPos(t.position)
                                                setTlJob(t.job)
                                                showTimeline(true)}
                                            }
                                        >

                                            {/*{hoveredId === t.id && (*/}
                                            {/*    <Timeline*/}
                                            {/*        className="absolute -top-0 left-30 bg-gray-100 shadow-md shadow-gray-100 rounded-xl h-[100px]  w-100  z-[9999]"*/}
                                            {/*        id={t.id}*/}
                                            {/*        currentStep={t.status}*/}
                                            {/*    />*/}
                                            {/*)}*/}
                                            <div className="sm:hidden space-y-2">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Company</p>
                                                        <span className="font-bold text-gray-700">{t.job}</span>
                                                    </div>
                                                    <div className="flex space-x-2">
                                                        <img
                                                            className="h-[17px] w-[17px] cursor-pointer"
                                                            onClick={() => {
                                                                setEditForm({
                                                                    id: t.id,
                                                                    job: t.job,
                                                                    position: t.position,
                                                                    status: t.status,
                                                                    description: t.description,
                                                                    interviewDate:t.interviewDate
                                                                });
                                                                setTrackId(t.id);
                                                                setHideEdit(true)
                                                            }}
                                                            src={edit}
                                                            alt="Edit"
                                                        />
                                                        <img
                                                            className="h-[20px] w-[20px] cursor-pointer"
                                                            src={abin}
                                                            onClick={() => {setDeleteId(t.id);
                                                                handleDelete(t.id);
                                                            }}
                                                            alt="Delete"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Position</p>
                                                    <span className="text-gray-700">{t.position}</span>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Status</p>
                                                    <motion.div
                                                        className={`text-xs font-medium py-2 px-3 inline-flex rounded-3xl ${
                                                            t.status === 'Interviewing'
                                                                ? 'bg-purple-200 text-purple-800'
                                                                : t.status === 'Offered'
                                                                    ? 'bg-blue-100 text-blue-800'
                                                                    : t.status === 'Hired'
                                                                        ? 'bg-green-100 text-green-800'
                                                                        : t.status === 'Rejected'
                                                                            ? 'bg-red-100 text-red-800'
                                                                            : 'bg-gray-100 text-gray-600'
                                                        }`}
                                                    >
                                                        {capitalizeWords(t.status)}
                                                    </motion.div>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Description</p>
                                                    <span className="font-medium text-gray-500">{t.description}</span>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Interview Date</p>
                                                    <span className="font-medium text-gray-500">{formatDate(t.interviewDate)}</span>
                                                </div>
                                            </div>

                                            <span className="hidden sm:block w-full md:w-auto text-left font-bold text-gray-700">
                                                {t.job}
                                            </span>
                                            <span className="hidden sm:block w-full md:w-auto text-left text-gray-700">
                                                {t.position}
                                            </span>
                                            <span className="hidden sm:block w-full md:w-auto text-left font-medium">
                                                <motion.div
                                                    className={`text-xs font-medium py-2 px-3 inline-flex rounded-3xl ${
                                                        t.status === 'Interviewing'
                                                            ? 'bg-purple-200 text-purple-800'
                                                            : t.status === 'Offered'
                                                                ? 'bg-blue-100 text-blue-800'
                                                                : t.status === 'Hired'
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : t.status === 'Rejected'
                                                                        ? 'bg-red-100 text-red-800'
                                                                        : 'bg-gray-100 text-gray-600'
                                                    }`}
                                                >
                                                    {capitalizeWords(t.status)}
                                                </motion.div>
                                            </span>
                                            <span className="hidden sm:block w-full md:w-auto text-left font-medium text-gray-500">
                                                {t.description}
                                            </span>
                                            <span className="hidden sm:block relative w-full md:w-auto text-left font-medium text-gray-500">
                                                {formatDate(t.interviewDate)}
                                                <div className="absolute top-0 right-0 my-auto flex space-x-2">
                                                    <img
                                                        className="h-[17px] w-[17px] cursor-pointer"
                                                        onClick={() => {
                                                            setEditForm({
                                                                id: t.id,
                                                                job: t.job,
                                                                position: t.position,
                                                                status: t.status,
                                                                description: t.description,
                                                                interviewDate:t.interviewDate
                                                            });
                                                            setTrackId(t.id);
                                                            setHideEdit(true)
                                                        }}
                                                        src={edit}
                                                        alt="Edit"
                                                    />
                                                    <img
                                                        className="h-[20px] w-[20px] cursor-pointer"
                                                        src={abin}
                                                        onClick={() => {setDeleteId(t.id);
                                                            handleDelete(t.id);
                                                        }}
                                                        alt="Delete"
                                                    />
                                                </div>
                                            </span>
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}