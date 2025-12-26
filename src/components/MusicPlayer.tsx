'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Disc, Music, Pause, Play, SkipForward } from 'lucide-react';

// =========================================================
// 👇 CẤU HÌNH DANH SÁCH NHẠC (PLAYLIST) 👇
// =========================================================
const PLAYLIST = [
    { title: "Beautiful In White", src: "/music/beautiful-in-while.mp3" }, // Bài cũ của bạn
    { title: "I Do - 911", src: "/music/i-do.mp3" },               // Thay tên file thật vào đây
    { title: "Marry You - Bruno Mars", src: "/music/marry-you.mp3" },
    { title: "Perfect - Ed Sheeran", src: "/music/perfect.mp3" },
    { title: "Nothing gonna change my love for you - Westlife", src: "/music/nothing's-gonna-change-my-love-for-you.mp3" },
    // Thêm bao nhiêu bài tùy thích...
];

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const hasInteracted = useRef(false); // Kiểm tra xem người dùng đã tương tác chưa

    // 1. Hàm chọn bài ngẫu nhiên (tránh trùng bài đang hát)
    const playRandomSong = () => {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * PLAYLIST.length);
        } while (newIndex === currentSongIndex && PLAYLIST.length > 1);

        setCurrentSongIndex(newIndex);
    };

    // 2. Hàm xử lý Play/Pause
    const togglePlay = async () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
                hasInteracted.current = true; // Đánh dấu đã tương tác
            } catch (error) {
                console.log("Lỗi phát nhạc:", error);
                setIsPlaying(false);
            }
        }
    };

    // 3. Tự động phát bài mới khi đổi index
    useEffect(() => {
        if (hasInteracted.current && audioRef.current) {
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch(e => console.log("Chặn autoplay khi đổi bài:", e));
        }
    }, [currentSongIndex]);

    // 4. Khởi tạo: Chọn bài ngẫu nhiên đầu tiên & Thử Autoplay
    useEffect(() => {
        // Chọn bài ngẫu nhiên ngay khi vào web
        const randomIndex = Math.floor(Math.random() * PLAYLIST.length);
        setCurrentSongIndex(randomIndex);

        // Mẹo: Lắng nghe cú click đầu tiên để kích hoạt nhạc
        const handleFirstInteraction = () => {
            if (audioRef.current && !hasInteracted.current) {
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true);
                        hasInteracted.current = true;
                    })
                    .catch(() => {});
            }
            // Gỡ bỏ sự kiện sau khi đã tương tác
            ['click', 'touchstart', 'scroll'].forEach(evt =>
                document.removeEventListener(evt, handleFirstInteraction)
            );
        };

        ['click', 'touchstart', 'scroll'].forEach(evt =>
            document.addEventListener(evt, handleFirstInteraction)
        );

        return () => {
            ['click', 'touchstart', 'scroll'].forEach(evt =>
                document.removeEventListener(evt, handleFirstInteraction)
            );
        };
    }, []);

    const currentSong = PLAYLIST[currentSongIndex];

    return (
        <>
            {/* THẺ AUDIO */}
            <audio
                ref={audioRef}
                src={currentSong.src}
                onEnded={playRandomSong} // Hát xong tự chuyển bài ngẫu nhiên khác
                preload="auto"
            />

            {/* UI ĐIỀU KHIỂN */}
            <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-center gap-2">

                {/* Tooltip: Hiển thị tên bài hát */}
                <AnimatePresence>
                    {isPlaying && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8, x: 20 }}
                            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            className="absolute bottom-16 right-0 bg-white/90 px-4 py-2 rounded-xl shadow-lg border border-[#8B1E29]/20 backdrop-blur-sm flex flex-col items-end min-w-[150px]"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-[10px] font-bold text-[#8B1E29] uppercase tracking-wider">
                                    Đang phát
                                </span>
                            </div>
                            <span className="text-xs font-serif text-gray-700 font-medium truncate max-w-[180px]">
                                ♫ {currentSong.title}
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Nút bấm chính */}
                <div className="relative group">
                    <button
                        onClick={togglePlay}
                        className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white border-2 border-[#8B1E29] rounded-full shadow-[0_4px_14px_0_rgba(139,30,41,0.39)] hover:scale-105 transition-all duration-300 z-10"
                    >
                        {/* Hiệu ứng sóng lan tỏa */}
                        {isPlaying && (
                            <>
                                <span className="absolute inset-0 rounded-full border border-[#8B1E29] opacity-0 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
                                <span className="absolute inset-0 rounded-full border border-[#8B1E29] opacity-0 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_1s]"></span>
                            </>
                        )}

                        {/* Icon xoay tròn */}
                        <motion.div
                            animate={{ rotate: isPlaying ? 360 : 0 }}
                            transition={{ repeat: isPlaying ? Infinity : 0, duration: 4, ease: "linear" }}
                            className="flex items-center justify-center w-full h-full text-[#8B1E29]"
                        >
                            {isPlaying ? <Disc size={26} strokeWidth={1.5} /> : <Music size={24} strokeWidth={1.5} className="text-gray-400" />}
                        </motion.div>

                        {/* Icon trạng thái nhỏ */}
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] border-2 border-white shadow-sm transition-colors duration-300 ${isPlaying ? 'bg-[#8B1E29]' : 'bg-gray-400'}`}>
                            {isPlaying ? <Pause size={8} fill="white" className="text-white" /> : <Play size={8} fill="white" className="text-white ml-[1px]" />}
                        </div>
                    </button>

                    {/* Nút Next bài nhỏ (chỉ hiện khi hover vào nút chính) */}
                    <button
                        onClick={(e) => { e.stopPropagation(); playRandomSong(); }}
                        className="absolute -left-10 top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-[#8B1E29]/30 rounded-full flex items-center justify-center shadow-md text-[#8B1E29] opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#8B1E29] hover:text-white transform translate-x-4 group-hover:translate-x-0"
                        title="Đổi bài khác"
                    >
                        <SkipForward size={14} />
                    </button>
                </div>
            </div>
        </>
    );
}