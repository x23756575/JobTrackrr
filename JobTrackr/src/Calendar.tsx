import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import bg from "./assets/jbg.png";
import {Link} from "react-router-dom";
import myImage from "./assets/JobTrackr.png";
import axios from "axios";
import {useEffect, useState} from "react";

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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
                    <span className="text-2xl md:text-3xl font-bold text-blue-600">JobTrackr</span>
                    <Link to="/home">
                        <img
                            src={myImage}
                            alt="JobTrackr Logo"
                            className="h-12 md:h-16"
                        />
                    </Link>
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