import express, { Request, Response, NextFunction } from "express";
import { User } from "../model";

var router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { name } = req.body;
  const userModel = new User(req.body);

  const oldUser = await User.findOne({ name });

  if (!oldUser) {
    await userModel.save();
    return res.status(200).json({ success: true });
  } else {
    return res.status(500).json({ message: "User exists" });
  }
});

router.get("/", async (req: Request, res: Response) => {
  const { current, pageSize, name, status } = req.query;

  try {
    const allData = await User.find({
      ...(name && { name }),
      ...(status && { status }),
    });

    const data = await User.find({
      ...(name && { name }),
      ...(status && { status }),
    })
      .sort({ updatedAt: -1 })
      .skip((Number(current) - 1) * Number(pageSize))
      .limit(Number(pageSize));

    return res.status(200).json({
      data,
      total: allData.length,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server exception" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: "The user couldn't be found" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    let data = user?.toJSON();
    delete data?.password;
    return res.status(200).json({ data, success: true });
  } catch (error) {
    return res.status(500).json({ message: "Data acquisition failure" });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ message: "User doesn't exist" });
  }
});

export default router;
