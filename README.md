# 🎂 Trang Web Chúc Mừng Sinh Nhật Cô Đỗ Thị Phương Uyên

## Mô tả

Single Page Application chúc mừng sinh nhật cô Đỗ Thị Phương Uyên — cố vấn học tập ATTT2025.3. Trang web vui tươi, sinh động với lời chúc từ các bạn trong lớp, hiệu ứng hoạt hình cute, và gallery ảnh slider đẹp mắt.

## User Review Required

> [!IMPORTANT]
> **Google Sheets API Key**: Bạn sẽ cần tạo API key từ Google Cloud Console và share spreadsheet dưới dạng "Anyone with link". Mình sẽ để sẵn template, bạn chỉ cần điền vào `.env`.

> [!IMPORTANT]
> **Ảnh của cô**: Mình sẽ tạo 10 placeholder images. Bạn thay thế file ảnh thật sau trong thư mục `public/photos/`.

---

## Tech Stack

| Công nghệ | Lý do chọn |
|-----------|------------|
| **React 19** | Yêu cầu của bạn |
| **Vite** | Build nhanh, HMR tốt, deploy Vercel dễ |
| **Tailwind CSS v4** | CSS-first config, Oxide engine, `@theme` directive |
| **Swiper.js** | Carousel 3D Coverflow + blur effect, production-ready |
| **Google Sheets API v4** | Sync trực tiếp từ Google Form responses |

---

## Thiết kế tổng quan

### 🎨 Color Palette (Hồng Pastel + Vàng)

| Token | Màu | Dùng cho |
|-------|-----|----------|
| `--color-bg` | `#FFF5F7` | Background chính (hồng rất nhạt) |
| `--color-primary` | `#FF85A2` | Headings, accents, trái tim |
| `--color-secondary` | `#FFD166` | Highlights, badges, ngôi sao |
| `--color-accent` | `#FF6B8A` | CTA, hover effects |
| `--color-warm` | `#FFC8DD` | Cards background |
| `--color-text` | `#4A3728` | Text chính (nâu ấm) |
| `--color-text-light` | `#8B7355` | Text phụ |
| `--color-white` | `#FFFFFF` | Card surfaces |

### 🔤 Typography

| Element | Font | Weight |
|---------|------|--------|
| Display/Heading | **Pacifico** (cursive) | 400 |
| Body/UI | **Nunito** (sans-serif) | 400, 600, 700 |

### 📐 Layout — Single Page Sections

```
┌─────────────────────────────────────────┐
│  🎊 HERO SECTION                        │
│  - Tên cô + "Happy Birthday!"          │
│  - Confetti animation                   │
│  - Floating hearts                      │
│  - Hiệu ứng typing cho lời chúc chính  │
├─────────────────────────────────────────┤
│  📷 PHOTO GALLERY                       │
│  - Swiper 3D Coverflow                  │
│  - Ảnh giữa rõ nét, hai bên blur+scale │
│  - Auto-play + swipe gesture            │
├─────────────────────────────────────────┤
│  💌 WISHES SECTION                      │
│  - Cards masonry layout                 │
│  - Mỗi card: tên + lời chúc            │
│  - Staggered fade-in animation          │
│  - Random cute emoji trên mỗi card      │
├─────────────────────────────────────────┤
│  🎀 FOOTER                             │
│  - "With love from ATTT2025.3 ❤️"       │
│  - Kawaii decoration                    │
└─────────────────────────────────────────┘
```

---

## Proposed Changes

### Core Setup

#### [NEW] `package.json` + Vite config
- Khởi tạo project React 19 + Vite
- Dependencies: `react`, `react-dom`, `swiper`
- Dev dependencies: `vite`, `@vitejs/plugin-react`

#### [NEW] `.env.example`
```
VITE_GOOGLE_SHEETS_API_KEY=your_api_key_here
VITE_GOOGLE_SHEETS_ID=your_spreadsheet_id_here
VITE_GOOGLE_SHEETS_RANGE=Sheet1!A:B
```

---

### Styles

#### [NEW] `src/index.css`
- Tailwind v4 `@import "tailwindcss"`
- `@theme` block: color tokens, font families (Pacifico + Nunito), custom spacing
- Custom `@keyframes`: `float-heart`, `confetti-fall`, `fadeInUp`, `sparkle`, `bounce-in`
- `@utility` directives cho custom animations
- Google Fonts import via `@import url()`

---

### Components

#### [NEW] `src/App.jsx`
- Root component, tổ hợp tất cả sections
- Intersection Observer cho scroll animations

#### [NEW] `src/components/HeroSection.jsx`
- **Confetti effect**: Nhiều confetti particles rơi từ trên xuống (CSS animation)
- **Floating hearts**: 15-20 trái tim bay lên với random size, position, speed
- **Title**: "Happy Birthday" với font Pacifico + gradient shimmer effect
- **Subtitle**: "Cô Đỗ Thị Phương Uyên" với typing animation
- **Badge**: "Cố vấn học tập ATTT2025.3"
- **Kawaii stars/sparkles**: Các ngôi sao nhỏ lấp lánh

#### [NEW] `src/components/PhotoGallery.jsx`
- **Swiper.js** với effect `coverflow`
- `slidesPerView: 3` (desktop), `1.5` (mobile)
- Active slide: `scale(1)`, `filter: none`, `z-index: 2`
- Inactive slides: `scale(0.85)`, `filter: blur(3px)`, `opacity: 0.6`
- Pagination dots + Navigation arrows (styled cute)
- Auto-play mỗi 3 giây
- Loop infinite

#### [NEW] `src/components/WishesSection.jsx`
- Fetch data từ Google Sheets API
- Loading state với cute bouncing dots
- Masonry-like grid layout (CSS columns)
- Mỗi WishCard: tên người gửi + lời chúc + random emoji
- Staggered animation khi scroll vào view

#### [NEW] `src/components/WishCard.jsx`
- Card với rounded corners, soft shadow
- Background gradient nhẹ (hồng → trắng)
- Hover effect: lift up + glow
- Random cute emoji decorator (🌸🎀💝🌷🎂🧁🎈)
- Tên người gửi bold ở dưới

#### [NEW] `src/components/FloatingHearts.jsx`
- Component tạo N trái tim floating
- Random: size (15-40px), position (left 0-100%), duration (6-15s), delay
- CSS animation: di chuyển lên + lắc ngang + fade out
- SVG hearts hoặc emoji ❤️💖💗

#### [NEW] `src/components/ConfettiEffect.jsx`
- 50+ particles confetti rơi từ trên
- Random: màu (hồng, vàng, trắng, coral), hình dạng, rotation
- CSS-only animation (`@keyframes confetti-fall`)
- Tự động chạy khi load trang

#### [NEW] `src/components/Footer.jsx`
- Message "With love from ATTT2025.3 ❤️"
- Wave decoration border phía trên
- Năm hiện tại

---

### Data Layer

#### [NEW] `src/services/googleSheets.js`
- Function `fetchWishes()`: gọi Google Sheets API v4
- Parse response: extract `[tên, lời chúc]` từ `values` array
- Error handling + fallback data (sample wishes)
- Caching: lưu vào `sessionStorage` để không gọi API lại

#### [NEW] `src/data/sampleWishes.js`
- Fallback data khi chưa có API key hoặc API lỗi
- 5-6 lời chúc mẫu để demo

---

### Assets

#### [NEW] `public/photos/photo-1.jpg` → `photo-10.jpg`
- 10 placeholder images (sẽ dùng generate_image tạo cute placeholder)

---

## Hiệu ứng đặc biệt (Chi tiết)

### 1. Floating Hearts 💖
```
- 20 trái tim SVG với gradient hồng-đỏ
- Animation: translateY(-100vh) + sway left-right (sin wave)
- Random delay 0-10s, duration 8-15s
- Infinite loop
```

### 2. Confetti Rain 🎊
```
- 60 particles với 5 màu pastel
- Hình: tròn, vuông, hình chữ nhật
- Animation: rơi + xoay 3D
- Chỉ chạy 5-8 giây khi load (không loop infinite)
```

### 3. Photo Coverflow 📸
```
- Swiper coverflow effect
- perspective: 1200px
- rotate: 50deg, depth: 100
- Stretch: 0, modifier: 1
- Slide active: sharp, bright
- Slides khác: blur(3px) + scale(0.85) + opacity(0.6)
```

### 4. Wish Cards Entrance ✨
```
- Intersection Observer trigger
- Staggered: mỗi card delay += 100ms
- Animation: translateY(40px) + opacity(0) → translateY(0) + opacity(1)
- Easing: cubic-bezier(0.34, 1.56, 0.64, 1) (bouncy)
```

### 5. Sparkle Stars ⭐
```
- Các ngôi sao nhỏ lấp lánh quanh title
- Scale 0→1→0 + opacity animation
- Random position quanh heading
```

---

## Cấu trúc thư mục

```
formchucmungsinhnhatco/
├── public/
│   ├── photos/
│   │   ├── photo-1.jpg
│   │   ├── photo-2.jpg
│   │   └── ... (10 photos)
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── HeroSection.jsx
│   │   ├── PhotoGallery.jsx
│   │   ├── WishesSection.jsx
│   │   ├── WishCard.jsx
│   │   ├── FloatingHearts.jsx
│   │   ├── ConfettiEffect.jsx
│   │   └── Footer.jsx
│   ├── services/
│   │   └── googleSheets.js
│   ├── data/
│   │   └── sampleWishes.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env.example
├── index.html
├── vite.config.js
└── package.json
```

---

## Verification Plan

### Automated Tests
- `npm run dev` → kiểm tra trang chạy không lỗi
- `npm run build` → kiểm tra build production thành công

### Manual Verification
- Mở trình duyệt → kiểm tra:
  - ✅ Hero section với confetti + hearts animation
  - ✅ Photo gallery swipe + blur effect
  - ✅ Wishes cards hiển thị (fallback data)
  - ✅ Responsive trên mobile
  - ✅ Smooth scroll giữa các sections

### Deploy
- Push lên GitHub → connect Vercel → auto deploy
- Thêm env variables trên Vercel dashboard

---

## Open Questions

> [!NOTE]
> Không có câu hỏi mở nào. Tất cả requirements đã rõ ràng. Bạn hãy review plan và confirm để mình bắt tay vào code! 🚀
