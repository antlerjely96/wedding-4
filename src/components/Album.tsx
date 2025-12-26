'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// =========================================================
// 👇 CẤU HÌNH ẢNH & TỈ LỆ KHUNG HÌNH 👇
// =========================================================
const allPhotos = [
    // --- 4 ẢNH FEATURE (Giữ nguyên) ---
    { src: "/image/DSC03665.JPG", alt: "Feature Main", aspect: "aspect-[2/3]" },
    { src: "/image/DSC03276.JPG", alt: "Feature Right", aspect: "aspect-[2/3]" },
    { src: "/image/DSC03615.JPG", alt: "Feature Bottom", aspect: "aspect-[4/3]" },
    { src: "/image/DSC03864.JPG", alt: "Feature BG", aspect: "aspect-square" },

    // --- CÁC ẢNH GALLERY (Masonry bên dưới) ---

    // 1. Ảnh Cưới 1 (Đầu cột 1)
    { src: "/image/DSC04163.JPG", alt: "Ảnh Cưới 1", aspect: "aspect-[2/4]" },

    // 👉 THÊM ẢNH MỚI TẠI ĐÂY (Sẽ nằm ngay dưới Ảnh Cưới 1)
    { src: "/image/DSC03514.JPG", alt: "Ảnh Cưới 6", aspect: "aspect-[3/3.75]" }, // Bạn nhớ đổi tên file ảnh nhé

    // Các ảnh tiếp theo sẽ bị đẩy sang cột 2, cột 3...
    { src: "/image/DSC03965.JPG", alt: "Ảnh Cưới 2", aspect: "aspect-[3.5/4]" },
    { src: "/image/DSC03164.JPG", alt: "Ảnh Cưới 3", aspect: "aspect-[3/4]" },
    { src: "/image/DSC03779.JPG", alt: "Ảnh Cưới 4", aspect: "aspect-[2/3]" },
    { src: "/image/DSC03404.JPG", alt: "Ảnh Cưới 5", aspect: "aspect-[3/4]" },
];

export default function Album() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Tách data: 4 ảnh đầu vào Feature, còn lại vào Gallery
    const featurePhotos = allPhotos.slice(0, 4);
    const galleryPhotos = allPhotos.slice(4);

    return (
        <section className="py-24 px-4 bg-[#F7E6CA] overflow-hidden">
            {/* --- HEADER --- */}
            <div className="text-center mb-20 relative z-10">
                <h3 className="font-script text-6xl md:text-7xl text-gray-800 relative inline-block px-8 bg-[#F7E3CA] z-10">
                    Khoảnh Khắc Hạnh Phúc
                </h3>
                <p className="font-serif text-gray-800 mt-4 tracking-wider uppercase text-sm">Album Ảnh Cưới</p>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-[#8B1E29]/30 -z-0"></div>
            </div>

            <div className="max-w-5xl mx-auto">

                {/* --- PHẦN 1: FEATURED ARTISTIC LAYOUT --- */}
                <div className="relative h-[600px] md:h-[800px] mb-24 hidden md:block">
                    {/* Ảnh 1 */}
                    {featurePhotos[0] && (
                        <div
                            className="absolute top-0 -left-10 w-7/12 h-[70%] z-0 rounded-lg overflow-hidden shadow-2xl rotate-[0deg] hover:z-30 hover:scale-105 transition duration-500 cursor-pointer"
                            onClick={() => setSelectedImage(featurePhotos[0].src)}
                        >
                            <Image src={featurePhotos[0].src} alt={featurePhotos[0].alt} fill className="object-cover" priority />
                        </div>
                    )}

                    {/* Ảnh 2 */}
                    {featurePhotos[1] && (
                        <div
                            className="absolute top-[10%] right-0 w-5/12 h-[80%] z-10 rounded-lg overflow-hidden shadow-2xl rotate-[1deg] hover:z-30 hover:scale-105 transition duration-500 border-4 border-white cursor-pointer"
                            onClick={() => setSelectedImage(featurePhotos[1].src)}
                        >
                            <Image src={featurePhotos[1].src} alt={featurePhotos[1].alt} fill className="object-cover" priority />
                        </div>
                    )}

                    {/* Ảnh 3 */}
                    {featurePhotos[2] && (
                        <div
                            className="absolute bottom-0 left-[15%] w-6/12 h-[35%] z-20 rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] -rotate-[2deg] hover:z-30 hover:scale-105 transition duration-500 border-4 border-white cursor-pointer"
                            onClick={() => setSelectedImage(featurePhotos[2].src)}
                        >
                            <Image src={featurePhotos[2].src} alt={featurePhotos[2].alt} fill className="object-cover" />
                        </div>
                    )}

                    {/* Ảnh 4 */}
                    {featurePhotos[3] && (
                        <div
                            className="absolute top-[-5%] right-[35%] w-3/12 h-[40%] z-0 rounded-lg overflow-hidden shadow-lg opacity-80 hover:opacity-100 hover:z-30 hover:scale-105 transition duration-500 cursor-pointer"
                            onClick={() => setSelectedImage(featurePhotos[3].src)}
                        >
                            <Image src={featurePhotos[3].src} alt={featurePhotos[3].alt} fill className="object-cover" />
                        </div>
                    )}
                </div>

                {/* Layout Mobile Feature */}
                <div className="md:hidden grid grid-cols-1 gap-4 mb-16">
                    {featurePhotos.slice(0, 2).map((photo, idx) => (
                        <div key={idx} className={`${photo.aspect} relative rounded overflow-hidden shadow-lg`} onClick={() => setSelectedImage(photo.src)}>
                            <Image src={photo.src} alt={photo.alt} fill className="object-cover"/>
                        </div>
                    ))}
                </div>


                {/* --- PHẦN 2: MASONRY GALLERY --- */}
                <div className="columns-2 md:columns-3 gap-4 space-y-4">
                    {galleryPhotos.map((photo, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group cursor-pointer break-inside-avoid ${photo.aspect} mb-4`}
                            onClick={() => setSelectedImage(photo.src)}
                        >
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-[#8B1E29]/0 group-hover:bg-[#8B1E29]/20 transition-colors duration-300"></div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <p className="font-script text-3xl text-black">Còn rất nhiều khoảnh khắc đẹp...</p>
                </div>
            </div>

            {/* --- LIGHTBOX --- */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[99999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-5 right-5 text-white/70 hover:text-white bg-white/10 p-2 rounded-full transition-all z-50">
                            <X size={32} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative w-full h-full max-w-6xl max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedImage}
                                alt="Full View"
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}