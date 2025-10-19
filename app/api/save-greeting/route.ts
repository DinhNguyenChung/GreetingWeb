import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function POST(request: NextRequest) {
  try {
    // Diagnostic logs to help debug Firestore connectivity / config issues
    console.log('DEBUG: NEXT_PUBLIC_FIREBASE_PROJECT_ID =', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
    console.log('DEBUG: FIRESTORE_EMULATOR_HOST =', process.env.FIRESTORE_EMULATOR_HOST);

    const data = await request.json();
    
    const greetingData = {
      recipientName: data.recipientName,
      occasion: data.occasion,
      customMessage: data.customMessage || '',
      generatedGreeting: data.generatedGreeting,
      senderName: data.senderName || 'Một người bạn',
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'greetings'), greetingData);

    return NextResponse.json({ 
      id: docRef.id,
      success: true 
    });
  } catch (error) {
    // Improved error logging
    try {
      // Some Firestore errors include .code and .details
      // Log as much as is available without exposing secrets
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const e: any = error;
      console.error('Lỗi khi lưu lời chúc:', {
        message: e?.message || String(e),
        code: e?.code,
        details: e?.details,
      });
    } catch (logErr) {
      console.error('Lỗi khi ghi log lỗi Firestore:', logErr);
      console.error('Original error:', error);
    }
    return NextResponse.json(
      { error: 'Không thể lưu lời chúc' },
      { status: 500 }
    );
  }
}
