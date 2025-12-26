'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

// Định nghĩa kiểu dữ liệu cho Option
export interface SelectOption {
    label: string;
    value: string;
}

interface CustomSelectProps {
    options: SelectOption[];
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

export default function CustomSelect({ options, placeholder, value, onChange }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Xử lý click ra ngoài để đóng dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Tìm label tương ứng với value đang chọn
    const selectedLabel = options.find(opt => opt.value === value)?.label;

    return (
        <div className="relative" ref={containerRef}>
            {/* Nút kích hoạt (Trigger Box) */}
            <motion.div
                className={`w-full px-4 py-3 bg-gray-50 border rounded-lg cursor-pointer flex items-center justify-between transition-colors ${isOpen ? 'border-[#8B1E29] ring-1 ring-[#8B1E29]/50' : 'border-gray-200'}`}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ backgroundColor: "#fafafa" }}
                whileTap={{ scale: 0.98 }}
            >
                <span className={`${value === 'default' || !value ? 'text-gray-400' : 'text-gray-700'}`}>
                    {value !== 'default' && value ? selectedLabel : placeholder}
                </span>

                {/* Icon mũi tên xoay */}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown size={18} className="text-gray-400" />
                </motion.div>
            </motion.div>

            {/* Danh sách xổ xuống (Dropdown List) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
                        animate={{ opacity: 1, y: 0, scaleY: 1 }}
                        exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden origin-top"
                    >
                        <div className="max-h-60 overflow-y-auto py-1">
                            {options.map((option, index) => (
                                <motion.div
                                    key={option.value}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }} // Hiệu ứng Stagger: Hiện lần lượt
                                    className={`px-4 py-3 cursor-pointer flex items-center justify-between text-sm md:text-base ${value === option.value ? 'bg-[#8B1E29]/5 text-[#8B1E29] font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                >
                                    {option.label}
                                    {value === option.value && <Check size={16} />}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}