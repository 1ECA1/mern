import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    // Use IP address or user-specific key
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const { success, reset } = await ratelimit.limit(ip);

    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000); // in seconds
      return res.status(429).json({
        message: `Too many requests, please try again after ${retryAfter} seconds.`,
      });
    }

    next();
  } catch (error) {
    console.error("Rate limit error:", error);
    next(); // continue if limiter fails
  }
};

export default rateLimiter;
