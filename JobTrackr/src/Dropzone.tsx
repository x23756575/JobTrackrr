import { motion } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';
import { useDropzone, type DropzoneRef } from 'react-dropzone';

interface FileWithPath extends File {
    path?: string;
}

interface fileDesc {
    file: File | null;
    jobDesc: string;
}

export default function Dropzone(): React.ReactElement {
    const dropzoneRef = useRef<DropzoneRef>(null);
    const [hovered, setHovered] = useState<boolean>(false);

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

    const submitDropzone = async () => {
        if (!form.file) {
            alert('Please select a file first');
            return;
        }

        // Example upload with FormData
        const data = new FormData();
        data.append('file', form.file);
        data.append('jobDesc', form.jobDesc);

        try {
            const response = await fetch('http://localhost:8080/compareresume', {
                method: 'POST',
                body: data,
            });
            const text = await response.text();
            console.log(text);
            if (response.ok) {
                alert('Upload successful');

            } else {
                alert('Upload failed');
            }
        } catch (error) {
            alert('Error uploading file');
        }
    };

    return (
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
                                <li className="font-bold text-red-400">No file selected</li>
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
                    className="text-md w-full p-4 border border-gray-300 rounded-xl h-full min-h-[200px] focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none resize-none text-gray-700"
                    rows={8}
                />
                </div>
            </div>
            <div className="flex justify-center">
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

            </div>
            <span className="text-gray-500 text-xs text-center">Our AI will analyze your resume against the job description and provide keyword matching, skills gap analysis, and tailored improvement suggestions.</span>

        </>
    );
}
