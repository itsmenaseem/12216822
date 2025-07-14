import { ShortUrl } from "../models/shorten.model.js";
import CustomError from "../utils/customError.js";

export async function shorten(req, res, next) {
  try {
    const { url, validity, shortCode } = req.body;

    if (!url || !validity || !shortCode) {
      return next(new CustomError("Please provide all fields", 400));
    }

    const existing = await ShortUrl.findOne({ shortCode });
    if (existing) {
      return next(new CustomError("Short code already exists", 409));
    }

    const newShortUrl = await ShortUrl.create({
      originalUrl: url,
      shortCode,
      expiresAt: new Date(Date.now() + Number(validity) * 1000)
    });

    res.status(201).json({
      success: true,
      shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`,
      expiresAt: newShortUrl.expiresAt
    });
  } catch (error) {
    next(error);
  }
}


export async function getStats(req, res, next) {
  try {
    const { shortCode } = req.params;

    const short = await ShortUrl.findOne({ shortCode });

    if (!short) {
      return next(new CustomError("Short URL not found", 404));
    }

    res.status(200).json({
      success: true,
      data: {
        originalUrl: short.originalUrl,
        shortCode: short.shortCode,
        createdAt: short.createdAt,
        expiresAt: short.expiresAt,
        clicks: short.clicks,
        lastAccessed: short.lastAccessed || "Never accessed"
      }
    });
  } catch (error) {
    next(error);
  }
}
