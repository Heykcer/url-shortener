import express from 'express';
import { handleGenerateShortUrl, handleRedirect } from '../controllers/url.controller.js';
import { limiter } from '../middlewares/rateLimiter.js';

const router = express.Router();

router.post('/',limiter,handleGenerateShortUrl);
router.get('/:shortUrl',limiter,handleRedirect);
export default router;
