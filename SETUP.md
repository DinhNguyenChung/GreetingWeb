# 🚀 HƯỚNG DẪN SETUP NHANH

## Bước 1: Cài đặt Dependencies ✅
```powershell
npm install
```
**Đã hoàn thành!** ✓

---

## Bước 2: Lấy Gemini API Key

### Option 1: Google AI Studio (KHUYẾN NGHỊ - MIỄN PHÍ)
1. Truy cập: https://aistudio.google.com/app/apikey
2. Đăng nhập Google
3. Click **"Create API Key"**
4. Copy API key

### Option 2: Google Cloud Console
1. Truy cập: https://console.cloud.google.com/
2. Tạo project mới
3. Enable **Generative Language API**
4. Tạo credentials → API key

---

## Bước 3: Setup Firebase

1. **Truy cập Firebase Console:**
   - URL: https://console.firebase.google.com/

2. **Tạo Project:**
   - Click **"Add project"**
   - Tên project: `greeting-card-app` (hoặc tên bạn thích)
   - Bật/tắt Google Analytics (tùy chọn)
   - Click **"Create project"**

3. **Đăng ký Web App:**
   - Vào Project → Click icon **</>** (Web)
   - Đặt nickname: `Greeting Card Web`
   - Click **"Register app"**
   - **COPY TẤT CẢ CONFIG** hiện ra!

4. **Tạo Firestore Database:**
   - Sidebar → **Firestore Database**
   - Click **"Create database"**
   - Chọn location: `asia-southeast1` (Singapore)
   - Chọn **"Start in test mode"** (cho development)
   - Click **"Create"**

5. **Cấu hình Rules (Quan trọng!):**
   - Vào tab **Rules**
   - Paste code sau:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /greetings/{greetingId} {
         allow read: if true;
         allow write: if true;
       }
     }
   }
   ```
   - Click **"Publish"**

---

## Bước 4: Cập nhật Environment Variables

Mở file `.env.local` và điền thông tin:

```env
# 1. Paste Gemini API Key từ Bước 2
GEMINI_API_KEY=AIzaSy...your_actual_key

# 2. Paste Firebase Config từ Bước 3
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123def456

# 3. Base URL (giữ nguyên cho development)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## Bước 5: Chạy Development Server

```powershell
npm run dev
```

Truy cập: **http://localhost:3000**

---

## ✅ CHECKLIST

- [ ] Đã cài npm install
- [ ] Đã có Gemini API Key
- [ ] Đã tạo Firebase project
- [ ] Đã tạo Firestore Database
- [ ] Đã cấu hình Firestore Rules
- [ ] Đã cập nhật `.env.local`
- [ ] Đã chạy `npm run dev`
- [ ] Website đang chạy tại localhost:3000

---

## 🐛 LỖI THƯỜNG GẶP

### 1. "Cannot find module 'firebase/app'"
```powershell
npm install firebase
```

### 2. "GEMINI_API_KEY is not defined"
- Kiểm tra file `.env.local` có tồn tại không
- Kiểm tra tên biến có đúng không
- Restart dev server: `npm run dev`

### 3. "Permission denied" khi lưu Firestore
- Kiểm tra Firestore Rules (Bước 3.5)
- Đảm bảo Rules đã publish

### 4. QR Code không hiển thị
- Kiểm tra `NEXT_PUBLIC_BASE_URL` trong `.env.local`
- Clear cache và reload trang

---

## 📞 Support

Nếu gặp vấn đề, kiểm tra:
1. Console log trong browser (F12)
2. Terminal output
3. README.md để biết thêm chi tiết

**Chúc bạn thành công! 🎉**
