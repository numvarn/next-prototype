"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import LoginNavbar from "@/components/landing/LoginNavbar";
import Footer from "@/components/landing/Footer";
import { Mail, Lock, LogIn, CheckCircle2, Circle, ArrowRight } from "lucide-react";

export default function LoginPage() {
    const [loginLoading, setLoginLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginLoading(true);
        setErrorMsg("");

        try {
            const res = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (res?.error) {
                setErrorMsg(res.error);
                setLoginLoading(false);
            } else {
                // Let middleware handle the routing by refreshing or pushing
                window.location.href = "/admin/dashboard"; // Let middleware intercept or reload
            }
        } catch (error) {
            setErrorMsg("เกิดข้อผิดพลาดในการลงชื่อเข้าใช้");
            setLoginLoading(false);
        }
    };

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

                                    {errorMsg && (
                                        <div className="alert alert-danger py-2 mb-4" role="alert">
                                            {errorMsg}
                                        </div>
                                    )}

                                    <form onSubmit={handleLogin}>
                                        <div className="mb-4">
                                            <label className="form-label fw-medium">ชื่อผู้ใช้งาน</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    <Mail size={18} className="text-muted" />
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg border-start-0 ps-0"
                                                    placeholder="กรอกชื่อผู้ใช้งานของคุณ"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <label className="form-label fw-medium mb-0">รหัสผ่าน</label>
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-end-0">
                                                    <Lock size={18} className="text-muted" />
                                                </span>
                                                <input
                                                    type="password"
                                                    className="form-control form-control-lg border-start-0 ps-0"
                                                    placeholder="กรอกรหัสผ่านของคุณ"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100 py-2 d-flex justify-content-center align-items-center gap-2 mt-4"
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
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
