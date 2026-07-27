'use client';

import React, { useState, useEffect } from 'react';
import { X, Loader2, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactUsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactUsModal({ isOpen, onClose }: ContactUsModalProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    // Handle ESC key press to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Reset state inputs when modal closes
    useEffect(() => {
        if (!isOpen) {
            setName('');
            setEmail('');
            setPhone('');
            setDescription('');
            setStatus('idle');
            setMessage('');
        }
    }, [isOpen]);

    // Handle form submit event
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setStatus('error');
            setMessage('Email is required.');
            return;
        }
        if (!description) {
            setStatus('error');
            setMessage('A message or description is required.');
            return;
        }

        setStatus('loading');
        setMessage('');

        try {
            const tempResponse = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone, description }),
            });

            const data = await tempResponse.json();

            if (tempResponse.ok) {
                setStatus('success');
                setMessage('Your inquiry has been sent to our stylist. We will get back to you shortly.');
                // Reset form values
                setName('');
                setEmail('');
                setPhone('');
                setDescription('');
            } else {
                setStatus('error');
                setMessage(data.error || 'Failed to send enquiry. Please try again.');
            }
        } catch (err) {
            console.error('Contact Submission error:', err);
            setStatus('error');
            setMessage('Something went wrong. Please check your network and try again.');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Dark Backdrop Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black"
                    />

                    {/* Premium Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="relative w-full max-w-lg bg-zinc-950 border border-gold/20 rounded-xl overflow-hidden shadow-2xl z-10 p-8 flex flex-col"
                    >
                        {/* Close button icon */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                            aria-label="Close modal"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Logo header image */}
                        <div className="text-center mb-6">
                            <div className="flex items-center justify-center gap-1.5 mb-1.5">
                                <img src="/logo.png" alt="Anakh Fashions Logo" className="w-12 h-12 object-contain" />
                                <div className="flex items-baseline gap-0.5">
                                    <span className="font-serif text-xl tracking-widest font-semibold text-rose-pink">Anakh</span>
                                    <span className="text-[10px] tracking-wider uppercase text-gold">Fashions</span>
                                </div>
                            </div>
                            <h3 className="font-serif text-2xl text-white tracking-wide">Connect With Stylists</h3>
                            <p className="text-xs text-light-gray/50 mt-1 font-light">Custom tailoring guides, weave inquiries, & styling drop consultations.</p>
                        </div>

                        {/* Inquiry Form */}
                        {status === 'success' ? (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h4 className="text-lg text-white font-medium mb-2">Message Dispatched</h4>
                                <p className="text-sm text-light-gray/70 max-w-sm mx-auto mb-6">{message}</p>
                                <button
                                    onClick={onClose}
                                    className="bg-gold text-dark-gray hover:bg-gold-hover hover:text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                                >
                                    Done
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name Input */}
                                <div>
                                    <label htmlFor="modal-name" className="block text-xs uppercase tracking-wider text-gold font-medium mb-1.5">Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="text"
                                            id="modal-name"
                                            placeholder="Your Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            disabled={status === 'loading'}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-hover transition-colors placeholder:text-zinc-600 disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div>
                                    <label htmlFor="modal-email" className="block text-xs uppercase tracking-wider text-gold font-medium mb-1.5">
                                        Email <span className="text-rose-450 text-[10px] lowercase">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="email"
                                            id="modal-email"
                                            placeholder="your.email@example.com"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={status === 'loading'}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-hover transition-colors placeholder:text-zinc-600 disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                {/* Phone Input */}
                                <div>
                                    <label htmlFor="modal-phone" className="block text-xs uppercase tracking-wider text-gold font-medium mb-1.5">Phone Number</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="tel"
                                            id="modal-phone"
                                            placeholder="e.g. +91 83048 45545"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            disabled={status === 'loading'}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-hover transition-colors placeholder:text-zinc-600 disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                {/* Description Input */}
                                <div>
                                    <label htmlFor="modal-description" className="block text-xs uppercase tracking-wider text-gold font-medium mb-1.5">
                                        Inquiry message <span className="text-rose-450 text-[10px] lowercase">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute top-3.5 left-3.5 pointer-events-none text-zinc-500">
                                            <MessageSquare className="w-4 h-4" />
                                        </div>
                                        <textarea
                                            id="modal-description"
                                            rows={4}
                                            placeholder="What type of sarees or styling details are you looking for?"
                                            required
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            disabled={status === 'loading'}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-gold-hover transition-colors placeholder:text-zinc-600 resizable-none disabled:opacity-50"
                                        />
                                    </div>
                                </div>

                                {/* Error/Alert Display */}
                                {status === 'error' && (
                                    <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3.5 py-2.5 rounded-lg">
                                        {message}
                                    </div>
                                )}

                                {/* Form Submission Button */}
                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full bg-[#d1a25d] hover:bg-gold text-dark-gray hover:text-white py-3 rounded-lg font-semibold transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Sending Message...</span>
                                        </>
                                    ) : (
                                        <span>Send Request</span>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
