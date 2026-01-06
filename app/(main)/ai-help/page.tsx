"use client";

// import { useChat } from '@ai-sdk/react';  // Removed
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function AIHelpPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { id: Date.now().toString(), role: 'user', content: input };
        const newMessages = [...messages, userMessage];

        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: newMessages })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to fetch response');
            }

            const data = response.body;
            if (!data) return;

            const reader = data.getReader();
            const decoder = new TextDecoder();
            let aiMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: '' };

            setMessages(prev => [...prev, aiMessage]);

            let done = false;
            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value, { stream: true });
                // Simple accumulation - typical streamText return might be raw text or special format.
                // gemini streamText via ai sdk returns plain text parts usually in default mode?
                // Wait, useChat expects weird protocol. failed streamText response might be complex.
                // Let's assume raw text for now or basic accumulation. 
                // Actually, result.toTextStreamResponse() implies text stream.

                aiMessage.content += chunkValue;
                setMessages(prev => prev.map(m => m.id === aiMessage.id ? { ...aiMessage } : m));
            }
        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage = { id: Date.now().toString(), role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <div className="container mx-auto p-6 max-w-4xl h-[calc(100vh-80px)]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col h-full gap-4"
            >
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20">
                        <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">AI Study Assistant</h1>
                        <p className="text-muted-foreground">Ask me anything about your homework or studies!</p>
                    </div>
                </div>

                <Card className="flex-1 overflow-hidden flex flex-col glass border-white/10">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                <Sparkles className="w-12 h-12 mb-4 text-primary" />
                                <p className="text-lg font-medium">No messages yet</p>
                                <p className="text-sm">Start a conversation to get help!</p>
                            </div>
                        )}

                        {messages.map((m: any) => (
                            <div
                                key={m.id}
                                className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.role === 'user' ? 'bg-primary text-white' : 'bg-secondary text-secondary-foreground'
                                    }`}>
                                    {m.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                </div>
                                <div className={`p-3 rounded-2xl max-w-[80%] ${m.role === 'user'
                                    ? 'bg-primary text-primary-foreground rounded-tr-none'
                                    : 'bg-secondary/50 backdrop-blur-sm border border-white/10 rounded-tl-none'
                                    }`}>
                                    <p className="whitespace-pre-wrap">{m.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                                    <Bot className="w-5 h-5 animate-pulse" />
                                </div>
                                <div className="bg-secondary/50 p-3 rounded-2xl rounded-tl-none">
                                    <span className="animate-pulse">Thinking...</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-white/10 bg-black/20">
                        <form onSubmit={handleSubmit} className="flex gap-2">
                            <div className="flex-1 px-2">
                                <input
                                    value={input}
                                    onChange={handleInputChange}
                                    placeholder="Type your question here..."
                                    className="w-full p-2 rounded-md bg-background/50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <Button type="submit" disabled={isLoading || !input?.trim()} loading={isLoading}>
                                <Send className="w-4 h-4" />
                            </Button>
                        </form>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}

