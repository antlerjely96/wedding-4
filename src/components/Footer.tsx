import Image from 'next/image';
import { Music } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative text-center py-20 px-6 overflow-hidden text-white">

            <div className="absolute inset-0 z-0">
                {/*<Image*/}
                {/*    src="/api/placeholder/1200/600" // Thay bằng đường dẫn ảnh nền thật của bạn*/}
                {/*    alt="Footer Background"*/}
                {/*    fill*/}
                {/*    className="object-cover pointer-events-none"*/}
                {/*    priority={false}*/}
                {/*/>*/}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            <div className="relative z-10 max-w-xl mx-auto space-y-8">
                <p className="font-script text-2xl leading-relaxed opacity-90">
                    "Chúng mình vô cùng biết ơn vì bạn đã dành thời gian quý báu đến chung vui trong ngày trọng đại này."
                </p>
                <div className="pt-8">
                    <h2 className="font-script text-6xl text-[#e8b4b8] drop-shadow-lg text-[10vw] md:text-6xl whitespace-nowrap">Trân trọng cảm ơn <span className="text-3xl">❤️❤️❤️</span></h2>
                    <p className="font-serif font-bold text-sm tracking-[0.2em] mt-4 uppercase opacity-80">Rất hân hạnh được đón tiếp</p>
                </div>
            </div>

            {/* Nút Khóa son xoay tròn ở góc dưới trái */}
            {/*<button*/}
            {/*    className="absolute bottom-6 left-6 bg-black/50 p-3 rounded-full hover:bg-black/70 transition duration-300 z-20 border border-white/20"*/}
            {/*    aria-label="Play Music"*/}
            {/*>*/}
            {/*    <Music size={24} className="text-white animate-spin-slow" />*/}
            {/*</button>*/}
        </footer>
    );
}