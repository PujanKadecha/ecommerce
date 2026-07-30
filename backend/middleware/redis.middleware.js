const redisClient = require("../config/redis");

const checkCache = () => {
    return async (req, res, next) => {
        const cacheKey = `products:${req.originalUrl || 'all'}`;
        try {
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                console.log(` Cache Hit for key: ${cacheKey}`);
                return res.status(200).json(JSON.parse(cachedData));
            }
            console.log(` Cache Miss for key: ${cacheKey}`);
            next();
        } catch (error) {
            console.error('Redis Middleware Error:', error);
            next();
        }
    };
}; 

module.exports = {checkCache};