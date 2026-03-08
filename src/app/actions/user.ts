"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createUserAction(formData: any) {
    try {
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

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error) {
        console.error("Error creating user:", error);
        return { success: false, error: "Failed to create user" };
    }
}

export async function updateUserAction(id: string, formData: any) {
    try {
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

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error) {
        console.error("Error updating user:", error);
        return { success: false, error: "Failed to update user" };
    }
}

export async function deleteUserAction(id: string) {
    try {
        // Cascade delete is setup in schema.prisma, so deleting user will delete profile
        await prisma.user.delete({
            where: { id }
        });

        revalidatePath('/admin/users');
        return { success: true };
    } catch (error) {
        console.error("Error deleting user:", error);
        return { success: false, error: "Failed to delete user" };
    }
}
