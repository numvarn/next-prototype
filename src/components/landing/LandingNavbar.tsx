"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
    { name: "หน้าแรก", href: "#hero" },
    { name: "เกี่ยวกับเรา", href: "#about" },
    { name: "สินค้าและบริการ", href: "#services" },
    { name: "ติดต่อเรา", href: "#contact" },
];

export default function LandingNavbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = () => {
        setIsMobileMenuOpen(false);
    };

    const textColor = isScrolled ? "#000000" : "#ffffff";

    return (
        <>
            <nav
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    width: "100%",
                    padding: isScrolled ? "10px 0" : "15px 0",
                    backgroundColor: isScrolled ? "#ffffff" : "rgba(255, 255, 255, 0)",
                    boxShadow: isScrolled ? "0px 0 18px rgba(0, 0, 0, 0.1)" : "none",
                    zIndex: 1030,
                    transition: "all 0.5s",
                }}
            >
                <div className="container d-flex justify-content-between align-items-center">
                    {/* Logo */}
                    <Link href="#hero" className="text-decoration-none me-auto d-flex align-items-center gap-2">
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

                    {/* Desktop Menu */}
                    <div className="d-none d-lg-flex align-items-center" style={{ gap: 0 }}>
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={handleNavClick}
                                style={{
                                    color: textColor,
                                    padding: "18px 15px",
                                    fontSize: "16px",
                                    fontWeight: 400,
                                    textDecoration: "none",
                                    whiteSpace: "nowrap",
                                    transition: "color 0.3s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--bs-primary)")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = textColor)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="d-none d-lg-flex gap-2">
                        {session ? (
                            <>
                                {(session.user.role === 'Admin' || session.user.role === 'Staff') && (
                                    <Link
                                        href="/admin/dashboard"
                                        style={{
                                            color: "#fff",
                                            background: "var(--bs-primary)",
                                            fontSize: "14px",
                                            padding: "8px 20px",
                                            borderRadius: "4px",
                                            border: "none",
                                            cursor: "pointer",
                                            textDecoration: "none",
                                            transition: "0.3s",
                                        }}
                                    >
                                        แดชบอร์ด
                                    </Link>
                                )}
                                <button
                                    onClick={() => signOut()}
                                    style={{
                                        color: "#fff",
                                        background: "var(--bs-primary)",
                                        fontSize: "14px",
                                        padding: "8px 20px",
                                        borderRadius: "4px",
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "0.3s",
                                    }}
                                >
                                    ออกจากระบบ
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                style={{
                                    color: "#fff",
                                    background: "var(--bs-primary)",
                                    fontSize: "14px",
                                    padding: "8px 26px",
                                    borderRadius: "4px",
                                    textDecoration: "none",
                                    transition: "0.3s",
                                }}
                            >
                                เข้าสู่ระบบ
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="d-lg-none btn btn-link p-0 text-decoration-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X size={28} style={{ color: textColor, transition: "color 0.3s" }} />
                        ) : (
                            <Menu size={28} style={{ color: textColor, transition: "color 0.3s" }} />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                            position: "fixed",
                            top: "60px",
                            left: "20px",
                            right: "20px",
                            backgroundColor: "#ffffff",
                            borderRadius: "6px",
                            boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.1)",
                            zIndex: 1020,
                            padding: "10px 0",
                            overflow: "hidden",
                        }}
                        className="d-lg-none"
                    >
                        <div className="d-flex flex-column">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={handleNavClick}
                                    style={{
                                        color: "#000000",
                                        padding: "10px 20px",
                                        fontSize: "17px",
                                        fontWeight: 500,
                                        textDecoration: "none",
                                        transition: "color 0.3s",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--bs-primary)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "#000000")}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="d-flex flex-column gap-2" style={{ padding: "10px 20px" }}>
                                {session ? (
                                    <>
                                        {(session.user.role === 'Admin' || session.user.role === 'Staff') && (
                                            <Link
                                                href="/admin/dashboard"
                                                onClick={handleNavClick}
                                                className="btn btn-primary w-100"
                                            >
                                                แดชบอร์ด
                                            </Link>
                                        )}
                                        <button
                                            onClick={() => {
                                                handleNavClick();
                                                signOut();
                                            }}
                                            className="btn btn-primary w-100"
                                        >
                                            ออกจากระบบ
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        href="/login"
                                        onClick={handleNavClick}
                                        className="btn btn-primary w-100"
                                    >
                                        เข้าสู่ระบบ
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
