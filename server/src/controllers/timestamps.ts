import { Response, Request } from 'express';

export const timestampsController = (req: Request, res: Response): void => {
    res.json({ timestamps: '' });
};
