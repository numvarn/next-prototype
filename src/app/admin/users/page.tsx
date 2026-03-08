"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    CheckCircle2,
    XCircle,
    UserCircle
} from "lucide-react";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "Admin" | "Staff" | "User";
    status: "Active" | "Inactive";
    createdAt: string;
}

const mockUsers: User[] = [
    {
        id: "1",
        firstName: "สมชาย",
        lastName: "ใจดี",
        email: "somchai@example.com",
        role: "Admin",
        status: "Active",
        createdAt: "2024-03-01",
    },
    {
        id: "2",
        firstName: "สมหญิง",
        lastName: "รักเรียน",
        email: "somying@example.com",
        role: "Staff",
        status: "Active",
        createdAt: "2024-03-05",
    },
    {
        id: "3",
        firstName: "วิชัย",
        lastName: "กล้าหาญ",
        email: "wichai@example.com",
        role: "User",
        status: "Inactive",
        createdAt: "2024-03-07",
    },
];

export default function UserManagementPage() {
    const [users, setUsers] = useState<User[]>(mockUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "User" as User["role"],
    });

    const filteredUsers = users.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleOpenModal = (user: User | null = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: "", // Keep password empty when editing
                role: user.role,
            });
        } else {
            setEditingUser(null);
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                role: "User",
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingUser(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingUser) {
            setUsers(users.map(u => u.id === editingUser.id ? {
                ...u,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                role: formData.role
            } : u));
            Swal.fire({
                title: "อัปเดตสำเร็จ!",
                text: "ข้อมูลผู้ใช้งานได้รับการแก้ไขแล้ว",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
                background: "#ffffff",
                customClass: {
                    popup: 'shadow-sm border-0 rounded-4',
                }
            });
        } else {
            const newUser: User = {
                id: Math.random().toString(36).substr(2, 9),
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                role: formData.role,
                status: "Active",
                createdAt: new Date().toISOString().split('T')[0],
            };
            setUsers([...users, newUser]);
            Swal.fire({
                title: "สร้างสำเร็จ!",
                text: "เพิ่มผู้ใช้งานใหม่เรียบร้อยแล้ว",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
                background: "#ffffff",
                customClass: {
                    popup: 'shadow-sm border-0 rounded-4',
                }
            });
        }
        handleCloseModal();
    };

    const handleDelete = (id: string) => {
        Swal.fire({
            title: "ยืนยันการลบ?",
            text: "คุณต้องการลบผู้ใช้งานรายนี้ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "ยืนยันการลบ",
            cancelButtonText: "ยกเลิก",
            background: "#ffffff",
            customClass: {
                popup: 'shadow-sm border-0 rounded-4',
                confirmButton: 'rounded-pill px-4',
                cancelButton: 'rounded-pill px-4'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                setUsers(users.filter(u => u.id !== id));
                Swal.fire({
                    title: "ลบสำเร็จ!",
                    text: "ผู้ใช้งานถูกลบออกจากระบบแล้ว",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                    background: "#ffffff",
                    customClass: {
                        popup: 'shadow-sm border-0 rounded-4',
                    }
                });
            }
        });
    };

    const getRoleBadge = (role: string) => {
        switch (role) {
            case "Admin": return "bg-primary-subtle text-primary border border-primary-subtle";
            case "Staff": return "bg-success-subtle text-success border border-success-subtle";
            default: return "bg-secondary-subtle text-secondary border border-secondary-subtle";
        }
    };

    return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1">จัดการผู้ใช้งาน</h2>
                    <p className="text-muted small mb-0">ดูและจัดการรายชื่อผู้ใช้งานทั้งหมดในระบบ</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="btn btn-primary d-flex align-items-center gap-2 shadow-sm"
                >
                    <Plus size={20} />
                    <span>เพิ่มผู้ใช้งาน</span>
                </button>
            </div>

            <div className="card border-0 shadow-sm p-3 mb-4">
                <div className="row align-items-center g-3">
                    <div className="col-md-6 col-lg-4">
                        <div className="input-group">
                            <span className="input-group-text bg-transparent border-end-0">
                                <Search size={18} className="text-muted" />
                            </span>
                            <input
                                type="text"
                                className="form-control border-start-0"
                                placeholder="ค้นหาตามชื่อ หรือ อีเมล..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="card border-0 shadow-sm overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="ps-4 py-3">ผู้ใช้งาน</th>
                                <th className="py-3">อีเมล</th>
                                <th className="py-3">บทบาท</th>
                                <th className="py-3 text-center">สถานะ</th>
                                <th className="py-3">วันที่เริ่มใช้งาน</th>
                                <th className="pe-4 py-3 text-end">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td className="ps-4">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="bg-light rounded-circle p-2 text-primary">
                                                    <UserCircle size={24} />
                                                </div>
                                                <div>
                                                    <div className="fw-bold">{user.firstName} {user.lastName}</div>
                                                    <small className="text-muted">ID: {user.id}</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`badge rounded-pill px-3 py-2 ${getRoleBadge(user.role)}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            {user.status === "Active" ? (
                                                <div className="text-success d-flex align-items-center justify-content-center gap-1 small">
                                                    <CheckCircle2 size={14} />
                                                    <span>กำลังใช้งาน</span>
                                                </div>
                                            ) : (
                                                <div className="text-danger d-flex align-items-center justify-content-center gap-1 small">
                                                    <XCircle size={14} />
                                                    <span>ระงับใช้งาน</span>
                                                </div>
                                            )}
                                        </td>
                                        <td>{user.createdAt}</td>
                                        <td className="pe-4 text-end">
                                            <div className="d-flex justify-content-end gap-2">
                                                <button
                                                    onClick={() => handleOpenModal(user)}
                                                    className="btn btn-outline-primary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                                                    style={{ width: '32px', height: '32px' }}
                                                    title="แก้ไข"
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="btn btn-outline-danger btn-sm rounded-circle d-flex align-items-center justify-content-center"
                                                    style={{ width: '32px', height: '32px' }}
                                                    title="ลบ"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-5 text-muted">ไม่พบข้อมูลผู้ใช้งาน</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Overlay and Modal */}
            {showModal && (
                <>
                    <div
                        className="modal-backdrop fade show"
                        onClick={handleCloseModal}
                        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    ></div>
                    <div className="modal show d-block" tabIndex={-1}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content border-0 shadow">
                                <form onSubmit={handleSubmit}>
                                    <div className="modal-header border-bottom-0 pt-4 px-4">
                                        <h5 className="modal-title fw-bold">
                                            {editingUser ? "แก้ไขผู้ใช้งาน" : "เพิ่มผู้ใช้งานใหม่"}
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={handleCloseModal}
                                        ></button>
                                    </div>
                                    <div className="modal-body px-4">
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">ชื่อ</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    required
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">นามสกุล</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    required
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label small fw-bold">อีเมล</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    required
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label small fw-bold">รหัสผ่าน</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    required={!editingUser}
                                                    placeholder={editingUser ? "เว้นว่างหากไม่ต้องการเปลี่ยน" : ""}
                                                    value={formData.password}
                                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label small fw-bold">บทบาท (Role)</label>
                                                <select
                                                    className="form-select"
                                                    value={formData.role}
                                                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                                                >
                                                    <option value="Admin">Admin</option>
                                                    <option value="Staff">Staff</option>
                                                    <option value="User">User</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer border-top-0 pb-4 px-4">
                                        <button
                                            type="button"
                                            className="btn btn-light"
                                            onClick={handleCloseModal}
                                        >
                                            ยกเลิก
                                        </button>
                                        <button type="submit" className="btn btn-primary px-4 shadow-sm">
                                            {editingUser ? "บันทึกการเปลี่ยนแปลง" : "สร้างผู้ใช้งาน"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
