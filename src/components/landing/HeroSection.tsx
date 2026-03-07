"use client";

import { motion } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";

export default function HeroSection() {
    return (
        <section
            id="hero"
            className="position-relative d-flex align-items-center justify-content-center min-vh-100 overflow-hidden text-white"
        >
            {/* Background Image & Overlay */}
            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=2670&auto=format&fit=crop')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "#d9d9d9",
                    zIndex: -2,
                }}
            ></div>
            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                    background: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,136,100,0.6) 100%)",
                    zIndex: -1,
                }}
            ></div>

            <div className="container position-relative z-1 pt-5">
                <div className="row align-items-center">
                    <div className="col-lg-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="badge bg-secondary mb-3 px-3 py-2 fs-6 rounded-pill">
                                ประสบกาณ์กว่า 20 ปี — ผลงานกว่า 1,000 โครงการ
                            </span>
                            <h1 className="display-4 fw-bold text-white mb-4 lh-sm">
                                ระดับแนวหน้าในเขต <br />
                                <span className="text-warning">จังหวัดศรีสะเกษ</span> <br />
                                และอีสานตอนใต้
                            </h1>
                            <p className="lead text-white opacity-75 mb-5 pe-lg-5" style={{ maxWidth: "600px" }}>
                                ขอต้อนรับทุกท่านเข้าสู่เว็บไซต์ หจก. เอส แอล คอนกรีต (SL Concrete)
                                ผู้ผลิตและจำหน่ายผลิตภัณฑ์คอนกรีตมาตรฐาน ม.อ.ก. รายใหญ่ที่สุดในจังหวัดศรีสะเกษ
                            </p>

                            <div className="d-flex flex-wrap gap-3">
                                <a href="#services" className="btn btn-primary btn-lg rounded-pill px-4 d-inline-flex align-items-center gap-2">
                                    ดูสินค้าและบริการ <ChevronRight size={20} />
                                </a>
                                <a href="#contact" className="btn btn-outline-light btn-lg rounded-pill px-4">
                                    ติดต่อเรา
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                className="position-absolute bottom-0 start-50 translate-middle-x mb-4 text-center cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <a href="#about" className="text-white text-decoration-none opacity-75 hover-opacity-100 d-flex flex-column align-items-center">
                    <small className="mb-2 text-uppercase tracking-wider">เลื่อนลง</small>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                        <ArrowDown size={24} />
                    </motion.div>
                </a>
            </motion.div>
        </section>
    );
}
