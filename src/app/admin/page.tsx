'use client';

import React, { useEffect, useState } from 'react';
// Nếu bạn gặp lỗi import, hãy thử đổi '@' thành '..', ví dụ: '../../components/DataTable'
import DataTable, { Guest } from '@/components/DataTable';

// 👉 Thay bằng URL Render thực tế của bạn
const API_BASE = 'https://wedding-3-backend.onrender.com/api/rsvp-form';

// Cấu trúc dữ liệu sau khi đã xử lý (Sắp xếp + Đếm)
interface ProcessedData {
    sortedList: Guest[];
    countYes: number;
    countNo: number;
}

export default function AdminPage() {
    // State lưu dữ liệu gốc từ API
    const [allData, setAllData] = useState<Guest[]>([]);
    const [groomData, setGroomData] = useState<Guest[]>([]);
    const [brideData, setBrideData] = useState<Guest[]>([]);

    // State trạng thái
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    // --- HÀM 1: Fetch API An Toàn (Tránh sập web) ---
    const safeFetch = async (url: string) => {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Lỗi HTTP ${res.status}`);
            const data = await res.json();
            // Chỉ trả về data nếu nó là mảng, ngược lại trả mảng rỗng
            return Array.isArray(data) ? data : [];
        } catch (err) {
            console.error(`Lỗi kết nối ${url}:`, err);
            return []; // Luôn trả về mảng rỗng khi lỗi
        }
    };

    // --- HÀM 2: Xử lý dữ liệu (Sắp xếp & Đếm) ---
    const processData = (list: Guest[]): ProcessedData => {
        // 1. Đếm số lượng
        const countYes = list.filter(g => g.attending === 'yes').length;
        const countNo = list.filter(g => g.attending === 'no').length;

        // 2. Sắp xếp: Ai đi (Yes) đưa lên đầu
        const sortedList = [...list].sort((a, b) => {
            // Logic: yes < no (để yes lên trước)
            if (a.attending === 'yes' && b.attending !== 'yes') return -1;
            if (a.attending !== 'yes' && b.attending === 'yes') return 1;
            // Nếu cùng trạng thái thì giữ nguyên hoặc sắp theo ID mới nhất
            return b.id - a.id;
        });

        return { sortedList, countYes, countNo };
    };

    // --- HÀM 3: Gọi dữ liệu ---
    const fetchData = async () => {
        setLoading(true);
        setErrorMsg('');
        try {
            // Gọi song song 3 API để tiết kiệm thời gian
            const [all, groom, bride] = await Promise.all([
                safeFetch(API_BASE),
                safeFetch(`${API_BASE}/filter?side=groom`),
                safeFetch(`${API_BASE}/filter?side=bride`)
            ]);

            setAllData(all);
            setGroomData(groom);
            setBrideData(bride);

            // Cảnh báo nếu không có dữ liệu nào
            if (all.length === 0 && groom.length === 0 && bride.length === 0) {
                console.warn("Database trống hoặc Server chưa phản hồi đúng.");
            }
        } catch (error) {
            setErrorMsg("Không thể kết nối đến Server. Vui lòng kiểm tra lại Render.");
        } finally {
            setLoading(false);
        }
    };

    // Chạy lần đầu khi vào trang
    useEffect(() => {
        fetchData();
    }, []);

    // --- Tính toán dữ liệu để hiển thị ---
    const processedAll = processData(allData);
    const processedGroom = processData(groomData);
    const processedBride = processData(brideData);

    // --- Giao diện Loading ---
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-4">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-600 font-medium animate-pulse">Đang tải dữ liệu...</p>
            </div>
        );
    }

    // --- Giao diện Chính ---
    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-10 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header trang */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                            📊 Quản Lý Khách Mời
                        </h1>
                        <p className="text-gray-500 mt-1 text-sm">
                            Xem danh sách và thống kê khách tham dự đám cưới.
                        </p>
                    </div>
                    <button
                        onClick={fetchData}
                        className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-6 py-2.5 rounded-lg shadow-md transition-all active:scale-95"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                        Làm mới dữ liệu
                    </button>
                </div>

                {/* Thông báo lỗi */}
                {errorMsg && (
                    <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r shadow-sm">
                        <p className="font-bold">⚠️ Đã xảy ra lỗi:</p>
                        <p>{errorMsg}</p>
                    </div>
                )}

                {/* --- BẢNG TỔNG HỢP --- */}
                <DataTable
                    title="Tổng Hợp Chung"
                    data={processedAll.sortedList}
                    countYes={processedAll.countYes}
                    countNo={processedAll.countNo}
                    color="bg-slate-800"
                />

                {/* --- GRID 2 CỘT CHO NHÀ TRAI / NHÀ GÁI --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <DataTable
                        title="Danh Sách Nhà Trai"
                        data={processedGroom.sortedList}
                        countYes={processedGroom.countYes}
                        countNo={processedGroom.countNo}
                        color="bg-blue-600"
                    />

                    <DataTable
                        title="Danh Sách Nhà Gái"
                        data={processedBride.sortedList}
                        countYes={processedBride.countYes}
                        countNo={processedBride.countNo}
                        color="bg-pink-600"
                    />
                </div>
            </div>
        </div>
    );
}