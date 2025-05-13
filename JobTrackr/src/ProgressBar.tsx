import {useState, useEffect} from "react";
import type {ResumeData} from "./ResumePage.tsx";

const ProgressBar = ({ data }: { data: ResumeData }) => {

    const [score,setScore] = useState<number>(0);

    useEffect(() => {
        const delay = 500;
        const timer = setInterval(() => {

            const totalScore = (data.experienceScore / 50) * 40 +
                (data.educationScore / 20) * 20 +
                (data.skillsScore / 30) * 30 +
                (data.projectsScore / 25) * 10;
            setScore(totalScore);

        },delay)
        return () => clearInterval(timer);
    },[data]);


    const maxScore = 100;
    const progress = (score / maxScore) * 100;
    return (
        <div className="relative w-full bg-[#e0e0e0] rounded-2xl">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black font-semibold transition-all duration-500">
                {score}
            </div>

            <div className="transition-all duration-2000"
                style={{
                    height: '30px',
                    width: `${progress}%`,
                    backgroundColor: '#3b82f6',
                    borderRadius: '4px',
                }}
            ></div>
        </div>
    );


}

export default ProgressBar;

