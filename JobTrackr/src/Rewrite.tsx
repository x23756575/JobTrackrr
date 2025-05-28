import { Link } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import { type DropzoneRef, useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import axios from "axios";
import {InferenceClient} from "@huggingface/inference";

interface FileWithPath extends File {
    path?: string;
}

interface FileDesc {
    file: File | null;
    text: string;
}

export default function RewritePage() {
    const dropzoneRef = useRef<DropzoneRef>(null);
    const [hovered, setHovered] = useState<boolean>(false);
    // const [fileMode, setFileMode] = useState<boolean>(true);
    const [text, setText] = useState<string>('');
    const [result, setResult] = useState<string | undefined>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [form, setForm] = useState<FileDesc>({
        file: null,
        text: "",
    });
    //
    // // Clear all state when switching modes
    // const handleModeSwitch = () => {
    //     setFileMode((prev) => !prev);
    //     // Clear form data
    //     setForm({
    //         file: null,
    //         text: "",
    //     });
    //     // Clear results
    //     setText('');
    //     setResult('');
    //     // Reset loading state
    //     setIsLoading(false);
    // };

    // Clear results when form data changes
    // useEffect(() => {
    //     setText('');
    //     setResult('');
    // }, [form.file, form.text]);

    // const openDialog = () => {
    //     dropzoneRef.current?.open();
    // };
    //
    // const onDrop = (acceptedFiles: File[]) => {
    //     setForm((prev) => ({
    //         ...prev,
    //         file: acceptedFiles[0] || null,
    //     }));
    // };

    // const { getRootProps, getInputProps } = useDropzone({
    //     onDrop,
    //     accept: {
    //         "application/msword": [".doc"],
    //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    //         "application/pdf": [".pdf"],
    //     },
    // });

    const prepend =
        `You are a professional resume writer. Your task is to rewrite the user's resume text to be more concise, clear, and professional.

- Only rephrase or reorganize the information provided.
- Do NOT invent any new details, job titles, dates, or sections.
- Do NOT use placeholders like [Your Degree], [Company Name], or template text.
- Use impactful and precise language.
- Keep the same meaning, tone, and style unless improving clarity or professionalism.
- Preserve all relevant skills, experience, education, and projects as given.
- If any information is missing in the input, do not add it.
- Output the rewritten resume as plain text without any explanations or commentary.
;`


    const submitData = async (): Promise<void> => {
        if (isLoading) return;

        // Optionally re-enable these validations if needed
        // if (!fileMode && !form.text.trim()) {
        //     setResult("Please enter some text first.");
        //     return;
        // }
        // if (fileMode && !form.file) {
        //     setResult("Please select a file first.");
        //     return;
        // }

        setIsLoading(true);
        setText('');
        setResult('');

        try {
            const inputText = form.text.trim();
            const requestPayload = {
                model: "meta-llama/Llama-3.1-8B-Instruct",
                prompt: `${prepend}\n\nTimestamp: ${Date.now()}\nRandom: ${Math.random()}\n\n${inputText}`,
                stream: false,
                options: {
                    seed: Math.floor(Math.random() * 1000000),
                    temperature: 0.8,
                    top_p: 0.9,
                    repeat_penalty: 1.1,
                    num_ctx: 8192,
                }
            };

            const apiKey = import.meta.env.VITE_HF_API_KEY;
            const client = new InferenceClient(apiKey);

            const ollama = await client.chatCompletion({
                provider: "nebius",
                model: "meta-llama/Llama-3.1-8B-Instruct",
                messages: [{ role: "user", content: prepend + inputText }],
                temperature: 0.8,
                top_p: 0.9,
                seed: 123456,
                max_tokens: 1024,
            });

            console.log('Received AI response:', ollama);
            setResult(ollama.choices?.[0]?.message?.content || "No response from AI.");
        } catch (err) {
            console.error('Submission error:', err);
            setResult(`Error occurred: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setIsLoading(false);
        }
    };


    const clearAll = () => {
        setForm({
            file: null,
            text: "",
        });
        setText('');
        setResult('');
        setIsLoading(false);
    };

    // const ToggleSwitch = (
    //     <label className="inline-flex items-center cursor-pointer mb-4">
    //         <input
    //             type="checkbox"
    //             className="sr-only peer"
    //             checked={!fileMode}
    //             onChange={handleModeSwitch}
    //         />
    //         <div className="relative w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer peer-checked:bg-gray-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
    //         <span className="ml-3 text-sm font-medium text-gray-900">
    //             {fileMode ? "File mode" : "Text mode"}
    //         </span>
    //     </label>
    // );

    return (
        <div className="min-h-screen bg-white">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl px-4 sm:px-6 py-2 flex items-center">
                    <Link to="/" className="text-xl md:text-3xl font-bold text-blue-600">
                        PathToHire
                    </Link>
                    <div className="ml-4 flex gap-4 font-medium text-sm">
                        <Link to="/scan" className="text-gray-700 hover:text-blue-600">
                            Resume scanner
                        </Link>
                        <Link to="/track" className="text-gray-700 hover:text-blue-600">
                            Applications
                        </Link>
                        <Link to="/calendar" className="text-gray-700 hover:text-blue-600">
                            Calendar
                        </Link>
                        <Link to="/payments" className="text-gray-700 hover:text-blue-600">Plans</Link>
                    </div>
                </div>
            </nav>

            <div className="grid md:grid-cols-2 gap-6 p-6 min-h-[calc(100vh-100px)] max-w-6xl mx-auto">
                <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 shadow-sm">
                    {/*{ToggleSwitch}*/}

                    {/*{fileMode ? (*/}
                    {/*    <>*/}
                    {/*        <motion.div*/}
                    {/*            {...getRootProps()}*/}
                    {/*            className={`flex flex-col justify-center items-center border-2 border-dashed rounded-xl p-10 transition-colors duration-300 ${*/}
                    {/*                hovered ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"*/}
                    {/*            }`}*/}
                    {/*            whileHover={{ scale: 1.01 }}*/}
                    {/*            onHoverStart={() => setHovered(true)}*/}
                    {/*            onHoverEnd={() => setHovered(false)}*/}
                    {/*        >*/}
                    {/*            <svg*/}
                    {/*                xmlns="http://www.w3.org/2000/svg"*/}
                    {/*                width="64"*/}
                    {/*                height="64"*/}
                    {/*                viewBox="0 0 24 24"*/}
                    {/*                fill="none"*/}
                    {/*                stroke="currentColor"*/}
                    {/*                strokeWidth="2"*/}
                    {/*                strokeLinecap="round"*/}
                    {/*                strokeLinejoin="round"*/}
                    {/*                className="text-blue-400 mb-4"*/}
                    {/*            >*/}
                    {/*                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />*/}
                    {/*                <polyline points="17 8 12 3 7 8" />*/}
                    {/*                <line x1="12" y1="3" x2="12" y2="15" />*/}
                    {/*            </svg>*/}

                    {/*            <p className="text-gray-500 text-sm mb-2 text-center">*/}
                    {/*                Drag & Drop your resume here, or click to browse*/}
                    {/*            </p>*/}

                    {/*            <motion.button*/}
                    {/*                whileHover={{ scale: 1.05 }}*/}
                    {/*                whileTap={{ scale: 0.98 }}*/}
                    {/*                type="button"*/}
                    {/*                onClick={openDialog}*/}
                    {/*                className="px-4 py-2 border border-gray-300 text-sm text-gray-700 bg-white rounded-md shadow-sm hover:border-blue-500 hover:text-blue-600 transition"*/}
                    {/*            >*/}
                    {/*                Browse Files*/}
                    {/*            </motion.button>*/}

                    {/*            <input {...getInputProps()} className="hidden" />*/}

                    {/*            <div className="mt-4 text-sm text-blue-600 font-medium">*/}
                    {/*                {form.file ? form.file.name : <span className="text-red-400">No file selected</span>}*/}
                    {/*            </div>*/}
                    {/*        </motion.div>*/}

                    {/*        <div className="flex gap-2 mt-4">*/}
                    {/*            <motion.button*/}
                    {/*                className={`${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-all duration-300 rounded-md px-6 py-2 flex-1`}*/}
                    {/*                onClick={submitData}*/}
                    {/*                whileHover={!isLoading ? {scale: 1.05} : {}}*/}
                    {/*                whileTap={!isLoading ? {scale: 0.98} : {}}*/}
                    {/*                disabled={isLoading || !form.file}*/}
                    {/*            >*/}
                    {/*                {isLoading ? 'Processing...' : 'Submit'}*/}
                    {/*            </motion.button>*/}

                    {/*            <motion.button*/}
                    {/*                className="bg-red-500 hover:bg-red-600 text-white transition-all duration-300 rounded-md px-4 py-2"*/}
                    {/*                onClick={clearAll}*/}
                    {/*                whileHover={{scale: 1.05}}*/}
                    {/*                whileTap={{scale: 0.98}}*/}
                    {/*            >*/}
                    {/*                Clear*/}
                    {/*            </motion.button>*/}
                    {/*        </div>*/}
                    {/*    </>*/}
                    {/*/!*) : (*!/*/}
                        <>
                            <div className="flex flex-col h-full">
                                <textarea
                                    className="w-full h-80 p-4 rounded-xl resize-none focus:outline-none border border-gray-300 focus:border-blue-500"
                                    placeholder="Insert your resume as text here..."
                                    value={form.text}
                                    onChange={(e) => setForm((prev) => ({ ...prev, text: e.target.value }))}
                                />

                                <div className="flex gap-2 mt-4">
                                    <motion.button
                                        className={`${isLoading ? 'bg-gray-400' : 'bg-gray-500 text-white hover:bg-black'} text-black transition-all duration-300 rounded-md px-6 py-2 flex-1`}
                                        onClick={submitData}
                                        whileHover={!isLoading ? {scale: 1.01} : {}}
                                        whileTap={!isLoading ? {scale: 0.98} : {}}
                                        disabled={isLoading || !form.text.trim()}
                                    >
                                        {isLoading ? 'Processing...' : 'Submit'}
                                    </motion.button>

                                    <motion.button
                                        className="bg-red-500 hover:bg-red-600 text-white transition-all duration-300 rounded-md px-4 py-2"
                                        onClick={clearAll}
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.98}}
                                    >
                                        Clear
                                    </motion.button>
                                </div>
                            </div>
                        </>
                    {/*)}*/}
                </div>

                <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Results</h3>
                        {result && (
                            <span className="text-sm text-gray-500">
                                {result.length} characters
                            </span>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                    ) : result ? (
                        <div className="bg-white rounded-lg p-4 max-h-96 overflow-y-auto">
                            <pre className="whitespace-pre-wrap text-sm text-gray-800">{result}</pre>
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 h-64 flex items-center justify-center">
                            Results will appear here after processing your resume.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}