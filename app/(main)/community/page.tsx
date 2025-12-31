"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Users, MessageSquare, MoreVertical, Search, Sparkles } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";
import { Message, User } from "@/lib/types";

export default function CommunityPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        if (userStr) {
            setCurrentUser(JSON.parse(userStr));
        }

        // Mock initial messages for demo if Supabase is empty
        // In real app, fetch from Supabase
        setMessages([
            {
                id: "1",
                content: "Has anyone started the assignment for Data Structures?",
                userId: "u2",
                userName: "Alice Smith",
                userRole: "student",
                createdAt: new Date(Date.now() - 3600000),
            },
            {
                id: "2",
                content: "Yes, it's quite tricky. Check out the resources in the notes section.",
                userId: "u3",
                userName: "Bob Jones",
                userRole: "CR",
                createdAt: new Date(Date.now() - 1800000),
            },
        ]);

        // Subscription to Supabase Realtime would go here
        /*
        const channel = supabase
            .channel('public:messages')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
                setMessages(prev => [...prev, payload.new as Message]);
            })
            .subscribe();
        return () => { supabase.removeChannel(channel) };
        */

    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentUser) return;

        const msg: Message = {
            id: Date.now().toString(),
            content: newMessage,
            userId: currentUser.id,
            userName: currentUser.name,
            userRole: currentUser.role,
            createdAt: new Date(),
        };

        setMessages([...messages, msg]);
        setNewMessage("");

        // In real app: save to Supabase
        // await supabase.from('messages').insert(msg);
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Users className="w-6 h-6 text-primary" />
                        Community Chat
                    </h1>
                    <p className="text-muted-foreground">Connect with your peers and teachers</p>
                </div>
            </div>

            <Card className="flex-1 flex overflow-hidden glass border-white/10">
                {/* Sidebar List (could be channels later) */}
                <div className="w-64 border-r border-white/10 bg-black/10 hidden md:flex flex-col">
                    <div className="p-4 border-b border-white/10">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 cursor-pointer">
                            <h3 className="font-semibold text-primary">General</h3>
                            <p className="text-xs text-muted-foreground">Official announcements & general chat</p>
                        </div>
                        <div className="p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer transition-colors">
                            <h3 className="font-semibold">Doubts & Queries</h3>
                            <p className="text-xs text-muted-foreground">Ask questions about curriculum</p>
                        </div>
                        <div className="p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer transition-colors">
                            <h3 className="font-semibold">Projects</h3>
                            <p className="text-xs text-muted-foreground">Collaborate on projects</p>
                        </div>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col bg-background/30">
                    <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
                        {messages.map((msg) => {
                            const isMe = msg.userId === currentUser?.id;
                            return (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-3 ${isMe ? "flex-row-reverse" : "flex-row"}`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold shadow-lg 
                                        ${msg.userRole === 'teacher' ? 'bg-amber-500 text-white' :
                                            msg.userRole === 'CR' ? 'bg-purple-500 text-white' :
                                                isMe ? 'bg-primary text-white' : 'bg-secondary text-secondary-foreground'}`}
                                    >
                                        {msg.userName.charAt(0)}
                                    </div>
                                    <div className={`flex flex-col max-w-[70%] ${isMe ? "items-end" : "items-start"}`}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-semibold">{msg.userName}</span>
                                            {msg.userRole !== 'student' && (
                                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full border 
                                                    ${msg.userRole === 'teacher' ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' :
                                                        'bg-purple-500/10 border-purple-500/30 text-purple-500'}`}
                                                >
                                                    {msg.userRole}
                                                </span>
                                            )}
                                        </div>
                                        <div className={`p-4 rounded-2xl shadow-sm backdrop-blur-sm border border-white/5
                                            ${isMe
                                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                                : "bg-card text-card-foreground rounded-tl-none"}`}
                                        >
                                            <p className="text-sm leading-relaxed">{msg.content}</p>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground mt-1 opacity-70">
                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <div className="p-4 border-t border-white/10 bg-background/50 backdrop-blur-md">
                        <form onSubmit={handleSendMessage} className="flex gap-3">
                            <Input
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-white/5 border-white/10 focus:border-primary/50"
                            />
                            <Button type="submit" disabled={!newMessage.trim()} loading={false} size="icon">
                                <Send className="w-5 h-5" />
                            </Button>
                        </form>
                    </div>
                </div>
            </Card>
        </div>
    );
}
