"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to verify JWT tokens
// export const authenticate = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   if (!token) {
//     return res.status(401).json({ message: "Authentication required" });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!);
//     (req as any).user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };
// Middleware to validate and decode JWT
const validateJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract token from Authorization header
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Authorization header missing or malformed" });
        }
        const token = authHeader.replace("Bearer ", "").trim();
        if (!token) {
            return res.status(401).json({ message: "Token is missing" });
        }
        // Verify the token
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return res.status(500).json({ message: "JWT secret not configured" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        // Attach user details to the request object
        req.user = decoded;
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired" });
        }
        else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        }
        else {
            return res.status(500).json({ message: "Failed to validate token" });
        }
    }
});
exports.validateJWT = validateJWT;
