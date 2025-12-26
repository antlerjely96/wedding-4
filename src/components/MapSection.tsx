import { MapPin } from 'lucide-react';

export default function MapSection() {
    return (
        <section className="py-16 px-4 bg-[#8B1E29] text-white text-center">
            <div className="flex justify-center mb-4 text-amber-300"><MapPin size={36} /></div>
            <h3 className="font-serif text-3xl mb-4">Địa Điểm Tổ Chức</h3>
            <p className="font-bold text-lg mb-2">Tư Gia Của Nhà Gái</p>
            <p className="text-sm opacity-80 mb-8 max-w-md mx-auto">247 xóm Sau Gia, thôn Du Đồng, xã Ứng Hòa, Thành Phố Hà Nội</p>

            <a href="#" className="inline-block bg-white text-[#8B1E29] py-3 px-8 rounded-full font-bold transition hover:bg-gray-100 mb-8 shadow-lg">
                Xem Chỉ Đường
            </a>

            <div className="bg-gray-200 w-full max-w-3xl mx-auto h-80 rounded-lg overflow-hidden relative shadow-2xl border-4 border-white/20">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-bold">
                    Google Map Iframe Here
                </div>
            </div>
        </section>
    );
}