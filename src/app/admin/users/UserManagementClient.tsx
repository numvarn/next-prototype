"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    UserCircle
} from "lucide-react";
import { createUserAction, updateUserAction, deleteUserAction } from "@/app/actions/user";

export interface UserData {
    id: string;
    username: string;
    role: "Admin" | "Staff" | "User";
    firstName: string;
    lastName: string;
    phone: string;
    createdAt: string;
}

interface UserManagementClientProps {
    initialUsers: UserData[];
}

export default function UserManagementClient({ initialUsers }: UserManagementClientProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [appliedSearchTerm, setAppliedSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState<UserData | null>(null);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "User" as UserData["role"],
        firstName: "",
        lastName: "",
        phone: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Use initialUsers directly since Server Actions and revalidatePath will update props
    const users = initialUsers;

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(appliedSearchTerm.toLowerCase()) ||
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(appliedSearchTerm.toLowerCase())
    );

    const handleSearch = () => {
        setAppliedSearchTerm(searchTerm);
    };

    const handleReset = () => {
        setSearchTerm("");
        setAppliedSearchTerm("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleOpenModal = (user: UserData | null = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({
                username: user.username,
                password: "", // Keep password empty when editing
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone || "",
            });
        } else {
            setEditingUser(null);
            setFormData({
                username: "",
                password: "",
                role: "User",
                firstName: "",
                lastName: "",
                phone: "",
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingUser(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (editingUser) {
            const res = await updateUserAction(editingUser.id, formData);
            if (res.success) {
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
                handleCloseModal();
            } else {
                Swal.fire("ข้อผิดพลาด", res.error || "เกิดข้อผิดพลาดในการอัปเดต", "error");
            }
        } else {
            const res = await createUserAction(formData);
            if (res.success) {
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
                handleCloseModal();
            } else {
                Swal.fire("ข้อผิดพลาด", res.error || "เกิดข้อผิดพลาดในการสร้าง", "error");
            }
        }
        setIsSubmitting(false);
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
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deleteUserAction(id);
                if (res.success) {
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
                } else {
                    Swal.fire("ข้อผิดพลาด", res.error || "เกิดข้อผิดพลาดในการลบ", "error");
                }
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
                    <div className="col-md-8 col-lg-6">
                        <div className="d-flex gap-2">
                            <div className="input-group flex-grow-1">
                                <span className="input-group-text bg-transparent border-end-0">
                                    <Search size={18} className="text-muted" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-start-0"
                                    placeholder="ค้นหาตามชื่อ หรือ ชื่อผู้ใช้..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                className="btn btn-primary px-4 shadow-sm"
                            >
                                ค้นหา
                            </button>
                            <button
                                onClick={handleReset}
                                className="btn btn-outline-secondary px-3 shadow-sm"
                            >
                                รีเซ็ต
                            </button>
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
                                <th className="py-3">ชื่อสำหรับเข้าสู่ระบบ</th>
                                <th className="py-3">เบอร์โทร</th>
                                <th className="py-3">บทบาท</th>
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
                                        <td>{user.username}</td>
                                        <td>{user.phone || "-"}</td>
                                        <td>
                                            <span className={`badge rounded-pill px-3 py-2 ${getRoleBadge(user.role)}`}>
                                                {user.role}
                                            </span>
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
                                            disabled={isSubmitting}
                                        ></button>
                                    </div>
                                    <div className="modal-body px-4">
                                        <div className="row g-3">
                                            {/* Profile Information */}
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">ชื่อ (First Name)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    required
                                                    value={formData.firstName}
                                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold">นามสกุล (Last Name)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    required
                                                    value={formData.lastName}
                                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label small fw-bold">เบอร์โทรติดต่อ (Phone)</label>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                />
                                            </div>

                                            <div className="col-12"><hr className="my-2" /></div>

                                            {/* User Auth Information */}
                                            <div className="col-12">
                                                <label className="form-label small fw-bold">ชื่อผู้ใช้งาน (Username)</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    required
                                                    value={formData.username}
                                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
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
                                            disabled={isSubmitting}
                                        >
                                            ยกเลิก
                                        </button>
                                        <button type="submit" className="btn btn-primary px-4 shadow-sm" disabled={isSubmitting}>
                                            {isSubmitting ? "กำลังดำเนินการ..." : (editingUser ? "บันทึกการเปลี่ยนแปลง" : "สร้างผู้ใช้งาน")}
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
