'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const INITIAL_MESSAGE: Message = {
    role: 'assistant',
    content: "Hi! I'm the AuroraFolio AI assistant. Ask me anything about this portfolio, the projects, or the developer's experience!"
};

const SYSTEM_PROMPT = `
You are an AI assistant for a personal portfolio website named "AuroraFolio".
The developer is a full-stack engineer who builds modern web applications using Next.js, React, Tailwind CSS, Three.js, and Integrations with AI like Google Gemini.
Notable projects include:
1. AI Code Assistant (Next.js & OpenAI)
2. DeFi Dashboard (React & Web3)
3. E-Commerce App (Next.js & Stripe)
4. Health Tracker (React Native)
5. Social Platform (Vue & Firebase)

Answer queries concisely and enthusiastically. Keep answers under 3 paragraphs.
`;

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
                throw new Error("Missing API Key. Please configure NEXT_PUBLIC_GEMINI_API_KEY.");
            }

            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

            // Combine prompt and history for pure text model request
            const chatContext = SYSTEM_PROMPT + "\\n\\nCurrent Conversation:\\n" +
                messages.map(m => m.role + ": " + m.content).join("\\n") +
                "\\nuser: " + userMsg + "\\nassistant:";

            const result = await model.generateContent(chatContext);
            const responseText = result.response.text();

            setMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
        } catch (error: any) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Sorry, I'm having trouble connecting right now. Ensure your API key is correctly configured."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: isOpen ? 0 : 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 p-4 rounded-full bg-primary text-white shadow-lg shadow-primary/30 z-50 flex items-center justify-center"
            >
                <MessageSquare size={24} />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-6 right-6 w-full max-w-[350px] sm:max-w-[400px] h-[500px] max-h-[80vh] glass rounded-2xl flex flex-col z-50 overflow-hidden shadow-2xl border-primary/20"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/10 bg-black/40 flex justify-between items-center backdrop-blur-md">
                            <div className="flex items-center gap-2">
                                <Bot className="text-primary" size={20} />
                                <h3 className="font-semibold text-white tracking-wide">Aurora AI</h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 rounded-md hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex items-start gap-2 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                                >
                                    <div className={`p-2 rounded-full shrink-0 ${msg.role === 'user' ? 'bg-secondary/20' : 'bg-primary/20'}`}>
                                        {msg.role === 'user' ? <User size={14} className="text-secondary" /> : <Bot size={14} className="text-primary" />}
                                    </div>
                                    <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user'
                                            ? 'bg-secondary border border-secondary/50 text-white rounded-tr-sm'
                                            : 'glass border-white/5 text-gray-200 rounded-tl-sm'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-start gap-2 max-w-[85%]">
                                    <div className="p-2 rounded-full shrink-0 bg-primary/20">
                                        <Bot size={14} className="text-primary" />
                                    </div>
                                    <div className="p-3 rounded-2xl text-sm glass border-white/5 rounded-tl-sm flex items-center gap-1">
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-black/40 backdrop-blur-md">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask me anything..."
                                    className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full text-primary hover:bg-primary/10 disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
