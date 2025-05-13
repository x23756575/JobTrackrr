import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import ProgressBar from "./ProgressBar.tsx";
import robot from "./assets/robot.png"
import speech from "./assets/speechbbl.png"
import xicon from "./assets/xicon.png";

export interface ResumeData{
    experienceScore: number;
    educationScore: number;
    skillsScore: number;
    projectsScore: number;
}

export default function ResumePage(): React.ReactElement {
    const [selectedFile, setSelectedFile] = useState<File | null>();
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string | null>('');
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [hideFile, setHideFile] = useState<boolean>(false);
    const [showSpeech,setShowSpeech] = useState<boolean>(false);
    const [showAdvice, setShowAdvice] = useState<boolean>(false);
    const [advice,setAdvice] = useState<string>('');
    const [exp, setExp] = useState<string | null>('');
    const [pro, setPro] = useState<string | null>('');
    const [skills, setSkills] = useState<string | null>('');
    const [edu, setEdu] = useState<string | null>('');
    const [adviceDone, setAdviceDone] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    useEffect(() => {
        if (adviceDone) {

            const voices = window.speechSynthesis.getVoices();
            const robotVoice = voices.find((v) => v.name === "Google UK English Male");

            const message = `${advice}`;
            const utterance = new SpeechSynthesisUtterance(message);

            if (robotVoice) {
                utterance.voice = robotVoice;
            } else {
                console.warn("Google UK English Male not found — using default voice.");
            }

            console.log('Speaking:', message);

            utterance.lang = 'en-GB';
            utterance.rate = .9;
            utterance.pitch = .6;
            window.speechSynthesis.speak(utterance);
            setAdviceDone(false);

        }
    }, [adviceDone]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (file && file.length > 0) {
            setSelectedFile(file[0]);
            setError('');
            setSuccess('');
        } else {
            setError('No file selected');
            setShowPopup(true)
        }
    };
    const handleErrorSuccessPopup = () => {
        setShowPopup(false)

    }
    const handleSubmit = async (): Promise<void> => {
        if (!selectedFile) {
            setError('Please select a file before submitting');
            setShowPopup(true);
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:8080/resume', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const data = response.data as ResumeData;
            // Assume the backend sends the resume score and assessment
            setResumeData(response.data); // Store the response data
            CalculateMessage(data)
            setError(''); // Clear any previous error
            setShowPopup(true)
            setSuccess('Upload successful');
            setHideFile(true);
        } catch (err) {
            setResumeData(null);
            setSuccess('');
            setHideFile(false)
            const axiosError = err as AxiosError;
            setError(`'Upload failed: ' + ${axiosError.response?.data || 'Unknown error'}`);
            setShowPopup(true);
            console.error(err);
        }
    };
    const handleAdvice =  (data:ResumeData) => {
        
        const experiencePercentage = (data.experienceScore / 50) * 100;
        const educationPercentage = (data.educationScore / 20) * 100;
        const skillsPercentage = (data.skillsScore / 30) * 100;
        const projectsPercentage = (data.projectsScore / 25) * 100;

        setShowAdvice(true)
        if (
            experiencePercentage < 50 &&
            skillsPercentage < 50 &&
            educationPercentage < 50 &&
            projectsPercentage < 50
        ) {
            setAdvice("Lock in bro");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage < 50 &&
            educationPercentage < 50 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is quite low — consider focusing on it to improve your profile and your education is quite low — consider focusing on it to improve your profile and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage < 50 &&
            educationPercentage < 50 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is quite low — consider focusing on it to improve your profile and your education is quite low — consider focusing on it to improve your profile and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage < 50 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is quite low  consider focusing on it to improve your profile and your skills is quite low — consider focusing on it to improve your profile and your education is moderate — improving it further could make a big difference and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage < 50 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is quite low — consider focusing on it to improve your profile and your education is moderate — improving it further could make a big difference and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage < 50 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is quite low — consider focusing on it to improve your profile and your education is moderate — improving it further could make a big difference and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage < 50 &&
            educationPercentage >= 80 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is quite low — consider focusing on it to improve your profile and your education is excellent — keep up the good work and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage < 50 &&
            educationPercentage >= 80 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is quite low — consider focusing on it to improve your profile and your education is excellent — keep up the good work and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage < 50 &&
            educationPercentage >= 80 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is quite low — consider focusing on it to improve your profile and your education is excellent — keep up the good work and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage < 50 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is moderate — improving it further could make a big difference and your education is quite low — consider focusing on it to improve your profile and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage < 50 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is moderate — improving it further could make a big difference and your education is quite low — consider focusing on it to improve your profile and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage < 50 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is moderate — improving it further could make a big difference and your education is quite low — consider focusing on it to improve your profile and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is moderate — improving it further could make a big difference and your education is moderate — improving it further could make a big difference and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is moderate — improving it further could make a big difference and your education is moderate — improving it further could make a big difference and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is moderate — improving it further could make a big difference and your education is moderate — improving it further could make a big difference and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage >= 80 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is moderate — improving it further could make a big difference and your education is excellent — keep up the good work and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage >= 80 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is moderate — improving it further could make a big difference and your education is excellent — keep up the good work and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage >= 80 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is moderate — improving it further could make a big difference and your education is excellent — keep up the good work and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage >= 80 &&
            educationPercentage < 50 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is excellent — keep up the good work and your education is quite low — consider focusing on it to improve your profile and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage >= 80 &&
            educationPercentage < 50 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is excellent — keep up the good work and your education is quite low — consider focusing on it to improve your profile and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage >= 80 &&
            educationPercentage < 50 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is excellent — keep up the good work and your education is quite low — consider focusing on it to improve your profile and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage >= 80 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is excellent — keep up the good work and your education is moderate — improving it further could make a big difference and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage >= 80 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is excellent — keep up the good work and your education is moderate — improving it further could make a big difference and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage >= 80 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is excellent — keep up the good work and your education is moderate — improving it further could make a big difference and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage >= 80 &&
            educationPercentage >= 80 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is excellent — keep up the good work and your education is excellent — keep up the good work and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage >= 80 &&
            educationPercentage >= 80 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is excellent — keep up the good work and your education is excellent — keep up the good work and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage < 50 &&
            skillsPercentage >= 80 &&
            educationPercentage >= 80 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is quite low — consider focusing on it to improve your profile and your skills is excellent — keep up the good work and your education is excellent — keep up the good work and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage < 50 &&
            educationPercentage < 50 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is quite low — consider focusing on it to improve your profile and your education is quite low — consider focusing on it to improve your profile and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage < 50 &&
            educationPercentage < 50 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is quite low — consider focusing on it to improve your profile and your education is quite low — consider focusing on it to improve your profile and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage < 50 &&
            educationPercentage < 50 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is quite low — consider focusing on it to improve your profile and your education is quite low — consider focusing on it to improve your profile and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage < 50 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is quite low — consider focusing on it to improve your profile and your education is moderate — improving it further could make a big difference and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage < 50 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is quite low — consider focusing on it to improve your profile and your education is moderate — improving it further could make a big difference and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage < 50 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is quite low — consider focusing on it to improve your profile and your education is moderate — improving it further could make a big difference and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage < 50 &&
            educationPercentage >= 80 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is quite low — consider focusing on it to improve your profile and your education is excellent — keep up the good work and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage < 50 &&
            educationPercentage >= 80 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is quite low — consider focusing on it to improve your profile and your education is excellent — keep up the good work and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage < 50 &&
            educationPercentage >= 80 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is quite low — consider focusing on it to improve your profile and your education is excellent — keep up the good work and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage < 50 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is moderate — improving it further could make a big difference and your education is quite low — consider focusing on it to improve your profile and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage < 50 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is moderate — improving it further could make a big difference and your education is quite low — consider focusing on it to improve your profile and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage < 50 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is moderate — improving it further could make a big difference and your education is quite low — consider focusing on it to improve your profile and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is moderate — improving it further could make a big difference and your education is moderate — improving it further could make a big difference and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is moderate — improving it further could make a big difference and your education is moderate — improving it further could make a big difference and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is moderate — improving it further could make a big difference and your education is moderate — improving it further could make a big difference and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage >= 80 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is moderate — improving it further could make a big difference and your education is excellent — keep up the good work and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage >= 80 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is moderate — improving it further could make a big difference and your education is excellent — keep up the good work and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage >= 80 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is moderate — improving it further could make a big difference and your education is excellent — keep up the good work and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage >= 80 &&
            educationPercentage < 50 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is excellent — keep up the good work and your education is quite low — consider focusing on it to improve your profile and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage >= 80 &&
            educationPercentage < 50 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is excellent — keep up the good work and your education is quite low — consider focusing on it to improve your profile and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage >= 80 &&
            educationPercentage < 50 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is excellent — keep up the good work and your education is quite low — consider focusing on it to improve your profile and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage >= 80 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is excellent — keep up the good work and your education is moderate — improving it further could make a big difference and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage >= 80 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is excellent — keep up the good work and your education is moderate — improving it further could make a big difference and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage >= 80 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is excellent — keep up the good work and your education is moderate — improving it further could make a big difference and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage >= 80 &&
            educationPercentage >= 80 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is excellent — keep up the good work and your education is excellent — keep up the good work and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage >= 80 &&
            educationPercentage >= 80 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is excellent — keep up the good work and your education is excellent — keep up the good work and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage >= 50 && experiencePercentage < 80 &&
            skillsPercentage >= 80 &&
            educationPercentage >= 80 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is moderate — improving it further could make a big difference and your skills is excellent — keep up the good work and your education is excellent — keep up the good work and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage < 50 &&
            educationPercentage < 50 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is quite low — consider focusing on it to improve your profile and your education is quite low — consider focusing on it to improve your profile and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage < 50 &&
            educationPercentage < 50 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is quite low — consider focusing on it to improve your profile and your education is quite low — consider focusing on it to improve your profile and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage < 50 &&
            educationPercentage < 50 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is quite low — consider focusing on it to improve your profile and your education is quite low — consider focusing on it to improve your profile and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage < 50 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is quite low — consider focusing on it to improve your profile and your education is moderate — improving it further could make a big difference and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage < 50 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is quite low — consider focusing on it to improve your profile and your education is moderate — improving it further could make a big difference and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage < 50 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is quite low — consider focusing on it to improve your profile and your education is moderate — improving it further could make a big difference and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage < 50 &&
            educationPercentage >= 80 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is quite low — consider focusing on it to improve your profile and your education is excellent — keep up the good work and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage < 50 &&
            educationPercentage >= 80 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is quite low — consider focusing on it to improve your profile and your education is excellent — keep up the good work and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage < 50 &&
            educationPercentage >= 80 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is quite low — consider focusing on it to improve your profile and your education is excellent — keep up the good work and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage < 50 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is moderate — improving it further could make a big difference and your education is quite low — consider focusing on it to improve your profile and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage < 50 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is moderate — improving it further could make a big difference and your education is quite low — consider focusing on it to improve your profile and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage < 50 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is moderate — improving it further could make a big difference and your education is quite low — consider focusing on it to improve your profile and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is moderate — improving it further could make a big difference and your education is moderate — improving it further could make a big difference and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is moderate — improving it further could make a big difference and your education is moderate — improving it further could make a big difference and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is moderate — improving it further could make a big difference and your education is moderate — improving it further could make a big difference and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage >= 80 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is moderate — improving it further could make a big difference and your education is excellent — keep up the good work and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage >= 80 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is moderate — improving it further could make a big difference and your education is excellent — keep up the good work and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage >= 50 && skillsPercentage < 80 &&
            educationPercentage >= 80 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is moderate — improving it further could make a big difference and your education is excellent — keep up the good work and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage >= 80 &&
            educationPercentage < 50 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is excellent — keep up the good work and your education is quite low — consider focusing on it to improve your profile and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage >= 80 &&
            educationPercentage < 50 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is excellent — keep up the good work and your education is quite low — consider focusing on it to improve your profile and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage >= 80 &&
            educationPercentage < 50 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is excellent — keep up the good work and your education is quite low — consider focusing on it to improve your profile and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage >= 80 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is excellent — keep up the good work and your education is moderate — improving it further could make a big difference and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage >= 80 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is excellent — keep up the good work and your education is moderate — improving it further could make a big difference and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage >= 80 &&
            educationPercentage >= 50 && educationPercentage < 80 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is excellent — keep up the good work and your education is moderate — improving it further could make a big difference and your projects is excellent — keep up the good work.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage >= 80 &&
            educationPercentage >= 80 &&
            projectsPercentage < 50
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is excellent — keep up the good work and your education is excellent — keep up the good work and your projects is quite low — consider focusing on it to improve your profile.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage >= 80 &&
            educationPercentage >= 80 &&
            projectsPercentage >= 50 && projectsPercentage < 80
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is excellent — keep up the good work and your education is excellent — keep up the good work and your projects is moderate — improving it further could make a big difference.");
        }
        else if (
            experiencePercentage >= 80 &&
            skillsPercentage >= 80 &&
            educationPercentage >= 80 &&
            projectsPercentage >= 80
        ) {
            setAdvice("Your experience is excellent — keep up the good work and your skills is excellent — keep up the good work and your education is excellent — keep up the good work and your projects is excellent — keep up the good work.");
        }
        setAdviceDone(true)

    }

    const CalculateTotalScore = (data: ResumeData): number => {
        return Math.round(
            (data.experienceScore / 50) * 40 +
            (data.educationScore / 20) * 20 +
            (data.skillsScore / 30) * 30 +
            (data.projectsScore / 25) * 10
        );
    };
    const CalculateMessage = (data: ResumeData) => {
        const experiencePercentage = (data.experienceScore / 50) * 100;
        const educationPercentage = (data.educationScore / 20) * 100;
        const skillsPercentage = (data.skillsScore / 30) * 100;
        const projectsPercentage = (data.projectsScore / 25) * 100;

        // Experience message
        if (experiencePercentage < 50) {
            setExp('Your experience needs significant improvement to match the job requirements');
        } else if (experiencePercentage >= 50 && experiencePercentage < 80) {
            setExp('You’re on the way there, keep learning and taking on new challenges and your resume will be complete');
        } else if (experiencePercentage >= 80) {
            setExp('Your experience is amazing, and aligns with the job description');
        }

        // Education message
        if (educationPercentage < 50) {
            setEdu('Consider enhancing your educational qualifications to better match the job requirements');
        } else if (educationPercentage >= 50 && educationPercentage < 80) {
            setEdu('Your education provides a good foundation, but consider additional certifications or courses');
        } else if (educationPercentage >= 80) {
            setEdu('Your educational background is impressive and relevant to the position');
        }

        // Skills message
        if (skillsPercentage < 50) {
            setSkills('Focus on building the core skills required for this role to increase your competitiveness');
        } else if (skillsPercentage >= 50 && skillsPercentage < 80) {
            setSkills('You have a decent skill set, but developing expertise in a few key areas would strengthen your profile');
        } else if (skillsPercentage >= 80) {
            setSkills('Your skills are excellent and highly aligned with what employers are looking for');
        }

        // Projects message
        if (projectsPercentage < 50) {
            setPro('Build more projects that demonstrate your abilities and problem-solving skills');
        } else if (projectsPercentage >= 50 && projectsPercentage < 80) {
            setPro('Your projects show good initiative, but try to add more relevant projects that showcase key skills');
        } else if (projectsPercentage >= 80) {
            setPro('Your portfolio of projects demonstrates your capabilities excellently');
        }
    };


    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm relative">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
                    <span className="text-3xl font-bold text-blue-600">JobTrackr</span>
                </div>
            </nav>
            <div className="bg-white p-6">

                <div className="bg-[#f3f3f3] h-[calc(100vh-110px)] grid grid-cols-5 rounded-2xl relative">

                    {!hideFile && (
                        <div className="col-span-5">
                            <h1 className="text-5xl font-semibold text-center mt-24 md:mt-32">Resume Analysis</h1>

                            <div className="flex flex-col md:flex-row justify-center items-center w-full md:w-2/5 bg-[#86a0f2] mx-auto shadow-2xl shadow-indigo-300 p-6 rounded-2xl relative my-16 md:my-24">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full mb-4 md:mb-0 md:w-auto"
                                />
                                <button
                                    className="text-black m-0 p-2 bg-white rounded-md shadow-md hover:bg-gray-100"
                                    onClick={handleSubmit}
                                >
                                    <span>Upload</span>
                                </button>
                                <span className="absolute bottom-[-1.5rem] left-1/2 -translate-x-1/2 text-xs">
        PDFs, DOC, and DOCX supported
      </span>

                            </div>

                            <div
                                className={`
                                    px-5 py-4 rounded-xl shadow-md text-center text-white text-sm font-medium
                                    absolute left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out
                                    ${showPopup && ( error || success) ? 'top-5 opacity-100' : '-top-10 opacity-0'}
                                    ${error ? 'bg-[#8f8f8f]' : success ? 'bg-green-500' : 'bg-gray-500'}
                                  `}
                                    >
                                <img className="absolute top-1 right-1 bg h-[20px] w-[20px]" onClick={handleErrorSuccessPopup} src={xicon} />
                                    {error && showPopup && <p>{error}</p>}
                                    {success && showPopup && <p>{success}</p>}

                            </div>



                        </div>
                    )}





                    {resumeData && (
                        <>
                            <div className="col-span-4">
                                <div
                                    className="h-full p-6 bg-[#ebebeb] border-r border-r-[#d5d5d5]  rounded-tl-2xl rounded-bl-2xl shadow-md space-y-6">
                                    <ProgressBar data={resumeData}/>

                                    <h2 className="text-3xl font-bold text-blue-700">Resume Analysis</h2>

                                    <div>
                                        <p className="text-lg rounded-2xl font-medium mb-1 mt-2 text-gray-800">
                                            Experience Score: <span
                                            className="text-blue-600">{Math.round(resumeData.experienceScore * (40 / 50))}</span>/40
                                        </p>
                                        <p className="text-sm text-gray-700 italic">{exp}</p>
                                    </div>
                                    <hr className="m-0 border-[#d5d5d5]"/>

                                    <div>
                                        <p className="text-lg font-medium mb-1 mt-2 text-gray-800">
                                            Education Score: <span
                                            className="text-blue-600">{Math.round(resumeData.educationScore)}</span>/20
                                        </p>
                                        <p className="text-sm text-gray-700 italic">{edu}</p>
                                    </div>
                                    <hr className="m-0 border-[#d5d5d5]"/>
                                    <div>
                                        <p className="text-lg font-medium mb-1  mt-2 text-gray-800">
                                            Skills Score: <span
                                            className="text-blue-600">{Math.round(resumeData.skillsScore)}</span>/30
                                        </p>
                                        <p className="text-sm text-gray-700 italic">{skills}</p>
                                    </div>
                                    <hr className="m-0 border-[#d5d5d5]"/>
                                    <div>
                                        <p className="text-lg font-medium mt-2 mb-1 text-gray-800">
                                            Projects Score: <span
                                            className="text-blue-600">{Math.round(Math.min(resumeData.projectsScore, 10) * (10 / 25))}</span>/10
                                        </p>
                                        <p className="text-sm text-gray-700 italic">{pro}</p>
                                    </div>
                                    <hr className="m-0 border-[#d5d5d5]"/>
                                </div>
                            </div>

                            <div className="col-span-1 grid grid-rows-[40%,60%]">
                                <div onMouseOver={() => setShowSpeech(true)}
                                     onMouseOut={() => setShowSpeech(false)}
                                     className="row-span-1 relative flex w-full items-center justify-center rounded-xl bg-white bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat shadow-2xl transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]"
                                >
                                    <img className="h-[180px] w-auto" src={robot} alt="Robot"/>


                                    {showSpeech && (
                                        <div  className="bg-white shadow-2xl transition-all duration-500 ease-in-out transform ${
                                                showSpeech ? 'translate-x-0' : 'translate-x-full'
                                            } rounded-2xl absolute top-[0px] left-[-480px] w-[500px]  p-6 border border-gray-300 ">
                                            <div  className="flex items-start space-x-4">
                                                <img className="h-20 w-20 rounded-full" src={robot} alt="Jobi" />
                                                <div className="text-gray-800">
                                                    <h1 className="text-lg font-semibold mb-1">Hi, I’m <span className="text-blue-600">Jobi</span> 👋</h1>
                                                    <p className="text-md font-comic  leading-relaxed">
                                                        I’m your personal resume sidekick.
                                                        I read through your resume and give advice to help you stand out.
                                                        Let’s polish it up and land that dream job together! 💼✨
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                </div>
                                <div className="pl-2 row-span-1 mx-auto">
                                    {!showAdvice &&(
                                        <button onClick={() => handleAdvice(resumeData)} className="bg-indigo-500 hover:scale-105 hover:bg-indigo-700 transition-all duration-500 font-comic text-white shadow-xl shadow-[#c3d3fb] pt-4 pb-4  p-7 rounded-2xl">Generate AI advice</button>
                                    )}

                                    {showAdvice && (
                                        <div className="my-auto mx-auto">
                                            <p className="bg-[#3B82F6] text-white rounded-md font-comic text-3xl text-center">Jobi's advice</p>
                                            <span className="font-comic">{advice}</span>

                                        </div>

                                    )}
                                </div>
                            </div>


                        </>

                    )}

                </div>
            </div>
        </div>

    );


}
