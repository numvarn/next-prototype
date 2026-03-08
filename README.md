# 🏗️ Prototype (SL Concrete Web Portal & Admin Dashboard)

เอกสารสำหรับทำความเข้าใจสถาปัตยกรรม โครงสร้าง และรายละเอียดต่าง ๆ ของโปรเจค เพื่อนำไปใช้เป็นข้อมูลประกอบในการจัดทำ **Infographic** เชิงเทคนิค

---

## 1. ภาพรวมโปรเจค (Project Overview)
โปรเจคนี้คือระบบ Web Application แบบ Full-stack สำหรับ **SL Concrete** ซึ่งประกอบไปด้วย 2 ส่วนหลักคือ:
1. **Landing Page:** เว็บไซต์แวะชมสำหรับลูกค้า แสดงรายละเอียดสินค้าและบริการของ SL Concrete
2. **Admin Dashboard & Management:** ระบบหลังบ้านสำหรับจัดการผู้ใช้งาน (User Management) และดูภาพรวมของระบบ รองรับการตรวจสอบสิทธิ์ (Authentication) ตามระดับของผู้ใช้

---

## 2. เครื่องมือและสถาปัตยกรรมชั้นนำ (Tech Stack & Architecture)
โปรเจคนี้ถูกพัฒนาด้วยเทคโนโลยีที่ทันสมัยเพื่อเน้นประสิทธิภาพและความปลอดภัยระดับสูง:

*   **Core Framework:** `Next.js 16` (App Router) + `React 19`
*   **Language:** `TypeScript`
*   **Database & ORM:** `PostgreSQL` ควบคู่กับ `Prisma ORM` (เวอร์ชัน 6)
*   **Authentication & Security:** `NextAuth.js` (สำหรับจัดการ Session และ Login) และ `bcryptjs` (สำหรับการเข้ารหัสรหัสผ่าน)
*   **UI & Styling:** `Bootstrap 5`, CSS Modules, `globals.css`
*   **Animation & Icons:** `Framer Motion` (เพิ่มลูกเล่นแอนิเมชันให้ UI) และ `Lucide React`
*   **UX/Alerts:** `SweetAlert2` (สำหรับหน้าต่างแจ้งเตือนและยืนยันการทำงานที่สวยงาม)

---

## 3. ฟีเจอร์และระบบการทำงานหลัก (Key Features)

### 🌟 ส่วนหน้าบ้าน (Landing / Customer Web)
*   **Hero & Service Sections:** นำเสนอสินค้าอย่างเช่น คอนกรีตผสมเสร็จ
*   **About & Contact:** ข้อมูลติดต่อที่ทันสมัยพร้อมแสดงที่ตั้งและแผนที่ของ SL Concrete
*   **Responsive Web Design:** แสดงผลได้สวยงามทั้งบนมือถือและคอมพิวเตอร์

### 🔐 ระบบจัดการและหลังบ้าน (Admin Dashboard)
*   **Secure Authentication / Login:** ระบบเข้าสู่ระบบที่ปลอดภัย มีหน้าตาผูกกับ Theme หลัก
*   **Role-Based Access Control:** สิทธิ์ผู้ใช้งาน 3 ระดับ (`Admin`, `Staff`, `User`)
*   **User Management (CRUD):** เพิ่ม, ลบ, แก้ไข, อัปเดตข้อมูลพนักงานและผู้ใช้งาน พร้อมระบบค้นหาและ Filter 
*   **Confirmation & Reset Flow:** ระบบยืนยันก่อนลบ หรือ ยืนยันก่อนทำ Filter เพื่อความแม่นยำในการใช้งาน

---

## 4. โครงสร้างโปรเจค (Project Structure)
โครงสร้างของแอปพลิเคชันถูกออกแบบในลักษณะ **Modular & App Router** แยกสัดส่วนอย่างชัดเจน:

```text
📦 prototype/
├── 📂 prisma/                  # การตั้งค่าฐานข้อมูล (Database)
│   ├── schema.prisma           # โครงสร้างตารางต่างๆ ในรูป Prisma
│   └── seed.js                 # Script สำหรับสร้างข้อมูลเริ่มต้น (Mock data)
├── 📂 public/                  # ไฟล์รูปภาพ (Assets), ไอคอน และไฟล์ Static ต่างๆ
└── 📂 src/        
    ├── 📂 app/                 # ✨ ระบบ Routing หลัก (Next.js App Router)
    │   ├── 📂 api/             # Backend API Routes (REST endpoints)
    │   ├── 📂 admin/           # หน้า Dashboard และหน้า User Management
    │   ├── 📂 login/           # หน้าต่าง Authentication & Login UI
    │   ├── 📂 about/           # หน้าเกี่ยวกับเรา (SL Concrete)
    │   └── 📂 contact/         # หน้าข้อมูลติดต่อกลับ
    │
    └── 📂 components/          # ✨ ชิ้นส่วน UI (Reusable Components)
        ├── 📂 admin/           # (เช่น AdminNavbar, AdminSidebar)
        ├── 📂 landing/         # (เช่น HeroSection, ServiceSection, LandingNavbar)
        └── 📂 layout/          # โครงสร้างร่วม (เช่น BootstrapClient, NextAuthProvider)
```

---

## 5. สถาปัตยกรรมฐานข้อมูล (Database Schema)
ฐานข้อมูลประกอบด้วย 2 ตารางหลัก (Models) ที่มีความสัมพันธ์แบบ 1-to-1 (One-to-One):

### 👤 Model: `User` (บัญชีผู้ใช้งาน)
เก็บข้อมูลสำคัญที่ใช้ในการเข้าระบบและจัดการสิทธิ์
*   `id` (UUID) - รหัสผู้ใช้
*   `username` (String) - ชื่อบัญชีสำหรับเข้าสู่ระบบ
*   `password` (String) - รหัสผ่าน (ผ่านการ Hash)
*   `role` (Enum) - ระดับผู้ใช้งาน (`Admin`, `Staff`, `User`)

### 📝 Model: `Profile` (ข้อมูลส่วนตัว)
เก็บข้อมูลรายละเอียดของแต่ละผู้ใช้งาน
*   `id` (UUID) - รหัสโปรไฟล์
*   `userId` (UUID) - Foreign Key เชื่อมไปยัง `User`
*   `firstName` (String) - ชื่อจริง
*   `lastName` (String) - นามสกุล
*   `phone` (String) - เบอร์โทรศัพท์

---

## 6. การติดตั้งและเริ่มต้นใช้งาน (Getting Started)

สำหรับนักพัฒนาที่จะทำการดาวน์โหลดโปรเจคไปพัฒนาต่อ:

1. **ติดตั้ง Dependencies:**
   ```bash
   npm install
   ```

2. **ตั้งค่า Database & Prisma:** (ต้องมีไฟล์ `.env` ที่กำหนด `DATABASE_URL`)
   ```bash
   npx prisma generate
   npx prisma db push
   # หากมีตัว Seeder ข้อมูลเริ่มต้นให้รัน: npm run prisma:seed
   ```

3. **รัน Local Development Server:**
   ```bash
   npm run dev
   ```
   จากนั้นเข้าไปดูผลลัพธ์ที่ `http://localhost:3000`

---
*ข้อมูลนี้ออกแบบมาให้เหมาะกับการนำหัวข้อและ Bullet Points ไปวางในโปรแกรมสร้าง Infographic โดยตรง เพื่อให้ได้ภาพรวมสถาปัตยกรรมองค์กรที่ชัดเจนและเป็นมืออาชีพ*
