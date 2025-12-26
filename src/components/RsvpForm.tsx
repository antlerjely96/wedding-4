'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants, Easing } from 'framer-motion';
import { Send, Heart, Loader2, AlertCircle } from 'lucide-react';
import CustomSelect from './ui/Select';

// --- CONFIG ANIMATION ---
const smoothEase: Easing = [0.4, 0, 0.2, 1];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: smoothEase } }
};

export default function RsvpForm() {
    // State dữ liệu
    const [formData, setFormData] = useState({
        name: '',
        guestOf: '',
        attending: '',
        message: ''
    });

    // State trạng thái
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // --- HÀM GỬI FORM ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Bật trạng thái loading
        setStatus('loading');
        setErrorMessage('');

        try {
            // 2. Gọi API Spring Boot
            const res = await fetch('https://wedding-3-backend.onrender.com/api/rsvp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            // 3. Kiểm tra kết quả
            if (res.ok) {
                setStatus('success');
                // Reset form sau khi gửi thành công (tùy chọn)
                // setFormData({ name: '', guestOf: '', attending: '', message: '' });
            } else {
                throw new Error('Server returned error');
            }
        } catch (error) {
            console.error("Lỗi gửi form:", error);
            setStatus('error');
            setErrorMessage('Có lỗi kết nối. Vui lòng kiểm tra lại mạng!');
        }
    };

    // Data Select
    const guestOptions = [
        { label: "Nhà Trai", value: "groom" },
        // { label: "Nhà Gái", value: "bride" },
    ];
    const attendingOptions = [
        { label: "Chắc chắn rồi!", value: "yes" },
        { label: "Tiếc quá, mình bận mất rồi", value: "no" }
    ];

    return (
        <section className="py-12 md:py-20 bg-[#F7E6CA]">
            <div className="container mx-auto px-4 max-w-lg">

                <motion.div
                    className="bg-white rounded-xl shadow-2xl overflow-visible relative z-10"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={containerVariants}
                >
                    {/* Header */}
                    <motion.div variants={itemVariants} className="bg-[#8B1E29] p-6 text-center text-white rounded-t-xl">
                        <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">Gửi Lời Chúc Mừng</h3>
                        <p className="text-sm md:text-base font-light opacity-90 italic">
                            Hãy gửi những lời chúc tốt đẹp nhất đến chúng mình nhé!
                        </p>
                    </motion.div>

                    {/* Body */}
                    <div className="p-6 md:p-8">
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                // --- MÀN HÌNH THÀNH CÔNG ---
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, ease: "backOut" }}
                                    className="text-center py-10"
                                >
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Heart className="text-green-500 w-10 h-10" fill="currentColor" />
                                    </div>
                                    <h3 className="text-2xl font-script text-gray-800 mb-2">Cảm ơn bạn!</h3>
                                    <p className="text-gray-500 font-serif">Lời chúc của bạn đã được gửi đi thành công.</p>

                                    {/*<motion.button*/}
                                    {/*    whileHover={{ scale: 1.05 }}*/}
                                    {/*    whileTap={{ scale: 0.95 }}*/}
                                    {/*    onClick={() => setStatus('idle')}*/}
                                    {/*    className="mt-8 px-6 py-2 text-sm text-[#8B1E29] font-bold border border-[#8B1E29] rounded-full hover:bg-[#8B1E29] hover:text-white transition-colors"*/}
                                    {/*>*/}
                                    {/*    Gửi thêm lời chúc khác*/}
                                    {/*</motion.button>*/}
                                </motion.div>
                            ) : (
                                // --- MÀN HÌNH NHẬP FORM ---
                                <motion.form
                                    key="form"
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                    exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                                >
                                    {/* Input Name */}
                                    <motion.div variants={itemVariants}>
                                        <motion.input
                                            whileFocus={{ scale: 1.01, borderColor: "#8B1E29" }}
                                            type="text"
                                            placeholder="Tên Của Bạn"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8B1E29]/50 transition-colors text-gray-700 placeholder-gray-400"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            required
                                        />
                                    </motion.div>

                                    {/* Selects */}
                                    <motion.div variants={itemVariants} className="relative z-30">
                                        <CustomSelect
                                            options={guestOptions}
                                            placeholder="Bạn Là Khách Mời Của..."
                                            value={formData.guestOf}
                                            onChange={(val) => setFormData({...formData, guestOf: val})}
                                        />
                                    </motion.div>

                                    <motion.div variants={itemVariants} className="relative z-20">
                                        <CustomSelect
                                            options={attendingOptions}
                                            placeholder="Bạn Tham Dự Chứ?"
                                            value={formData.attending}
                                            onChange={(val) => setFormData({...formData, attending: val})}
                                        />
                                    </motion.div>

                                    {/* Textarea */}
                                    <motion.div variants={itemVariants}>
                                        <motion.textarea
                                            whileFocus={{ scale: 1.01, borderColor: "#8B1E29" }}
                                            placeholder="Lời nhắn nhủ..."
                                            rows={4}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#8B1E29]/50 transition-colors text-gray-700 placeholder-gray-400 resize-none"
                                            value={formData.message}
                                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        ></motion.textarea>
                                    </motion.div>

                                    {/* Error Message */}
                                    {status === 'error' && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                                            <AlertCircle size={16} /> {errorMessage}
                                        </motion.div>
                                    )}

                                    {/* Submit Button */}
                                    <motion.div variants={itemVariants} className="space-y-3 pt-2">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.95 }}
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className={`w-full py-3.5 text-white rounded-lg font-bold shadow-md transition-colors flex items-center justify-center gap-2 ${
                                                status === 'loading' ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#8B1E29] hover:bg-[#a02330]'
                                            }`}
                                        >
                                            {status === 'loading' ? (
                                                <><Loader2 className="animate-spin" size={18} /> Đang gửi...</>
                                            ) : (
                                                <><Send size={18} /> Gửi Lời Chúc</>
                                            )}
                                        </motion.button>
                                    </motion.div>

                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}