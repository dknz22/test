import dotenv from "dotenv";

dotenv.config();

function required(name, fallback) {
    const value = process.env[name] ?? fallback;
    if (value === undefined) {
        throw new Error(`Missing required env var: ${name}`);
    }
    return value;
}

export const env = {
    port: Number(process.env.PORT ?? 4000),
    databaseUrl: required("DATABASE_URL", "file:./dev.db"),
    jwt: {
        accessSecret: required("JWT_ACCESS_SECRET", "change"),
        refreshSecret: required("JWT_REFRESH_SECRET", "change"),
        accessTtl: process.env.ACCESS_TOKEN_TTL ?? "15m",
        refreshTtl: process.env.REFRESH_TOKEN_TTL ?? "15m",
    },
    clientOrigin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173",
}