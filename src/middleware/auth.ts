import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

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
export const validateJWT = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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

    const decoded = jwt.verify(token, secret) as JwtPayload;

    // Attach user details to the request object
    (req as any).user = decoded;

    next(); // Proceed to the next middleware or route handler
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else {
      return res.status(500).json({ message: "Failed to validate token" });
    }
  }
};

