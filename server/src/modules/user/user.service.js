import bcrypt from "bcryptjs";
import { prisma } from "../../config/prisma.js";
import { ApiError } from "../../utils/ApiError.js";
import { publicUser } from "../../utils/publicUser.js";

export async function getMe(userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw ApiError.notFound("User not found");
    return publicUser(user);
}

export async function updateMe(userId, data) {
    const patch = {};
    if (data.name !== undefined) patch.name = data.name;
    if (data.birthDate !== undefined) patch.birthDate = new Date(data.birthDate);

    const user = await prisma.user.update({ where: { id: userId }, data: patch });
    return publicUser(user);
}

export async function changePassword(userId, { currentPassword, newPassword }) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw ApiError.notFound("User not found");

    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid) throw ApiError.badRequest("Current password is incorrect");

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: userId }, data: { passwordHash } });
    
    return { success: true };
}