import express, { Express, Request, Response, NextFunction } from 'express';
import { User } from '../model';
var router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name, password });
    const data = user?.toJSON();
    delete data?.password;

    (req.session as any).user = user;
    console.log(1111,data);
    
debugger
    return res.status(200).json({ data, success: true });
  } catch (error) {
    return res.status(500).json({ message: 'Account password error' });
  }
});

export default router;
