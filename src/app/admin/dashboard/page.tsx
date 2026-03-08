export default function AdminDashboard() {
    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3 mb-0">ภาพรวมระบบ (Dashboard)</h1>
                <button className="btn btn-primary d-flex align-items-center gap-2">
                    <span>ส่งออกรายงาน</span>
                </button>
            </div>

            <div className="row g-4 mb-4">
                {[
                    { label: "ผู้ใช้งานทั้งหมด", count: "1,234", trend: "+12%", color: "primary" },
                    { label: "สินค้าทั้งหมด", count: "85", trend: "+3", color: "success" },
                    { label: "ออเดอร์ใหม่", count: "12", trend: "-2", color: "warning" },
                    { label: "รายได้วันนี้", count: "฿45,000", trend: "+8%", color: "info" },
                ].map((stat, idx) => (
                    <div key={idx} className="col-md-3">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body p-4">
                                <div className="text-muted small mb-2">{stat.label}</div>
                                <div className="h2 fw-bold mb-2">{stat.count}</div>
                                <div className={`badge bg-${stat.trend.startsWith('+') ? 'success-subtle text-success' : 'danger-subtle text-danger'} rounded-pill`}>
                                    {stat.trend}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                    <h5 className="card-title mb-4">กิจกรรมล่าสุด</h5>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>กิรกรรม</th>
                                    <th>ผู้ใช้งาน</th>
                                    <th>เวลา</th>
                                    <th>สถานะ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { action: "แก้ไขข้อมูลสินค้า", user: "Admin", time: "2 นาทีที่แล้ว", status: "สำเร็จ" },
                                    { action: "เพิ่มผู้ใช้งานใหม่", user: "Manager", time: "1 ชั่วโมงที่แล้ว", status: "สำเร็จ" },
                                    { action: "ลบรายการสั่งซื้อ", user: "Admin", time: "3 ชั่วโมงที่แล้ว", status: "รอดำเนินการ" },
                                ].map((row, idx) => (
                                    <tr key={idx}>
                                        <td>{row.action}</td>
                                        <td>{row.user}</td>
                                        <td>{row.time}</td>
                                        <td><span className={`badge rounded-pill bg-${row.status === 'สำเร็จ' ? 'success' : 'warning'}`}>{row.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
