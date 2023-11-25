import { Request, Response, NextFunction} from 'express';
import UserService from '../service/usersService';
import jwt, { JwtPayload } from 'jsonwebtoken';

async function authorize(req: Request & { user?: any }, res: Response, next: NextFunction) {
    try {
        const bearerToken = req.headers.authorization;
        const token = bearerToken?.split("Bearer ")?.[1] || "";
        const tokenPayload = jwt.verify(token, process.env.SIGNATURE_KEY || "Rahasia") as JwtPayload;

        req.user = await new UserService().findById(tokenPayload.id);
        next();

    } catch (error) {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
}
async function isSuperAdmin(req: Request & { user?: any }, res: Response, next: NextFunction) {
    try {
        const bearerToken = req.headers.authorization;
        const token = bearerToken?.split("Bearer ")?.[1] || "";
        const tokenPayload = jwt.verify(token, process.env.SIGNATURE_KEY || "Rahasia") as JwtPayload;

        req.user = await new UserService().findById(tokenPayload.id);

        const userRole = req.user.role;

        if (userRole === "superadmin") {
            next();
        } else {
            res.status(403).json({
                message: "Forbidden. Only superadmins are allowed.",
            });
        }

    } catch (error) {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
}

async function isAdminOrSuperAdmin(req: Request & { user?: any }, res: Response, next: NextFunction) {
    try {
        const bearerToken = req.headers.authorization;
        const token = bearerToken?.split("Bearer ")?.[1] || "";
        const tokenPayload = jwt.verify(token, process.env.SIGNATURE_KEY || "Rahasia") as JwtPayload;

        req.user = await new UserService().findById(tokenPayload.id);

        const userRole = req.user.role;

        if (userRole === "admin" || userRole === "superadmin") {
            next();
        } else {
            res.status(403).json({
                message: "Forbidden. Only Superadmin or Admin are allowed.",
            });
        }

    } catch (error) {
        res.status(401).json({
            message: "Unauthorized"
        });
    }
}

module.exports = {authorize, 
                isSuperAdmin,
                isAdminOrSuperAdmin};
