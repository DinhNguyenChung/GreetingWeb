'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { GreetingData, OCCASIONS } from '@/lib/types';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function GreetingPage() {
  const params = useParams();
  const id = params.id as string;
  const [greeting, setGreeting] = useState<GreetingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showQR, setShowQR] = useState(false);

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
          <p className="text-xl font-semibold">Đang tải lời chúc...</p>
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

  // Build a friendly title like: "Chúc mừng [Occasion] vui vẻ, [Name]!"
  const title = `Chúc mừng ${greeting.occasion} vui vẻ, ${greeting.recipientName}!`;

  // Build the public URL for sharing. If the env var isn't set (during dev),
  // fall back to current origin (client-side).
  const baseUrl =
    (process.env.NEXT_PUBLIC_BASE_URL && process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, '')) ||
    (typeof window !== 'undefined' ? window.location.origin : '');

  const greetingUrl = `${baseUrl}/greetings/${id}`;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${occasionTheme.gradient} relative`}>
      <AnimatedBackground occasion={greeting.occasion} />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-3xl w-full">
          {/* Greeting Card */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 animate-slide-up">
            {/* Occasion Emoji */}
            <div className="text-center mb-6">
              <span className="text-8xl animate-bounce-slow">{occasionTheme.emoji}</span>
            </div>

            {/* Title */}
            <h1 className="inline-block text-4xl md:text-5xl font-bold text-center mb-8 leading-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {title}
            </h1>


            {/* Greeting Message */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 mb-8 border-2 border-purple-200">
              <p
                className="text-lg md:text-xl text-gray-800 leading-relaxed text-center italic"
                // ensure proper language rendering
                lang="vi"
              >
                {greeting.generatedGreeting}
              </p>
            </div>

            {/* Sender Name */}
            <div className="text-center">
              <p className="text-gray-600 text-lg">
                <span className="font-semibold">Từ:</span> {greeting.senderName || 'Một người bạn'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowQR(!showQR)}
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg"
              >
                {showQR ? '🎨 Ẩn QR Code' : '📱 Hiển thị QR Code'}
              </button>
              
              <button
                onClick={() => window.print()}
                className="px-8 py-3 bg-white border-2 border-purple-600 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-all transform hover:scale-105 shadow-lg"
              >
                🖨️ In lời chúc
              </button>
            </div>

            {/* QR Code Section */}
            {showQR && (
              <div className="mt-8 animate-fade-in">
                <QRCodeDisplay url={greetingUrl} />
              </div>
            )}
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <a
              href="/"
              className="text-white text-lg font-semibold hover:text-purple-200 transition-colors underline"
            >
              ← Tạo lời chúc mới
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
