import React from "react";
import bg from "./assets/jbg.png";
import { motion } from "framer-motion";

export default function ChatPage(): React.ReactElement {


    return (
        <>
            <div
                className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 animate-scroll-bg"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: "3000px auto",
                    backgroundRepeat: "repeat-x",
                    backgroundPosition: "0 0",
                }}
            >
                <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 h-[70px]">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                        >
                            JobTrackr
                        </motion.span>
                    </div>
                </nav>

                <div className="grid grid-cols-12 h-[calc(100vh-70px)]">
                    {/* Sidebar with fixed height and scrollable content */}
                    <div className="col-span-3 bg-white h-[calc(100vh-70px)] flex flex-col">
                        <h1 className="text-center text-3xl font-bold py-4 border-b shrink-0">Chat messages</h1>

                        {/* Chat list with proper scrolling */}
                        <div className="overflow-y-auto flex-1">

                                <div
                                    className="p-4 border-b hover:bg-gray-100 cursor-pointer transition-colors"
                                >
                                    <div className="font-medium">Chat</div>
                                    <div className="text-sm text-gray-500 truncate">
                                        Last message preview goes here
                                    </div>
                                </div>
                            <div
                                className="p-4 border-b hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                <div className="font-medium">Chat</div>
                                <div className="text-sm text-gray-500 truncate">
                                    Last message preview goes here
                                </div>
                            </div>
                            <div
                                className="p-4 border-b hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                <div className="font-medium">Chat</div>
                                <div className="text-sm text-gray-500 truncate">
                                    Last message preview goes here
                                </div>
                            </div>
                            <div
                                className="p-4 border-b hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                <div className="font-medium">Chat</div>
                                <div className="text-sm text-gray-500 truncate">
                                    Last message preview goes here
                                </div>
                            </div>
                            <div
                                className="p-4 border-b hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                <div className="font-medium">Chat</div>
                                <div className="text-sm text-gray-500 truncate">
                                    Last message preview goes here
                                </div>
                            </div>
                            <div
                                className="p-4 border-b hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                <div className="font-medium">Chat</div>
                                <div className="text-sm text-gray-500 truncate">
                                    Last message preview goes here
                                </div>
                            </div>
                            <div
                                className="p-4 border-b hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                <div className="font-medium">Chat</div>
                                <div className="text-sm text-gray-500 truncate">
                                    Last message preview goes here
                                </div>
                            </div>
                            <div
                                className="p-4 border-b hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                <div className="font-medium">Chat</div>
                                <div className="text-sm text-gray-500 truncate">
                                    Last message preview goes here
                                </div>
                            </div>
                            <div
                                className="p-4 border-b hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                <div className="font-medium">Chat</div>
                                <div className="text-sm text-gray-500 truncate">
                                    Last message preview goes here
                                </div>
                            </div>
                            <div
                                className="p-4 border-b hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                <div className="font-medium">Chat</div>
                                <div className="text-sm text-gray-500 truncate">
                                    Last message preview goes here
                                </div>
                            </div>
                            <div
                                className="p-4 border-b hover:bg-gray-100 cursor-pointer transition-colors"
                            >
                                <div className="font-medium">Chat</div>
                                <div className="text-sm text-gray-500 truncate">
                                    Last message preview goes here
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Main chat area with fixed height */}
                    <div className="col-span-9 bg-gray-50 h-[calc(100vh-70px)] flex flex-col">
                        {/* Messages area with flex-grow to take available space */}
                        <div className="flex-grow p-4 overflow-y-auto">
                            {/* Chat messages would go here */}
                            <div className="text-center text-gray-500 py-8">
                                Select a chat to view messages
                            </div>
                        </div>

                        {/* Message input area fixed at bottom */}
                        <div className="border-t p-4 bg-white shrink-0">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className="flex-grow rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Type your message..."
                                />
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}