# 🎉 Trang Web Chúc Mừng Cá Nhân Hóa

Ứng dụng web cho phép tạo lời chúc cá nhân hóa với AI (Google Gemini), đẹp mắt và dễ dàng chia sẻ qua QR Code.

## ✨ Tính Năng

- 🤖 **Tạo lời chúc tự động bằng AI** - Sử dụng Google Gemini API
- 🎨 **8 chủ đề dịp lễ khác nhau** - Sinh nhật, 20/10, Giáng sinh, Tết, Valentine, v.v.
- 🎭 **Hiệu ứng động đặc biệt** - Animation theo từng dịp lễ
- 📱 **QR Code tự động** - Dễ dàng chia sẻ
- 💾 **Lưu trữ vĩnh viễn** - Dùng Firebase Firestore
- 📱 **Responsive Design** - Hoạt động tốt trên mọi thiết bị
- 🌈 **UI/UX đẹp mắt** - Tailwind CSS với gradient và animation

## 🛠️ Công Nghệ Sử Dụng

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS
- **AI:** Google Gemini API (gemini-2.0-flash-exp)
- **Database:** Firebase Firestore
- **QR Code:** qrcode library
- **Deployment:** Vercel (khuyến nghị)

## 📋 Yêu Cầu Hệ Thống

- Node.js 18.x trở lên
- npm hoặc yarn
- Tài khoản Google Cloud (cho Gemini API)
- Tài khoản Firebase (cho Database)

## 🚀 Hướng Dẫn Cài Đặt

### 1. Clone hoặc tạo project

```powershell
cd d:\IUH\projectmini
```

### 2. Cài đặt dependencies

```powershell
npm install
```

### 3. Cấu hình Environment Variables

Tạo file `.env.local` từ `.env.example`:

```powershell
Copy-Item .env.example .env.local
```

Sau đó, cập nhật các giá trị trong `.env.local`:

```env
# Google Gemini API
GEMINI_API_KEY=AIza...your_key_here

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

# App Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 4. Lấy Gemini API Key

1. Truy cập [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Đăng nhập với tài khoản Google
3. Click **"Get API Key"** hoặc **"Create API Key"**
4. Copy API key và paste vào `.env.local`

### 5. Cấu hình Firebase

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Tạo project mới hoặc chọn project có sẵn
3. Vào **Project Settings** → **General**
4. Scroll xuống **"Your apps"** → Chọn **Web app** (</> icon)
5. Đăng ký app và copy **Firebase config**
6. Paste các giá trị vào `.env.local`
7. Vào **Firestore Database** → **Create database**
8. Chọn **Start in test mode** (hoặc production mode)
9. Chọn region gần nhất (ví dụ: `asia-southeast1`)

### 6. Chạy Development Server

```powershell
npm run dev
```

Mở trình duyệt và truy cập: `http://localhost:3000`

## 📱 Hướng Dẫn Sử Dụng

### Tạo Lời Chúc

1. **Truy cập trang chủ** (`http://localhost:3000`)
2. **Điền thông tin:**
   - Tên người được chúc (bắt buộc)
   - Chọn dịp lễ (bắt buộc)
   - Thông điệp tùy chọn (không bắt buộc)
   - Tên người gửi (không bắt buộc)
3. **Click "✨ Tạo Lời Chúc"**
4. Đợi AI tạo lời chúc (3-5 giây)
5. Được chuyển đến trang hiển thị lời chúc

### Chia Sẻ Lời Chúc

1. Trên trang lời chúc, click **"📱 Hiển thị QR Code"**
2. QR Code sẽ hiện ra
3. Chọn một trong các tùy chọn:
   - **📥 Tải xuống QR Code** - Lưu ảnh QR
   - **📋 Sao chép đường link** - Copy URL
   - **🖨️ In lời chúc** - In trực tiếp

### Xem Lời Chúc Đã Tạo

- Mỗi lời chúc có URL riêng: `/greetings/[id]`
- Quét QR Code hoặc truy cập link để xem
- Lời chúc được lưu vĩnh viễn trong Firebase

## 🎨 Các Dịp Lễ Được Hỗ Trợ

| Dịp Lễ | Emoji | Màu Chủ Đạo |
|--------|-------|-------------|
| Sinh nhật | 🎂 | Hồng - Tím |
| Ngày 20/10 | 🌹 | Hồng - Đỏ hồng |
| Tốt nghiệp | 🎓 | Xanh dương - Indigo |
| Giáng sinh | 🎄 | Đỏ - Xanh lá |
| Năm mới | 🎆 | Vàng - Cam |
| Cảm ơn thầy cô | 🍎 | Xanh lá - Xanh ngọc |
| Valentine | 💝 | Hồng - Đỏ |
| Tết Nguyên Đán | 🧧 | Đỏ - Vàng |

## 🏗️ Cấu Trúc Dự Án

```
d:\IUH\projectmini\
├── app/
│   ├── api/
│   │   ├── generate-greeting/
│   │   │   └── route.ts          # API endpoint tạo lời chúc với Gemini
│   │   └── save-greeting/
│   │       └── route.ts          # API endpoint lưu vào Firebase
│   ├── greetings/
│   │   └── [id]/
│   │       └── page.tsx          # Trang hiển thị lời chúc
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Trang chủ (Landing page)
├── components/
│   ├── AnimatedBackground.tsx    # Component hiệu ứng động
│   └── QRCodeDisplay.tsx         # Component QR Code
├── lib/
│   ├── firebase.ts               # Firebase configuration
│   └── types.ts                  # TypeScript types & constants
├── .env.example                  # Template environment variables
├── .env.local                    # Your actual env vars (git ignored)
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🔧 Scripts

```powershell
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## 🚀 Deploy lên Vercel

### Cách 1: Qua Vercel CLI

```powershell
# Cài Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Cách 2: Qua Vercel Dashboard

1. Push code lên GitHub
2. Truy cập [vercel.com](https://vercel.com)
3. Import repository
4. Thêm Environment Variables từ `.env.local`
5. Deploy!

**Lưu ý:** Nhớ cập nhật `NEXT_PUBLIC_BASE_URL` trong Environment Variables trên Vercel với domain thực của bạn.

## 🐛 Xử Lý Lỗi Thường Gặp

### 1. Lỗi Gemini API

**Hiện tượng:** "Không thể tạo lời chúc"

**Giải pháp:**
- Kiểm tra `GEMINI_API_KEY` trong `.env.local`
- Xác nhận API key còn hạn sử dụng
- Kiểm tra quota API tại [Google AI Studio](https://aistudio.google.com)

### 2. Lỗi Firebase

**Hiện tượng:** "Cannot find module 'firebase/app'"

**Giải pháp:**
```powershell
npm install firebase
```

**Hiện tượng:** "Permission denied"

**Giải pháp:**
- Vào Firebase Console → Firestore Database → Rules
- Cập nhật rules (chế độ test):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;  // Chỉ dùng cho test!
    }
  }
}
```

### 3. Lỗi TypeScript

**Hiện tượng:** "Cannot find module 'next' or its corresponding type declarations"

**Giải pháp:**
```powershell
# Xóa node_modules và cài lại
Remove-Item -Recurse -Force node_modules
npm install
```

## 🎯 Roadmap & Tính Năng Tương Lai

- [ ] Upload ảnh tùy chỉnh cho từng lời chúc
- [ ] Nhiều theme màu sắc hơn
- [ ] Âm nhạc nền cho từng dịp lễ
- [ ] Export lời chúc thành ảnh/PDF
- [ ] Dashboard quản lý lời chúc đã tạo
- [ ] Authentication với Firebase Auth
- [ ] Tùy chỉnh font chữ
- [ ] Thêm sticker và emoji tùy chỉnh

## 📄 License

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại

## 👨‍💻 Tác Giả

Dự án mẫu - Trang Web Chúc Mừng Cá Nhân Hóa

## 🙏 Credits

- **Google Gemini** - AI text generation
- **Firebase** - Database & Hosting
- **Vercel** - Deployment platform
- **Tailwind CSS** - Styling framework
- **Next.js** - React framework

---

**Chúc bạn tạo được những lời chúc ý nghĩa! 🎉✨**
#   G r e e t i n g W e b  
 