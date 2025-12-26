'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Clock } from 'lucide-react';
import { motion, Variants } from 'framer-motion'; // Import framer-motion
import CountdownTimer from './CountdownTimer';

interface EventCardProps {
    title: string;
    time: string;
    lunarDate: string;
    locationName: string;
    address: string;
    showCalendar?: boolean;
    mapLink?: string;
    mapEmbed?: string;
}

// --- CẤU HÌNH ANIMATION ---
const containerVariants : Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Các phần tử con hiện cách nhau 0.2s
            delayChildren: 0.1,
        }
    }
};

const fadeInLeft : Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1, x: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const fadeInRight : Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1, x: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const zoomIn : Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1, scale: 1,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const fadeInUp : Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

export default function EventCard({
                                      title,
                                      time,
                                      lunarDate,
                                      locationName,
                                      address,
                                      showCalendar = false,
                                      mapLink,
                                      mapEmbed,
                                  }: EventCardProps) {

    // Link mặc định
    const DEFAULT_MAP_LINK = "https://maps.app.goo.gl/tABCxyz";
    const DEFAULT_EMBED_SRC = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.550096241115!2d105.85990221046967!3d21.010664280553378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abf73fc3853b%3A0x52a1bfc694e69ae3!2zMSBOZy4gNjIgUC4gTMawxqFuZyBZw6puLCBIYWkgQsOgIFRyxrBuZywgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1766344594167!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"';

    const finalMapLink = mapLink || DEFAULT_MAP_LINK;
    const finalEmbedSrc = mapEmbed || DEFAULT_EMBED_SRC;

    // Dữ liệu lịch tháng 1/2026
    const january2026 = [
        [null, null, null, 1, 2, 3, 4],
        [5, 6, 7, 8, 9, 10, 11],
        [12, 13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24, 25],
        [26, 27, 28, 29, 30, 31, null]
    ];
    // const specialDays = [8, 9, 10];
    const specialDays = [10];

    // --- KHỐI BẢN ĐỒ ---
    const MapSection = (
        <motion.div className="w-full flex flex-col" variants={zoomIn}>
            {/* Khung bản đồ (Iframe) */}
            <div className="w-full h-[220px] rounded-lg overflow-hidden shadow-sm border border-gray-200 mt-4 bg-gray-100">
                <iframe
                    src={finalEmbedSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>

            {/* Nút xem bản đồ */}
            <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={finalMapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-8 py-3 bg-[#CF351D] text-white rounded-full font-serif text-sm tracking-wider hover:bg-[#B22E19] transition shadow-md cursor-pointer text-center self-start"
            >
                Xem chỉ đường
            </motion.a>
        </motion.div>
    );

    return (
        // Thêm motion.div cho container chính
        <motion.div
            className="bg-white rounded-xl shadow-xl p-6 md:p-8 max-w-5xl mx-auto border-t-4 border-[#CF351D] relative overflow-hidden"
            initial="hidden"
            whileInView="visible" // Kích hoạt khi cuộn tới
            viewport={{ once: true, amount: 0.2 }} // Chạy 1 lần khi thấy 20%
            variants={containerVariants}
        >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">

                {/* === CỘT TRÁI: THÔNG TIN CHÍNH === */}
                <div className="space-y-6 text-center md:text-left order-2 md:order-1 h-full flex flex-col justify-center">

                    <motion.p
                        variants={fadeInLeft}
                        className="font-serif text-gray-500 text-xs md:text-sm uppercase tracking-[0.2em] mb-1 whitespace-nowrap"
                    >
                        Trân trọng kính mời tới
                    </motion.p>
                    {/* Tiêu đề bay từ trái vào */}
                    {/* Tiêu đề bay từ trái vào */}
                    <motion.h3
                        variants={fadeInLeft}
                        // 👇 SỬA DÒNG CLASSNAME NÀY:
                        // 1. whitespace-nowrap: Bắt buộc 1 dòng
                        // 2. text-[7vw]: Trên mobile chữ sẽ tự co giãn theo chiều ngang màn hình (khoảng 7%)
                        // 3. sm:text-4xl md:text-5xl: Trên màn hình lớn hơn thì giữ cỡ cố định cho đẹp
                        className="font-script text-[#CF351D] mb-4 whitespace-nowrap text-[8vw] sm:text-4xl md:text-5xl leading-tight"
                    >
                        {title}
                    </motion.h3>

                    <div className="space-y-4">
                        {/* Thời gian bay từ trái vào */}
                        <motion.div variants={fadeInLeft} className="flex items-center gap-3 justify-center md:justify-start text-gray-700">
                            <Clock className="text-[#B8860B]" size={20} />
                            <span className="font-serif text-lg">
                                <strong>{time}</strong> - {lunarDate}
                            </span>
                        </motion.div>

                        {/* Địa điểm bay từ trái vào */}
                        <motion.div variants={fadeInLeft} className="flex items-start gap-3 justify-center md:justify-start text-gray-700">
                            <MapPin className="text-[#B8860B] mt-1 flex-shrink-0" size={20} />
                            <div className="text-left">
                                <p className="font-bold text-lg">{locationName}</p>
                                <p className="text-sm text-gray-500">{address}</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bản đồ (Logic hiển thị theo calendar) */}
                    {showCalendar && MapSection}
                </div>

                {/* === CỘT PHẢI: LỊCH HOẶC BẢN ĐỒ === */}
                <div className="flex flex-col items-center order-1 md:order-2 w-full h-full justify-center">
                    {showCalendar ? (
                        <div className="flex flex-col items-center w-full">
                            {/* Lịch bay từ phải vào */}
                            <motion.div variants={fadeInRight} className="bg-[#fdfbf7] p-6 rounded-lg border border-[#e8b4b8]/30 w-full max-w-sm shadow-inner">
                                <div className="text-center mb-6">
                                    <span className="font-serif font-bold text-[#4A5568] uppercase tracking-widest text-sm block mb-1">Tháng 1</span>
                                    <span className="font-serif font-bold text-[#CF351D] text-2xl">Năm 2026</span>
                                </div>
                                {/* Header Lịch */}
                                <div className="grid grid-cols-7 gap-2 text-center text-sm font-serif text-gray-500 mb-4">
                                    <div>T2</div><div>T3</div><div>T4</div><div>T5</div><div>T6</div><div>T7</div><div className="text-[#CF351D] font-bold">CN</div>
                                </div>
                                {/* Body Lịch */}
                                <div className="grid grid-cols-7 gap-y-3 text-center text-sm font-medium text-gray-700">
                                    {january2026.flat().map((day, idx) => {
                                        if (!day) return <div key={idx}></div>;
                                        const isSpecial = specialDays.includes(day);
                                        return (
                                            <div key={idx} className="flex items-center justify-center h-10">
                                                {isSpecial ? (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        whileInView={{ scale: 1 }}
                                                        transition={{ type: "spring", stiffness: 300, delay: 0.5 + (idx * 0.02) }}
                                                        className="relative flex items-center justify-center w-9 h-9"
                                                    >
                                                        <svg viewBox="0 0 24 24" fill="#CF351D" className="absolute inset-0 w-full h-full drop-shadow-sm">
                                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                                        </svg>
                                                        <span className="relative z-10 text-white font-bold pt-[1px]">{day}</span>
                                                    </motion.div>
                                                ) : (
                                                    <span className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition duration-200">{day}</span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            {/* Countdown hiện lên từ dưới */}
                            <motion.div variants={fadeInUp} className="mt-8 w-full text-center">
                                <p className="font-script text-2xl text-gray-500 mb-2">Cùng đếm ngược</p>
                                <CountdownTimer targetDate="2026-01-10T13:30:00" />
                            </motion.div>
                        </div>
                    ) : (
                        // Nếu không có lịch thì hiển thị Map ở bên phải
                        <div className="w-full mt-4 md:mt-0">
                            {MapSection}
                        </div>
                    )}
                </div>

            </div>
        </motion.div>
    );
}