import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Footer from "@/components/landing/Footer";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="d-flex flex-column min-vh-100 bg-light">
            <AdminNavbar />
            <div className="d-flex flex-grow-1">
                <AdminSidebar />
                <main className="flex-grow-1 p-4">
                    <div className="container-fluid">
                        {children}
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}
