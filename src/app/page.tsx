'use client';

import HeroEnvelope from '@/components/HeroEnvelope';
import CoupleIntro from '@/components/CoupleIntro';
import FamilyInfo from '@/components/FamilyInfo';
import EventCard from '@/components/EventCard';
import Album from '@/components/Album';
// import MapSection from '@/components/MapSection';
import RsvpForm from '@/components/RsvpForm';
import Footer from '@/components/Footer';
import MusicPlayer from "@/components/MusicPlayer";

export default function WeddingInvite() {
    return (
        <main className="min-h-screen bg-[#F7E6CA] pb-0 overflow-x-hidden">
            {/* 1. Mở đầu */}
            <HeroEnvelope />

            {/* 2. Giới thiệu Cô Dâu - Chú Rể (Dạng nền ảnh như bạn đã chọn) */}
            <CoupleIntro />

            {/* 3. Lễ Chính (Lễ Vu Quy) */}
            {/* Thường lễ chính sẽ nằm ngay sau phần giới thiệu tên */}
            <div className="mt-12 mb-8">
                <EventCard
                    title="Lễ Thành Hôn"
                    time="13h30"
                    lunarDate="Thứ 7, ngày 10 tháng 1 năm 2026"
                    locationName="Tại Tư Gia Của Nhà Trai"
                    address="25 ngõ 662, phố 30/6, Phường Vân Giang, Phường Nam Hoa Lư, Ninh Bình"
                    showCalendar={true}

                    mapLink='https://www.google.com/maps/place/Ch%C3%BA+Th%C3%A0nh/@20.2263821,105.9674067,199m/data=!3m1!1e3!4m6!3m5!1s0x31367b00409ad61b:0x1d97575ffb4350d!8m2!3d20.2262962!4d105.9674409!16s%2Fg%2F11ldcv7fdx!5m1!1e4?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
                    mapEmbed='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d867.6994507907116!2d105.96740671916265!3d20.22638214719992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31367b00409ad61b%3A0x1d97575ffb4350d!2zQ2jDuiBUaMOgbmg!5e1!3m2!1svi!2s!4v1766724953465!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"'
                />
            </div>

            {/* --- BẮT ĐẦU KHU VỰC ĐỔI CHỖ --- */}

            {/* 4. Tiệc Thân Mật (Đã đổi lên TRÊN FamilyInfo) */}
            <EventCard
                title="Tham Dự Tiệc Thân Mật"
                time="14:30"
                lunarDate="Thứ 7, ngày 10 tháng 1 năm 2026"
                locationName="Tư gia nhà trai"
                address="25 ngõ 662, đường 30/6, phố Vân Giang, phường Nam Hoa Lư, Ninh Bình"
                showCalendar={false}

                mapLink='https://www.google.com/maps/place/Ch%C3%BA+Th%C3%A0nh/@20.2263821,105.9674067,199m/data=!3m1!1e3!4m6!3m5!1s0x31367b00409ad61b:0x1d97575ffb4350d!8m2!3d20.2262962!4d105.9674409!16s%2Fg%2F11ldcv7fdx!5m1!1e4?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D'
                mapEmbed='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d867.6994507907116!2d105.96740671916265!3d20.22638214719992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31367b00409ad61b%3A0x1d97575ffb4350d!2zQ2jDuiBUaMOgbmg!5e1!3m2!1svi!2s!4v1766724953465!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"'
            />

            {/* 5. Gia đình (Đã đổi xuống DƯỚI Tiệc Thân Mật) */}
            <FamilyInfo />

            {/* --- KẾT THÚC KHU VỰC ĐỔI CHỖ --- */}

            {/* 6. Album Ảnh */}
            <Album />

            {/* 7. Bản Đồ */}
            {/*<MapSection />*/}

            {/* 8. RSVP & Footer */}
            <RsvpForm />
            <Footer />
            <MusicPlayer />

        </main>
    );
}