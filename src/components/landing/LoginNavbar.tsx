"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { House } from "lucide-react";

export default function LoginNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const textColor = isScrolled ? "#000000" : "#ffffff";
    const bgColor = isScrolled ? "#ffffff" : "var(--bs-primary)"; // Using primary color for initial non-scrolled state to make text visible

    return (
        <nav
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                width: "100%",
                padding: "15px 0",
                backgroundColor: bgColor,
                boxShadow: isScrolled ? "0px 0 18px rgba(0, 0, 0, 0.1)" : "none",
                zIndex: 1030,
                transition: "all 0.5s",
            }}
        >
            <div className="container d-flex justify-content-between align-items-center">
                {/* Logo / Site Title */}
                <Link href="/" className="text-decoration-none d-flex align-items-center gap-2">
                    <span
                        className="fw-bold"
                        style={{
                            fontSize: "22px",
                            color: textColor,
                            transition: "color 0.3s",
                        }}
                    >
                        หจก.เอส แอล คอนกรีต
                    </span>
                </Link>

                {/* Action Buttons */}
                <div className="d-flex gap-2">
                    <Link
                        href="/"
                        className="btn d-flex align-items-center gap-2"
                        style={{
                            color: isScrolled ? "var(--bs-primary)" : "#ffffff",
                            backgroundColor: isScrolled ? "rgba(var(--bs-primary-rgb), 0.1)" : "rgba(255,255,255,0.2)",
                            fontWeight: 500,
                            padding: "8px 20px",
                            borderRadius: "50px",
                            transition: "all 0.3s",
                            border: "none",
                        }}
                    >
                        <House size={18} />
                        หน้าแรก
                    </Link>
                    <Link
                        href="/admin/dashboard"
                        className="btn d-flex align-items-center gap-2"
                        style={{
                            color: isScrolled ? "var(--bs-primary)" : "#ffffff",
                            backgroundColor: isScrolled ? "rgba(var(--bs-primary-rgb), 0.1)" : "rgba(255,255,255,0.2)",
                            fontWeight: 500,
                            padding: "8px 20px",
                            borderRadius: "50px",
                            transition: "all 0.3s",
                            border: "none",
                        }}
                    >
                        แดชบอร์ด
                    </Link>
                </div>
            </div>
        </nav>
    );
}
