'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { GreetingData, OCCASIONS } from '@/lib/types';
import QRCodeDisplay from '@/components/QRCodeDisplay';

export default function ResultPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [greeting, setGreeting] = useState<GreetingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const docRef = doc(db, 'greetings', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setGreeting({ id: docSnap.id, ...docSnap.data() } as GreetingData);
        }
      } catch (error) {
        console.error('Lỗi khi tải lời chúc:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGreeting();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white mx-auto mb-4"></div>
          <p className="text-xl font-semibold">Đang tải kết quả...</p>
        </div>
      </div>
    );
  }

  if (!greeting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-2xl font-bold mb-4">❌ Không tìm thấy lời chúc</p>
          <a href="/" className="text-white underline hover:text-purple-200">
            Quay về trang chủ
          </a>
        </div>
      </div>
    );
  }

  const occasionTheme = OCCASIONS.find((occ) => occ.name === greeting.occasion) || OCCASIONS[0];
  
  // Build the public URL for sharing
  const baseUrl =
    (process.env.NEXT_PUBLIC_BASE_URL && process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, '')) ||
    (typeof window !== 'undefined' ? window.location.origin : '');
  
  const greetingUrl = `${baseUrl}/greetings/${id}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-block bg-white/95 backdrop-blur rounded-2xl px-8 py-4 shadow-xl mb-6">
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              ✨ Lời chúc đã được tạo thành công! ✨
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Preview Card */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 animate-slide-up">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              📝 Xem trước lời chúc
            </h2>
            
            <div className="text-center mb-4">
              <span className="text-6xl">{occasionTheme.emoji}</span>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {greeting.occasion} - {greeting.recipientName}
              </h3>
              <p className="text-gray-700 italic line-clamp-4">
                {greeting.generatedGreeting}
              </p>
            </div>

            <button
              onClick={() => window.open(greetingUrl, '_blank')}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
            >
              👁️ Xem trang đầy đủ
            </button>
          </div>

          {/* QR Code & Actions */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              📱 Chia sẻ lời chúc
            </h2>
            
            <QRCodeDisplay url={greetingUrl} />

            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600 font-semibold mb-2">
                💡 Mẹo chia sẻ:
              </p>
              <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                <li>Tải QR code và gửi qua Zalo, Messenger</li>
                <li>Copy link và chia sẻ trên mạng xã hội</li>
                <li>In QR code và dán lên thiệp tặng</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={() => router.push('/')}
            className="px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-xl hover:bg-purple-50 transition-all transform hover:scale-105 shadow-xl border-2 border-purple-600"
          >
            ✨ Tạo lời chúc mới
          </button>
          
          <button
            onClick={() => window.open(greetingUrl, '_blank')}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-xl"
          >
            👁️ Xem như người nhận
          </button>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-white/90 backdrop-blur rounded-2xl p-6 shadow-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-start gap-4">
            <span className="text-3xl">ℹ️</span>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Lưu ý quan trọng:</h3>
              <ul className="text-gray-700 space-y-2 text-sm">
                <li>✅ Lời chúc của bạn đã được lưu vĩnh viễn và có thể truy cập bất cứ lúc nào</li>
                <li>🔗 Link chia sẻ: <code className="bg-gray-100 px-2 py-1 rounded text-xs break-all">{greetingUrl}</code></li>
                <li>📱 Người nhận sẽ thấy trang đẹp với hiệu ứng động, không có các nút điều khiển</li>
                <li>🎨 Trang này (Result) chỉ dành cho bạn - người tạo lời chúc</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
