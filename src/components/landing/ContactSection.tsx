"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Facebook, Clock } from "lucide-react";

export default function ContactSection() {
    return (
        <section id="contact" className="bg-light position-relative" style={{ padding: "100px 0" }}>
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
                                ติดต่อเรา
                            </h2>
                            <p className="lead text-muted lh-lg">
                                เราพร้อมให้คำปรึกษาและบริการคุณอย่างเต็มที่ ติดต่อเราได้หลากหลายช่องทางด้านล่างนี้
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div className="row g-5 align-items-center">
                    {/* Contact Details */}
                    <div className="col-lg-6">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="d-flex flex-column gap-4"
                        >
                            <div className="d-flex align-items-start gap-3">
                                <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="h5 fw-bold mb-2">ที่อยู่</h4>
                                    <p className="text-muted mb-0">
                                        399 หมู่ 6 ตำบลโพนข่า<br />
                                        อำเภอเมือง จังหวัดศรีสะเกษ 33000<br />
                                        โดยนายพิศาล สุขขี
                                    </p>
                                </div>
                            </div>

                            <div className="d-flex align-items-start gap-3">
                                <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="h5 fw-bold mb-2">เบอร์โทรศัพท์</h4>
                                    <p className="text-muted mb-0">
                                        โทรศัพท์: 045-611-909, 045-613-333<br />
                                        แฟกซ์: 045-612-891<br />
                                        มือถือ: 0842982456
                                    </p>
                                </div>
                            </div>

                            <div className="d-flex align-items-start gap-3">
                                <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="h5 fw-bold mb-2">อีเมล</h4>
                                    <p className="text-muted mb-0 hover-text-primary transition-colors cursor-pointer">
                                        phisan.shukkhi@gmail.com
                                    </p>
                                </div>
                            </div>

                            <div className="d-flex align-items-start gap-3">
                                <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                                    <Facebook size={24} />
                                </div>
                                <div>
                                    <h4 className="h5 fw-bold mb-2">Facebook</h4>
                                    <p className="text-muted mb-0">
                                        เอส แอล คอนกรีต (SlConcrete)
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Map Image/Placeholder */}
                    <div className="col-lg-6">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="position-relative shadow-lg rounded-4 overflow-hidden"
                            style={{ paddingBottom: "75%", backgroundColor: "#e2e8f0" }}
                        >
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15444.664214436575!2d104.34028852958151!3d15.089748566970512!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3110e53a55ed9c09%3A0xe76e3cc7ef26db5e!2z4LmA4Lit4LiqIOC5geC4reC4pSDguITguK3guJnguIHguKPguLXguJU!5e0!3m2!1sth!2sth!4v1708412000000!5m2!1sth!2sth"
                                className="position-absolute top-0 start-0 w-100 h-100 border-0"
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="SL Concrete Map Location"
                            ></iframe>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
