'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CoupleIntro() {
    return (
        // Container full màn hình
        <section className="relative w-full h-screen min-h-[600px] overflow-hidden">

            {/* 1. ẢNH NỀN (BACKGROUND) */}
            <div className="absolute inset-0 z-0">
                {/* Bạn nhớ thay đường dẫn ảnh thật của bạn vào đây nhé */}
                <Image
                    src="/image/DSC03615.JPG"
                    alt="Wedding Background"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Lớp phủ đen mờ để chữ nổi bật hơn */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* 2. NỘI DUNG CHỮ (CENTER) */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 w-full">

                {/* Dòng chữ nhỏ trên cùng */}
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-white/90 tracking-[0.2em] text-xs md:text-sm uppercase mb-4 font-serif"
                >
                    Trân trọng báo tin lễ thành hôn
                </motion.p>

                {/* --- TÊN CÔ DÂU --- */}
                <motion.h1
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    // 👇 BÍ KÍP Ở ĐÂY:
                    // 1. whitespace-nowrap: Cấm xuống dòng
                    // 2. text-[10vw]: Cỡ chữ tự động bằng 10% chiều ngang màn hình (cực chuẩn cho mobile)
                    // 3. md:text-7xl: Trên máy tính thì cố định cỡ to
                    className="font-script text-white mb-2 whitespace-nowrap text-[11vw] sm:text-6xl md:text-7xl lg:text-8xl leading-tight"
                >
                    Phạm Sơn Tùng
                </motion.h1>

                {/* Dấu & */}
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="font-script text-white/80 text-2xl md:text-4xl my-1"
                >
                    &
                </motion.span>

                {/* --- TÊN CHÚ RỂ --- */}
                <motion.h1
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 1.5 }}
                    // 👇 BÍ KÍP TƯƠNG TỰ
                    className="font-script text-white mt-2 whitespace-nowrap text-[11vw] sm:text-6xl md:text-7xl lg:text-8xl leading-tight"
                >
                    Nguyễn Thu Trang
                </motion.h1>

                {/* Trái tim bay lung tung (Trang trí thêm) */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 text-white/50"
                >
                    <span className="text-xs tracking-widest uppercase">Vuốt xuống để xem tiếp</span>
                </motion.div>
            </div>
        </section>
    );
}