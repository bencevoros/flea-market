import * as jwt from 'jsonwebtoken';
import { tokenSecret } from './configs';

export default (req, res, next) => {
    try {
        const token = req.headers.authorization;

        const decodedToken = jwt.verify(token, tokenSecret);

        const userId = decodedToken.userId;

        if (req.body.userId && req.body.userId !== userId) {
            throw new Error('Invalid user ID');
        } else {
            next();
        }
    } catch {
      res.sendStatus(401);
    }
};
