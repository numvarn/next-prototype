"use client";

import { useState } from "react";
import LoginNavbar from "@/components/landing/LoginNavbar";
import Footer from "@/components/landing/Footer";
import { Mail, Lock, LogIn, CheckCircle2, Circle, ArrowRight } from "lucide-react";

export default function LoginPage() {
    const [loginLoading, setLoginLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoginLoading(true);
        // Simulate login delay
        setTimeout(() => {
            setLoginLoading(false);
            // In a real app, successful login logic would be here
        }, 1500);
    };

    // Dummy tasks data
    const tasks = [
        { id: 1, text: "ตรวจสอบสต็อกปูนซีเมนต์ประจำสัปดาห์", completed: true },
        { id: 2, text: "ยืนยันออเดอร์จัดส่งคอนกรีตผสมเสร็จ ไซต์งาน A", completed: false },
        { id: 3, text: "สรุปยอดขายประจำเดือน", completed: false },
        { id: 4, text: "ประสานงานทีมช่างซ่อมบำรุงรถโม่ปูน", completed: false },
    ];

    return (
        <>
            <main
                style={{
                    minHeight: "100vh",
                    backgroundColor: "#f8f9fa",
                    paddingTop: "100px", // space for navbar
                    paddingBottom: "50px",
                }}
            >
                <LoginNavbar />

                <div className="container">
                    <div className="row justify-content-center align-items-stretch g-4 mt-3">

                        {/* Login Form Section */}
                        <div className="col-lg-5 col-md-8">
                            <div className="card shadow-sm border-0 h-100" style={{ borderRadius: "12px" }}>
                                <div className="card-body p-4 p-md-5">
                                    <div className="text-center mb-4">
                                        <div
                                            className="d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-circle mb-3"
                                            style={{ width: "60px", height: "60px" }}
                                        >
                                            <LogIn size={28} />
                                        </div>
                                        <h2 className="fw-bold">เข้าสู่ระบบ</h2>
                                        <p className="text-muted">เข้าสู่ระบบเพื่อจัดการระบบของหจก.เอส แอล คอนกรีต</p>
                                    </div>

                                    <form onSubmit={handleLogin}>
                                        <div className="mb-4">
                                            <label className="form-label fw-medium">อีเมล</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    <Mail size={18} className="text-muted" />
                                                </span>
                                                <input
                                                    type="email"
                                                    className="form-control border-start-0 ps-0"
                                                    placeholder="กรอกอีเมลของคุณ"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <label className="form-label fw-medium mb-0">รหัสผ่าน</label>
                                                <a href="#" className="text-decoration-none small text-primary">ลืมรหัสผ่าน?</a>
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    <Lock size={18} className="text-muted" />
                                                </span>
                                                <input
                                                    type="password"
                                                    className="form-control border-start-0 ps-0"
                                                    placeholder="กรอกรหัสผ่านของคุณ"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4 form-check">
                                            <input type="checkbox" className="form-check-input" id="rememberMe" />
                                            <label className="form-check-label text-muted" htmlFor="rememberMe">จดจำฉันไว้ในระบบ</label>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100 py-2 d-flex justify-content-center align-items-center gap-2"
                                            disabled={loginLoading}
                                            style={{ borderRadius: "8px" }}
                                        >
                                            {loginLoading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    กำลังเข้าสู่ระบบ...
                                                </>
                                            ) : (
                                                <>
                                                    เข้าสู่ระบบ <ArrowRight size={18} />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Todo List Section */}
                        <div className="col-lg-5 col-md-8">
                            <div className="card shadow-sm border-0 h-100 bg-white" style={{ borderRadius: "12px" }}>
                                <div className="card-body p-4 p-md-5">
                                    <h3 className="fw-bold mb-4" style={{ color: "var(--bs-primary)" }}>
                                        รายการสิ่งที่ต้องทำ
                                    </h3>
                                    <p className="text-muted mb-4">
                                        ภาพรวมรายการงานของคุณประจำวันนี้
                                    </p>

                                    <div className="d-flex flex-column gap-3">
                                        {tasks.map((task) => (
                                            <div
                                                key={task.id}
                                                className={`p-3 rounded-3 d-flex align-items-start gap-3 transition-all ${task.completed ? "bg-light text-muted" : "border border-primary border-opacity-25"
                                                    }`}
                                                style={{
                                                    backgroundColor: task.completed ? "" : "rgba(var(--bs-primary-rgb), 0.02)",
                                                }}
                                            >
                                                <div className="mt-1">
                                                    {task.completed ? (
                                                        <CheckCircle2 size={22} className="text-success" />
                                                    ) : (
                                                        <Circle size={22} className="text-primary" />
                                                    )}
                                                </div>
                                                <div className="flex-grow-1">
                                                    <span
                                                        className={`fw-medium ${task.completed ? "text-decoration-line-through" : ""}`}
                                                        style={{ fontSize: "15px" }}
                                                    >
                                                        {task.text}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                                <div className="card-footer bg-transparent border-top-0 p-4 pt-0">
                                    <div className="alert alert-info border-0 d-flex gap-2 mb-0" style={{ backgroundColor: "rgba(13, 202, 240, 0.1)", color: "#087990" }}>
                                        <div className="fw-semibold">💡 เคล็ดลับ:</div>
                                        <div className="small">เข้าสู่ระบบเพื่อจัดการและอัปเดตสถานะงานของคุณแบบเรียลไทม์</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
