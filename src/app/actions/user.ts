"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { logActivity } from "@/lib/activity";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function createUserAction(formData: any) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) throw new Error("Unauthorized");

        const { username, password, role, firstName, lastName, phone } = formData;

        await prisma.user.create({
            data: {
                username,
                password,
                role,
                profile: {
                    create: {
                        firstName,
                        lastName,
                        phone: phone || null,
                    }
                }
            }
        });

        await logActivity(session.user.id, "เพิ่มผู้ใช้งานใหม่", `เพิ่มผู้ใช้: ${username}`);

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, error: "Failed to create user" };
    }
}

export async function updateUserAction(id: string, formData: any) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) throw new Error("Unauthorized");

        const { username, password, role, firstName, lastName, phone } = formData;

        const updateData: any = {
            username,
            role,
            profile: {
                upsert: {
                    create: {
                        firstName,
                        lastName,
                        phone: phone || null,
                    },
                    update: {
                        firstName,
                        lastName,
                        phone: phone || null,
                    }
                }
            }
        };

        if (password) {
            updateData.password = password;
        }

        await prisma.user.update({
            where: { id },
            data: updateData
        });

        await logActivity(session.user.id, "แก้ไขข้อมูลผู้ใช้งาน", `แก้ไขข้อมูลผู้ใช้: ${username}`);

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error) {
        console.error("Error updating user:", error);
        return { success: false, error: "Failed to update user" };
    }
}

export async function deleteUserAction(id: string) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) throw new Error("Unauthorized");

        // Fetch user before deleting to log username
        const userToDelete = await prisma.user.findUnique({ where: { id } });

        // Cascade delete is setup in schema.prisma, so deleting user will delete profile
        await prisma.user.delete({
            where: { id }
        });

        if (userToDelete) {
            await logActivity(session.user.id, "ลบผู้ใช้งาน", `ลบผู้ใช้: ${userToDelete.username}`);
        }

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error) {
        console.error("Error deleting user:", error);
        return { success: false, error: "Failed to delete user" };
    }
}
