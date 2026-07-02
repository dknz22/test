import bcrypt from "bcryptjs";
import { prisma } from "../../config/prisma.js";
import { ApiError } from "../../utils/ApiError.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../../utils/jwt.js";
import { publicUser } from "../../utils/publicUser.js";

function issueTokens(user) {
    const payload = { sub: user.id, email: user.email };
    return {
        accessToken: signAccessToken(payload),
        refreshToken: signRefreshToken(payload),
    };
}

export async function register({email, password, name}) {
    const existing = await prisma.user.findUnique({where: {email}});
    if (existing) {
        throw new ApiError("Email already exist");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { email, passwordHash, name }
    });

    return {user: publicUser(user), ...issueTokens(user)};
}

export async function login({ email, password }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw ApiError.unauthorized("Invalid cred");

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw ApiError.unauthorized("Invalid cred");

    return {user: publicUser(user), ...issueTokens(user)};
}

export async function refresh({ refreshToken }) {
    let payload;

    try {
        payload = verifyRefreshToken(refreshToken);
    } catch {
        throw ApiError.unauthorized("Invalid or expired token");
    }

    const user = await prisma.user.findUnique({ where: { id:payload.sub } });
    if (!user) throw ApiError.unauthorized("User no longer exists");

    return issueTokens(user);
}