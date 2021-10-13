import { Response, Request } from 'express';

export const intervalsController = (req: Request, res: Response): void => {
    res.json({ interval: '' });
};
