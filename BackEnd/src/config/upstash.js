// import { Ratelimit } from "@upstash/ratelimit";
// import { Redis } from "@upstash/redis";

// import dotevn from"dotenv";
// dotevn.config();



// // Create a new ratelimiter, that allows 10 requests per 20 seconds
// const ratelimit = new Ratelimit({
//     redis: Redis.fromEnv(),
//     limiter: Ratelimit.slidingWindow(5, "10 s"),
// });

// export default ratelimit
import dotenv from "dotenv";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

dotenv.config();

// Create the rate limiter instance
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "20 s"),
});

// ✅ Middleware function
const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("global-limit-key");

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limit error:", error);
    next(error);
  }
};

export default rateLimiter;
