import { NextFunction, Request, Response } from "express";
const router = require('express').Router();

import uploadsRouter from './api/uploads';
import apiRouter from './api'


router.use('/uploads', uploadsRouter);
router.use('/api', apiRouter);

router.get("/api/csrf/restore", (req: Request, res: Response, next: NextFunction) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

export = router;
