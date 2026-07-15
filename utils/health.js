const mongoose = require("mongoose");

const bytesToMB = (bytes) => {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};

const getHealthInfo = () => {
    const memory = process.memoryUsage();

    return {
        application: "E-Commerce Backend API",

        version: process.env.API_VERSION,

        environment: process.env.NODE_ENV,

        status: "healthy",

        uptime: `${process.uptime().toFixed(2)} seconds`,

        timestamp: new Date().toISOString(),

        nodeVersion: process.version,

        database:
            mongoose.connection.readyState === 1
                ? "Connected"
                : "Disconnected",

        memoryUsage: {
            rss: bytesToMB(memory.rss),
            heapTotal: bytesToMB(memory.heapTotal),
            heapUsed: bytesToMB(memory.heapUsed)
        }
    };
};

module.exports = getHealthInfo;