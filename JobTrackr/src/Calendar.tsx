import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import bg from "./assets/jbg.png";
import {Link} from "react-router-dom";
import myImage from "./assets/JobTrackr.png";
import axios from "axios";
import React, {useEffect, useState} from "react";

interface CalendarData{
    job:string,
    position:string,
    status:string,
    description:string,
    interviewDate:string,
}
interface CalendarEvent{
    title: string;
    start: string;
    className?:string;
}
export default function CalendarPage(){

    const [events ,setEvents] = useState<CalendarEvent[]>([])

    const loadCalendar = async (): Promise<CalendarEvent[] | undefined> => {
        try {
            const response = await axios.get<CalendarData[]>('http://localhost:8080/appdata');

            if (response.status === 200 && response.data) {
                const events: CalendarEvent[] = response.data.map(item => ({
                    title: `${item.job} - ${item.position} | ${item.status}`,
                    start: item?.interviewDate,

                    className: `status-${item.status.toLowerCase()}`
                }));

                console.log(events);
                return events;
            }
        } catch (err) {
            console.error('Calendar load error:', err);
        }
    }

    useEffect(() => {
        loadCalendar().then(data => {
            if (data) setEvents(data)
        })
    }, [])
return(
    <>
        <div className="overflow-x-hidden overflow-y-hidden min-h-screen bg-gray-50 animate-scroll-bg"
             style={{
                 backgroundImage: `url(${bg})`,
                 backgroundSize: "cover",
                 backgroundPosition: "center",
             }}
        >
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

            <div className="w-full max-w-screen-lg mx-auto px-4">
            <FullCalendar
                plugins={[ dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
                />
            </div>
        </div>
    </>
)

}