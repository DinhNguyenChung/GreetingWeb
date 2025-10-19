'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OCCASIONS } from '@/lib/types';

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    recipientName: '',
    occasion: '',
    customMessage: '',
    senderName: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Gọi API để tạo lời chúc
      const greetingResponse = await fetch('/api/generate-greeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientName: formData.recipientName,
          occasion: formData.occasion,
          customMessage: formData.customMessage,
        }),
      });

      if (!greetingResponse.ok) {
        throw new Error('Không thể tạo lời chúc');
      }

      const { greeting } = await greetingResponse.json();

      // Lưu lời chúc vào database
      const saveResponse = await fetch('/api/save-greeting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          generatedGreeting: greeting,
        }),
      });

      if (!saveResponse.ok) {
        throw new Error('Không thể lưu lời chúc');
      }

      const { id } = await saveResponse.json();

      // Chuyển đến trang kết quả (dành cho người tạo)
      router.push(`/result/${id}`);
    } catch (err) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            ✨ Tạo Lời Chúc Cá Nhân Hóa
          </h1>
          <p className="text-xl text-white/90 drop-shadow">
            Tuyệt Vời Nhất Với AI
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 md:p-12 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tên người được chúc */}
            <div>
              <label htmlFor="recipientName" className="block text-sm font-semibold text-gray-700 mb-2">
                Tên người được chúc <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="recipientName"
                required
                value={formData.recipientName}
                onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                placeholder='Ví dụ: "Cô giáo Hồng", "Bạn thân An", "Mẹ yêu"'
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all outline-none"
              />
            </div>

            {/* Dịp lễ */}
            <div>
              <label htmlFor="occasion" className="block text-sm font-semibold text-gray-700 mb-2">
                Dịp Lễ/Sự Kiện <span className="text-red-500">*</span>
              </label>
              <select
                id="occasion"
                required
                value={formData.occasion}
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all outline-none"
              >
                <option value="">-- Chọn dịp lễ --</option>
                {OCCASIONS.map((occ) => (
                  <option key={occ.name} value={occ.name}>
                    {occ.emoji} {occ.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Thông điệp tùy chọn */}
            <div>
              <label htmlFor="customMessage" className="block text-sm font-semibold text-gray-700 mb-2">
                Thông điệp mong muốn thêm (Tùy chọn)
              </label>
              <textarea
                id="customMessage"
                rows={4}
                value={formData.customMessage}
                onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })}
                placeholder='Ví dụ: "Cảm ơn vì đã luôn giúp đỡ", "Thích mèo", "Chủ đề lãng mạn"'
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all outline-none resize-none"
              />
            </div>

            {/* Tên người gửi */}
            <div>
              <label htmlFor="senderName" className="block text-sm font-semibold text-gray-700 mb-2">
                Tên người gửi (Tùy chọn)
              </label>
              <input
                type="text"
                id="senderName"
                value={formData.senderName}
                onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                placeholder='Ví dụ: "Một người bạn", "Học trò của cô"'
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all outline-none"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg text-white transition-all transform ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-105 shadow-xl hover:shadow-2xl'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Đang tạo lời chúc...
                </span>
              ) : (
                '✨ Tạo Lời Chúc'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/80">
          <p className="text-sm">
            Được tạo bởi AI • Google Gemini
          </p>
        </div>
      </div>
    </div>
  );
}
