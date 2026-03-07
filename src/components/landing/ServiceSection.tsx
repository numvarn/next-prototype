"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ServiceSection() {
    const products = [
        {
            title: "คอนกรีตผสมเสร็จ",
            desc: "มาตรฐานสูงสำหรับงานเทพื้น เทคาน โครงสร้างต่างๆ",
            imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2668&auto=format&fit=crop", // concrete pouring
        },
        {
            title: "แผ่นพื้นสำเร็จรูป",
            desc: "แผ่นพื้นแบบกลวง (Hollow Core) และแบบท้องเรียบ (Solid Plank)",
            imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2787&auto=format&fit=crop", // concrete slab/structure
        },
        {
            title: "ท่อคอนกรีต คสล.",
            desc: "ท่อระบายน้ำ ท่อคสล. ทุกขนาดมาตรฐานและรับน้ำหนักได้สูง",
            imageUrl: "https://images.unsplash.com/photo-1584464457692-73a74bf08c4e?q=80&w=2670&auto=format&fit=crop", // concrete pipes
        },
        {
            title: "เสาเข็มอัดแรง",
            desc: "เสาเข็มคอนกรีตอัดแรง พร้อมบริการปั้นจั่นตอกเสาเข็ม",
            imageUrl: "https://images.unsplash.com/photo-1541888081696-6e8dd1c4d926?q=80&w=2670&auto=format&fit=crop", // construction site/pillars
        },
        {
            title: "รั้วสำเร็จรูป/บ่อพัก",
            desc: "งานรั้วคสล. และบ่อพักน้ำขนาดมาตรฐาน สำหรับทุกโครงการ",
            imageUrl: "https://images.unsplash.com/photo-1506509657064-a63459c5a175?q=80&w=2670&auto=format&fit=crop", // concrete wall/fence
        },
        {
            title: "บริการเครื่องจักร",
            desc: "บริการให้เช่ารถโม่ผสมคอนกรีต, รถเครน, รถแบคโฮ, และรถตัก",
            imageUrl: "https://images.unsplash.com/photo-1579541094709-644cb3f9e9d1?q=80&w=2670&auto=format&fit=crop", // construction machinery
        },
    ];

    return (
        <section id="services" className="position-relative" style={{ padding: "100px 0" }}>
            <div className="container">
                <div className="row justify-content-center text-center mb-5">
                    <div className="col-lg-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="section-title h1 fw-bold text-dark mb-4">
                                สินค้าและบริการของเรา
                            </h2>
                            <p className="lead text-muted lh-lg">
                                เราให้บริการผลิตภัณฑ์คอนกรีตที่ได้มาตรฐานอุตสาหกรรม (ม.อ.ก.) ครอบคลุมทุกความต้องการของงานก่อสร้าง
                                พร้อมบริการจัดส่งด้วยเครื่องจักรที่ทันสมัย
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div className="row g-4 mt-2">
                    {products.map((product, index) => (
                        <div className="col-md-6 col-lg-4" key={index}>
                            <motion.div
                                className="card h-100 border-0 shadow-sm overflow-hidden group hover-shadow-lg transition-all"
                                style={{ borderRadius: "1rem" }}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                            >
                                <div
                                    className="position-relative overflow-hidden bg-light"
                                    style={{ height: "240px" }}
                                >
                                    <motion.div
                                        className="w-100 h-100"
                                        style={{
                                            backgroundImage: `url('${product.imageUrl}')`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                    {/* Overlay gradient */}
                                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6) 100%)" }}></div>

                                    <h3 className="h4 position-absolute bottom-0 start-0 m-0 p-4 text-white fw-bold z-1">{product.title}</h3>
                                </div>
                                <div className="card-body p-4 d-flex flex-column bg-white">
                                    <p className="card-text text-muted mb-4">{product.desc}</p>
                                    <div className="mt-auto">
                                        <a href="#contact" className="text-primary text-decoration-none fw-semibold d-inline-flex align-items-center gap-2 group-hover:text-primary-dark transition-colors">
                                            ติดต่อขอใบเสนอราคา <ArrowRight size={16} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
