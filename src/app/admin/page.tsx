'use client';

import React, { useEffect, useState } from 'react';

// --- LƯU Ý ĐƯỜNG DẪN IMPORT ---
// Cách 1: Nếu bạn có cấu hình alias @ (thường là mặc định của Next.js mới)
import DataTable from '@/components/DataTable';
// Cách 2: Nếu cách 1 báo lỗi đỏ, hãy dùng cách này (đường dẫn tương đối)
// import DataTable from '../../components/DataTable';

// URL Backend (Đảm bảo đúng link Render của bạn)
const API_BASE = 'https://wedding-3-backend.onrender.com/api/rsvp-form';

// Định nghĩa kiểu dữ liệu cho Khách mời (để TypeScript không báo lỗi)
interface Guest {
    id: number;
    name: string;
    guestOf: string;
    attending: string;
    message: string;
}

export default function AdminPage() {
    // Khởi tạo state luôn là mảng rỗng [] để không bao giờ bị null
    const [allData, setAllData] = useState<Guest[]>([]);
    const [groomData, setGroomData] = useState<Guest[]>([]);
    const [brideData, setBrideData] = useState<Guest[]>([]);

    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    // Hàm gọi API an toàn (Chìa khóa sửa lỗi của bạn)
    const safeFetch = async (url: string) => {
        try {
            const res = await fetch(url);

            // Nếu lỗi HTTP (404, 500...), ném lỗi ra
            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Lỗi ${res.status}: ${errorText}`);
            }

            const data = await res.json();

            // KIỂM TRA QUAN TRỌNG: Chỉ trả về data nếu nó là Mảng
            if (Array.isArray(data)) {
                return data;
            } else {
                console.error("Backend trả về dữ liệu lạ (không phải mảng):", data);
                return []; // Trả về mảng rỗng để không sập web
            }
        } catch (err) {
            console.error(`Lỗi khi gọi ${url}:`, err);
            return []; // Có lỗi thì cũng trả về mảng rỗng
        }
    };

    const fetchData = async () => {
        setLoading(true);
        setErrorMsg('');

        try {
            console.log("Bắt đầu lấy dữ liệu...");

            // Gọi 3 API song song
            const [all, groom, bride] = await Promise.all([
                safeFetch(API_BASE),
                safeFetch(`${API_BASE}/filter?side=groom`),
                safeFetch(`${API_BASE}/filter?side=bride`)
            ]);

            setAllData(all);
            setGroomData(groom);
            setBrideData(bride);

            // Nếu cả 3 đều rỗng, có thể Server đang lỗi hoặc chưa có Data
            if (all.length === 0 && groom.length === 0 && bride.length === 0) {
                console.warn("Không lấy được dữ liệu nào (hoặc DB trống).");
            }

        } catch (error) {
            console.error("Lỗi nghiêm trọng:", error);
            setErrorMsg("Không thể kết nối đến Server Backend.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Giao diện khi đang tải
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 font-medium">Đang kết nối Server...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-gray-800">📊 Quản Lý Khách Mời</h1>
                    <button
                        onClick={fetchData}
                        className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg shadow transition flex items-center gap-2"
                    >
                        <span>🔄</span> Làm mới dữ liệu
                    </button>
                </div>

                {/* Thông báo lỗi nếu có */}
                {errorMsg && (
                    <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded shadow-sm">
                        <p className="font-bold">Lỗi kết nối:</p>
                        <p>{errorMsg}</p>
                        <p className="text-sm mt-1">Hãy kiểm tra tab Console (F12) để xem chi tiết.</p>
                    </div>
                )}

                {/* 1. Bảng Tổng Hợp */}
                <DataTable title="📋 Tất Cả Khách Mời" data={allData} color="bg-gray-800" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 2. Bảng Nhà Trai */}
                    <DataTable title="🤵 Nhà Trai (Groom)" data={groomData} color="bg-blue-600" />

                    {/* 3. Bảng Nhà Gái */}
                    <DataTable title="👰 Nhà Gái (Bride)" data={brideData} color="bg-pink-600" />
                </div>
            </div>
        </div>
    );
}