// src/components/CountdownTimer.tsx
'use client';

import React, { useState, useEffect } from 'react';

interface CountdownProps {
    targetDate: string; // Định dạng ISO: "2026-01-10T13:30:00"
}

export default function CountdownTimer({ targetDate }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Chạy ngay lần đầu

        return () => clearInterval(timer);
    }, [targetDate]);

    // Helper để hiển thị số 0 phía trước (01, 02...)
    const pad = (n: number) => n < 10 ? `0${n}` : n;

    return (
        <div className="flex justify-center gap-4 md:gap-6 mt-8">
            {/* Ngày */}
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#8B1E29] rounded-lg flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-lg">
                    {pad(timeLeft.days)}
                </div>
                <span className="text-gray-500 font-serif text-xs mt-2 uppercase tracking-widest">Ngày</span>
            </div>

            {/* Giờ */}
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#a82531] rounded-lg flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-lg">
                    {pad(timeLeft.hours)}
                </div>
                <span className="text-gray-500 font-serif text-xs mt-2 uppercase tracking-widest">Giờ</span>
            </div>

            {/* Phút */}
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#be323e] rounded-lg flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-lg">
                    {pad(timeLeft.minutes)}
                </div>
                <span className="text-gray-500 font-serif text-xs mt-2 uppercase tracking-widest">Phút</span>
            </div>

            {/* Giây */}
            <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#d44652] rounded-lg flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-lg animate-pulse">
                    {pad(timeLeft.seconds)}
                </div>
                <span className="text-gray-500 font-serif text-xs mt-2 uppercase tracking-widest">Giây</span>
            </div>
        </div>
    );
}