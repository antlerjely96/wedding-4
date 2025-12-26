'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function FamilyInfo() {
    return (
        // Giảm padding dọc từ py-20 xuống py-16 cho gọn
        <section className="py-12 md:py-16 bg-[#F7E6CA] overflow-hidden">
            <div className="container mx-auto px-4 max-w-5xl"> {/* Giảm max-w từ 6xl xuống 5xl */}

                <div className="flex flex-col md:flex-row items-center justify-between relative gap-6 md:gap-0">

                    {/* --- CỘT TRÁI: NHÀ TRAI --- */}
                    <motion.div
                        className="flex-1 text-center md:text-right w-full md:pr-10" // Giảm padding phải
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Giảm size chữ tiêu đề: text-4xl (PC), text-3xl (Mobile) */}
                        <h3 className="font-script text-4xl md:text-5xl text-[#CF351D] mb-4">Nhà Trai</h3>

                        <div className="space-y-1 mb-4"> {/* Giảm khoảng cách các dòng */}
                            {/* Giảm size tên: text-lg */}
                            <p className="font-serif text-base md:text-lg font-bold text-gray-800">Ông: Phạm Văn Tuấn</p>
                            <p className="font-serif text-base md:text-lg font-bold text-gray-800">Bà: Phạm Thị Thủy</p>
                        </div>

                        {/* Giảm size địa chỉ: text-sm */}
                        <p className="font-serif text-gray-800 leading-relaxed text-xs md:text-sm">
                            25 ngõ 662, đường 30/6, Vân Giang, <br/>
                            Nam Hoa Lư, Ninh Bình
                        </p>
                    </motion.div>


                    {/* --- CỘT GIỮA: CHỮ HỶ --- */}
                    <div className="relative flex flex-col items-center justify-center py-2 md:py-0">

                        {/* Đường kẻ dọc */}
                        <motion.div
                            className="absolute top-[-50px] bottom-[-30px] w-[1px] bg-white hidden md:block"
                            initial={{ height: 0 }}
                            whileInView={{ height: "130%" }}
                            transition={{ duration: 1 }}
                        ></motion.div>

                        {/* Vòng tròn Hỷ: Thu nhỏ kích thước */}
                        <motion.div
                            // w-16 h-16 (Mobile) -> w-20 h-20 (PC) (Trước đây là 20/24)
                            className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#F7E6CA] flex items-center justify-center shadow-md border-[3px] border-white"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: "backOut", delay: 0.8 }}
                        >
                            {/* Chữ Hỷ nhỏ lại: text-2xl/3xl */}
                            <span className="text-red-400 text-2xl md:text-2xl font-bold">囍</span>
                        </motion.div>
                        <motion.div
                            className="absolute top-[30px] bottom-[30px] w-[1px] bg-white hidden md:block"
                            initial={{ height: 0 }}
                            whileInView={{ height: "130%" }}
                            transition={{ duration: 1 }}
                        ></motion.div>
                    </div>


                    {/* --- CỘT PHẢI: NHÀ GÁI --- */}
                    <motion.div
                        className="flex-1 text-center md:text-left w-full md:pl-10" // Giảm padding trái
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 1.4 }}
                    >
                        {/* Tiêu đề nhỏ lại */}
                        <h3 className="font-script text-4xl md:text-5xl text-[#CF351D] mb-4">Nhà Gái</h3>

                        <div className="space-y-1 mb-4">
                            {/* Tên nhỏ lại */}
                            <p className="font-serif text-base md:text-lg font-bold text-gray-800">Ông: Nguyễn Đức Thu</p>
                            <p className="font-serif text-base md:text-lg font-bold text-gray-800">Bà: Lê Thu Thủy</p>
                        </div>

                        {/* Địa chỉ nhỏ lại */}
                        <p className="font-serif text-gray-800 leading-relaxed text-xs md:text-sm">
                            Số 1, Ngõ 62 Lương Yên, <br />
                            Hai Bà Trưng, Hà Nội
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}