const oracledb = require('oracledb');
const dbConfig = require("../config/database");

// Set up Connection pool of oracle RDS
const defalutThreadPoolSize = 4;
// Increase thread pool size by poolMax
process.env.UV_THREADPOOL_SIZE = dbConfig.hrPool.poolMax + defaultThreadPoolSize;

async function initialize() {
    const pool = await oracledb.createPool(dbConfig.hrPool);
}
