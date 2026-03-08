import { prisma } from "@/lib/prisma";
import UserManagementClient from "./UserManagementClient";

export default async function UserManagementPage() {
    // Fetch users from the Prisma database
    const users = await prisma.user.findMany({
        include: {
            profile: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    // Map Prisma User objects to the UserData structure expected by the client component
    // Converting the Date types to strings to pass over the server-client boundary safely.
    const initialUsers = users.map(user => ({
        id: user.id,
        username: user.username,
        role: user.role,
        firstName: user.profile?.firstName || "",
        lastName: user.profile?.lastName || "",
        phone: user.profile?.phone || "",
        createdAt: user.createdAt.toISOString().split('T')[0],
    }));

    return <UserManagementClient initialUsers={initialUsers} />;
}
