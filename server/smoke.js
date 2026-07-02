import { signAccessToken, verifyAccessToken } from "./src/utils/jwt.js";

const token = signAccessToken({ sub: "1", email: "asd@asd.com" });
console.log("token", token);
console.log("verify", verifyAccessToken(token));