import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { recipientName, occasion, customMessage } = await request.json();

    if (!recipientName || !occasion) {
      return NextResponse.json(
        { error: 'Thiếu thông tin bắt buộc' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `Bạn là một nhà thơ, người viết lời chúc chuyên nghiệp. Hãy viết một lời chúc ${occasion} ngắn gọn, chân thành, độc đáo, và xúc động gửi đến ${recipientName}. ${
      customMessage ? `Lời chúc nên mang phong cách: ${customMessage}.` : ''
    } Độ dài không quá 5 câu. Không dùng emoji, chỉ dùng từ ngữ tiếng Việt.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const greeting = response.text();

    return NextResponse.json({ greeting });
  } catch (error) {
    console.error('Lỗi khi gọi Gemini API:', error);
    
    // Fallback greeting nếu API thất bại
    const fallbackGreeting = `Chúc mừng bạn nhân dịp đặc biệt này! Chúc bạn luôn hạnh phúc, thành công và tràn đầy năng lượng. Mong rằng những điều tốt đẹp nhất sẽ luôn đến với bạn. Hãy giữ nụ cười trên môi và tiếp tục tỏa sáng như chính bạn!`;
    
    return NextResponse.json({ 
      greeting: fallbackGreeting,
      fallback: true 
    });
  }
}
