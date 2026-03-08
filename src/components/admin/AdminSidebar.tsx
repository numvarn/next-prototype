"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
    LayoutDashboard,
    Users,
    Settings,
    Package,
    FileText,
    ChevronRight
} from "lucide-react";

const menuItems = [
    { label: "แดชบอร์ด", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "จัดการผู้ใช้งาน", href: "/admin/users", icon: Users },
    { label: "จัดการสินค้า", href: "/admin/products", icon: Package },
    { label: "รายงาน", href: "/admin/reports", icon: FileText },
    { label: "ตั้งค่าระบบ", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <aside className="bg-white border-end shadow-sm flex-shrink-0 d-flex flex-column" style={{ width: '280px', minHeight: 'calc(100vh - 60px)' }}>
            <div className="py-4">
                <div className="px-4 mb-4">
                    <small className="text-uppercase text-muted fw-bold ls-wider">เมนูหลัก</small>
                </div>
                <nav className="nav flex-column">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`nav-link px-4 py-3 d-flex align-items-center justify-content-between transition-all ${isActive
                                    ? "bg-light text-primary fw-bold border-start border-primary border-4"
                                    : "text-secondary hover-bg-light"
                                    }`}
                            >
                                <div className="d-flex align-items-center gap-3">
                                    <item.icon size={20} className={isActive ? "text-primary" : "text-muted"} />
                                    <span>{item.label}</span>
                                </div>
                                {isActive && <ChevronRight size={16} />}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-4 border-top">
                <div className="bg-light rounded p-3 d-flex align-items-center gap-3">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <span className="fw-bold">{session?.user?.username?.charAt(0).toUpperCase() || 'A'}</span>
                    </div>
                    <div>
                        <div className="fw-bold small">{session?.user?.username || 'Administrator'}</div>
                        <div className="text-muted extra-small">{session?.user?.role || 'admin@slconcrete.com'}</div>
                    </div>
                </div>
            </div>

        </aside>
    );
}
