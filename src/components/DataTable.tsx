import React from 'react';

// Định nghĩa kiểu dữ liệu cho khách mời
export interface Guest {
    id: number;
    name: string;
    guestOf: string;
    attending: string;
    message: string;
}

interface DataTableProps {
    title: string;
    data: Guest[];
    color: string;
    // Nhận thêm số liệu thống kê từ trang cha
    countYes?: number;
    countNo?: number;
}

export default function DataTable({ title, data, color, countYes = 0, countNo = 0 }: DataTableProps) {
    return (
        <div className="mb-10 bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
            {/* --- PHẦN HEADER BẢNG --- */}
            <div className={`p-5 ${color} text-white`}>
                <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                    {/* Tiêu đề bên trái */}
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-xl font-bold uppercase tracking-wide">{title}</h2>
                        <span className="text-sm opacity-90 font-medium">({data.length} tổng)</span>
                    </div>

                    {/* Thống kê bên phải */}
                    <div className="flex items-center gap-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold shadow-sm">
                        <div className="flex items-center gap-1.5 text-green-100">
                            <span className="bg-green-500 w-2 h-2 rounded-full"></span>
                            <span>Có: {countYes}</span>
                        </div>
                        <div className="w-[1px] h-4 bg-white/40"></div>
                        <div className="flex items-center gap-1.5 text-red-100">
                            <span className="bg-red-500 w-2 h-2 rounded-full"></span>
                            <span>Không: {countNo}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- PHẦN NỘI DUNG BẢNG --- */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-700">
                    <thead className="bg-gray-50 text-xs uppercase font-bold text-gray-500 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 w-16">ID</th>
                        <th className="px-6 py-4">Tên Khách</th>
                        <th className="px-6 py-4">Khách Của</th>
                        <th className="px-6 py-4">Trạng Thái</th>
                        <th className="px-6 py-4">Lời Nhắn</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-6 py-10 text-center text-gray-400 italic bg-gray-50/50">
                                Chưa có dữ liệu nào để hiển thị.
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.id} className="hover:bg-blue-50/50 transition-colors duration-150">
                                <td className="px-6 py-4 font-mono text-xs text-gray-400">#{item.id}</td>
                                <td className="px-6 py-4 font-semibold text-gray-800 text-base">
                                    {item.name}
                                </td>
                                <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            item.guestOf === 'groom'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-pink-100 text-pink-800'
                                        }`}>
                                            {item.guestOf === 'groom' ? '🤵 Nhà Trai' : '👰 Nhà Gái'}
                                        </span>
                                </td>
                                <td className="px-6 py-4">
                                    {item.attending === 'yes' ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                                                ✅ Tham dự
                                            </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200 opacity-70">
                                                ❌ Vắng mặt
                                            </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-gray-500 italic max-w-xs truncate" title={item.message}>
                                    {item.message || <span className="opacity-30">-</span>}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}