import React from 'react';

interface Report {
    id: number;
    name: string;
    guestOf: string;
    attending: string;
    message: string;
}

interface DataTableProps {
    title: string;
    data: Report[];
    color: string; // Màu tiêu đề cho đẹp
}

export default function DataTable({ title, data, color }: DataTableProps) {
    return (
        <div className="mb-10 shadow-lg rounded-lg overflow-hidden border border-gray-200">
            <div className={`p-4 ${color} text-white font-bold text-xl`}>
                {title} <span className="text-sm opacity-80">({data.length} khách)</span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-700">
                    <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-600">
                    <tr>
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Tên Khách</th>
                        <th className="px-6 py-3">Khách Của</th>
                        <th className="px-6 py-3">Tham Dự</th>
                        <th className="px-6 py-3">Lời Nhắn</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-6 py-4 text-center text-gray-500 italic">
                                Chưa có dữ liệu
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">{item.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs ${item.guestOf === 'groom' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>
                                            {item.guestOf === 'groom' ? 'Nhà Trai' : 'Nhà Gái'}
                                        </span>
                                </td>
                                <td className="px-6 py-4">{item.attending === 'yes' ? '✅ Có' : '❌ Không'}</td>
                                <td className="px-6 py-4 text-gray-500 truncate max-w-xs" title={item.message}>
                                    {item.message || '-'}
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