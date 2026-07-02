import { ApiError } from "../utils/ApiError.js";

export function notFoundHandler(_req, res) {
    res.status(404).json({ error: "Route not found" });
}

export function errorHandler(err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ error: err.message, details: err.details });
    }
    console.log("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
}