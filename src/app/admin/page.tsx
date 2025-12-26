'use client';

import React, { useEffect, useState } from 'react';
import DataTable from '@/components/DataTable'; // Nhớ đường dẫn import cho đúng

// Thay link này bằng link Render thật của bạn
const API_BASE = 'https://wedding-3-backend.onrender.com/api/rsvp-form';

export default function AdminPage() {
    const [allData, setAllData] = useState([]);
    const [groomData, setGroomData] = useState([]);
    const [brideData, setBrideData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            // 1. Gọi API lấy TOÀN BỘ
            const resAll = await fetch(API_BASE);
            const dataAll = await resAll.json();
            setAllData(dataAll);

            // 2. Gọi API lấy NHÀ TRAI (filter?side=groom)
            const resGroom = await fetch(`${API_BASE}/filter?side=groom`);
            const dataGroom = await resGroom.json();
            setGroomData(dataGroom);

            // 3. Gọi API lấy NHÀ GÁI (filter?side=bride)
            const resBride = await fetch(`${API_BASE}/filter?side=bride`);
            const dataBride = await resBride.json();
            setBrideData(dataBride);

        } catch (error) {
            console.error("Lỗi lấy dữ liệu:", error);
            alert("Không thể kết nối với Server!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center text-xl">Đang tải dữ liệu... ⏳</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">📊 Quản Lý Khách Mời</h1>
                    <button
                        onClick={fetchData}
                        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                    >
                        🔄 Làm mới
                    </button>
                </div>

                {/* 1. Bảng Tổng Hợp */}
                <DataTable title="Tất Cả Khách Mời" data={allData} color="bg-gray-800" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 2. Bảng Nhà Trai */}
                    <DataTable title="🤵 Danh Sách Nhà Trai" data={groomData} color="bg-blue-600" />

                    {/* 3. Bảng Nhà Gái */}
                    <DataTable title="👰 Danh Sách Nhà Gái" data={brideData} color="bg-pink-600" />
                </div>
            </div>
        </div>
    );
}