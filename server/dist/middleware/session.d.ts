import { Request, Response, NextFunction } from 'express';
import { GameSession } from '../services/session-manager';
declare global {
    namespace Express {
        interface Request {
            gameSession?: GameSession;
        }
    }
}
export declare function sessionMiddleware(req: Request, res: Response, next: NextFunction): void;
