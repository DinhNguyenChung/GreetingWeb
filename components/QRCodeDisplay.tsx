'use client';

import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';

interface QRCodeDisplayProps {
  url: string;
}

export default function QRCodeDisplay({ url }: QRCodeDisplayProps) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = async () => {
    try {
      const qrCanvas = canvasRef.current;
      if (qrCanvas) {
        await QRCode.toCanvas(qrCanvas, url, {
          width: 300,
          margin: 2,
          color: {
            dark: '#7C3AED',
            light: '#FFFFFF',
          },
        });
        
        const dataUrl = qrCanvas.toDataURL();
        setQrDataUrl(dataUrl);
      }
    } catch (error) {
      console.error('Lỗi khi tạo QR code:', error);
    }
  };

  const downloadQR = () => {
    if (qrDataUrl) {
      const link = document.createElement('a');
      link.download = 'qr-code-loi-chuc.png';
      link.href = qrDataUrl;
      link.click();
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('Đã sao chép link vào clipboard!');
    } catch (error) {
      console.error('Lỗi khi sao chép link:', error);
    }
  };

  // Generate QR when component mounts
  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (!mounted) return;
      if (!qrDataUrl) {
        await generateQR();
      }
    };

    run();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-purple-200">
      <h3 className="text-2xl font-bold text-center mb-4 text-purple-600">
        Chia sẻ lời chúc
      </h3>
      
      <div className="flex justify-center mb-6">
        <canvas ref={canvasRef} className="shadow-lg rounded-lg" />
      </div>

      <div className="space-y-3">
        <button
          onClick={downloadQR}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-md"
        >
          📥 Tải xuống QR Code
        </button>

        <button
          onClick={copyLink}
          className="w-full px-6 py-3 bg-white border-2 border-purple-600 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-all transform hover:scale-105 shadow-md"
        >
          📋 Sao chép đường link
        </button>
      </div>

      <div className="mt-4 p-3 bg-gray-100 rounded-lg">
        <p className="text-sm text-gray-600 text-center break-all">
          {url}
        </p>
      </div>
    </div>
  );
}
