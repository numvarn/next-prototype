# AI Project Profile - SL Concrete Prototype

This profile provides instructions and context for AI systems working on the SL Concrete Prototype project.

## Project Overview
- **Name**: prototype (SL Concrete Prototype)
- **Purpose**: Landing page and management system for SL Concrete (Ready-mixed concrete).
- **Core Stack**: Next.js (App Router), React 19, TypeScript, Bootstrap 5.3, Framer Motion.
- **Language**: UI and most content are in **Thai**. Logic and code structure are in English.

## Architectural Guidelines
- **Framework**: Next.js 16 (App Router).
- **Components**: Located in `src/components`. Use functional components with TypeScript.
- **Styling**: Bootstrap 5.3 for layout and standard components. Custom CSS in `src/app/globals.css` or component-specific modules.
- **Animations**: Use Framer Motion for premium feel and smooth transitions.
- **Routing**: App Router (`src/app`).

## Development Standards
- **Component Design**: 
  - Prioritize "Visual Excellence" and "Premium Design".
  - Use vibrant colors and modern typography.
  - Avoid generic Bootstrap looks; customize with glassmorphism or sleek gradients.
- **TypeScript**: Always use strict typing. Avoid `any`.
- **Naming Conventions**: 
  - Components: PascalCase (e.g., `ServiceSection.tsx`).
  - Functions/Variables: camelCase.
  - Files: Match component name or purpose.

## คูมือการโต้ตอบของ AI (AI Interaction Guidelines)
- **ภาษาในการสื่อสาร**: AI ต้องใช้ **ภาษาไทย** ในการสื่อสารกับผู้พัฒนาในทุกช่องทาง
- **เอกสารประกอบการทำงาน**:
  - **Task List (todo list)**: ต้องเขียนเป็นภาษาไทยทั้งหมด
  - **Walkthrough**: ต้องอธิบายขั้นตอนและผลลัพธ์เป็นภาษาไทย
  - **Implementation Plan**: แผนการดำเนินการต้องเป็นภาษาไทย โดยสามารถใช้คำทับศัพท์ทางเทคนิคได้ตามความเหมาะสม
- **การตั้งค่า Context**: เมื่อเริ่มต้นงานใหม่ AI ควรอ้างอิงถึงข้อกำหนดในไฟล์นี้เสมอเพื่อให้มั่นใจว่าการสื่อสารเป็นไปตามที่กำหนด

## AI Specific Instructions
- **Text Content (UI)**: ข้อความที่แสดงผลบนหน้าจอผู้ใช้ (User Interface) ต้องเป็น **ภาษาไทย** ทั้งหมด
- **Code Comments**: คำอธิบายโค้ด (Comments) สามารถใช้ภาษาอังกฤษได้ในส่วนของ Logic แต่ในส่วนที่เกี่ยวข้องกับ UI หรือ Business Logic ที่สำคัญ ควรมีคำอธิบายเป็นภาษาไทยประกอบ
- **Placeholders**: ห้ามใช้ Placeholder โดยเด็ดขาด หากต้องการรูปภาพ ให้ใช้ tool `generate_image` เพื่อสร้างรูปภาพตัวอย่างจริง
- **Responsiveness**: ตรวจสอบให้แน่ใจว่าทุก Component รองรับการแสดงผลบนมือถือ (Mobile-friendly) โดยใช้ระบบ Grid ของ Bootstrap

## Key Files
- `src/app/page.tsx`: Home page.
- `src/components/Footer.tsx`: Main footer.
- `src/components/ServiceSection.tsx`: Core business offerings.
- `src/components/Navbar.tsx`: Navigation.

---
*Created by Antigravity AI*
