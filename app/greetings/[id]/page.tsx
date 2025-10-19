'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { GreetingData, OCCASIONS } from '@/lib/types';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function GreetingPage() {
  const params = useParams();
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

  return (
    <div className={`min-h-screen bg-gradient-to-br ${occasionTheme.gradient} relative overflow-hidden`}>
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
          </div>
        </div>
      </div>
    </div>
  );
}
