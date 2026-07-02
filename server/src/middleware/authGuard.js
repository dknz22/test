import { verifyAccessToken } from "../utils/jwt.js";
import { ApiError } from "../utils/ApiError.js";

export function authGuard(req, _res, next) {
    const header = req.headers.authorization ?? "";
    const [scheme, token] = header.split(" ");

    if (scheme !== "Bearer" || !token) {
        return next(ApiError.unauthorized("Missing Authorization header"));
    }

    try {
        const payload = verifyAccessToken(token);
        req.user = { id: payload.sub, email: payload.email };
        next();
    } catch {
        next(ApiError.unauthorized("Invalid or expired access token"));
    }
}