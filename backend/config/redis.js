const redis = require("redis");
const env = require("../config/env");

const redisClient = redis.createClient({
    url : env.redis.url 
});

redisClient.on('connect',()=>{
    console.log("Redis Client Connected")
});

redisClient.on('error',(err)=>{
    console.log("Redis Error:",err);
});

(async() => {
    try{
        await redisClient.connect();
    }catch(error){
        console.log("Failed to Connect to Redis",error);
    }
})();

module.exports = redisClient;