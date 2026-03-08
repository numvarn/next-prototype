"use client";

import Link from "next/link";
import { LogOut, Home } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminNavbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top px-3">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" href="/admin/dashboard">
                    <div className="bg-primary rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                        <span className="text-white small">SL</span>
                    </div>
                    <span>Admin Dashboard</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#adminNavbarNav"
                    aria-controls="adminNavbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="adminNavbarNav">
                    <ul className="navbar-nav ms-auto align-items-center gap-2">
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center gap-2" href="/">
                                <Home size={18} />
                                <span>หน้าหลัก</span>
                            </Link>
                        </li>
                        <li className="nav-item ms-lg-3">
                            <button onClick={() => signOut({ callbackUrl: '/login' })} className="btn btn-outline-light btn-sm d-flex align-items-center gap-2 rounded-pill px-3">
                                <LogOut size={16} />
                                <span>ออกจากระบบ</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
