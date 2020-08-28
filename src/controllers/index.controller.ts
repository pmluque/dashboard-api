import { Request, Response } from "express";

export class IndexController {
    public index(req: Request, res: Response) {
      res.json({
        message: "Api OK!",
      });
    }
  }