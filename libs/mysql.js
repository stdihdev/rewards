const mysql = require('promise-mysql');
const config = require('../config');

class MySQLManager {

    constructor() {
        this.pool = null;
    }

    async createPool() {

        return await mysql.createPool({
            user: config.data.mysql.user,
            password: config.data.mysql.password,
            database: config.data.mysql.database,
            // If connecting via unix domain socket, specify the path
            // socketPath: config.data.mysql.socketPath,
            // If connecting via TCP, enter the IP and port instead
            host: config.data.mysql.host,
            port: config.data.mysql.port,

            // [START cloud_sql_mysql_mysql_limit]
            // 'connectionLimit' is the maximum number of connections the pool is allowed
            // to keep at once.
            connectionLimit: 5,

            // [START cloud_sql_mysql_mysql_timeout]
            // 'connectTimeout' is the maximum number of milliseconds before a timeout
            // occurs during the initial connection to the database.
            connectTimeout: 10000, // 10 seconds
            // 'acquireTimeout' is the maximum number of milliseconds to wait when
            // checking out a connection from the pool before a timeout error occurs.
            acquireTimeout: 10000, // 10 seconds
            // 'waitForConnections' determines the pool's action when no connections are
            // free. If true, the request will queued and a connection will be presented
            // when ready. If false, the pool will call back with an error.
            waitForConnections: true, // Default: true
            // 'queueLimit' is the maximum number of requests for connections the pool
            // will queue at once before returning an error. If 0, there is no limit.
            queueLimit: 0, // Default: 0
        });
    }

    // [START cloud_sql_mysql_mysql_create]
    async connect() {

        try {
            
            this.pool = await this.createPool();
            // await this.pool.connect();

        } catch (e) {

            console.log('DB Connection failed.', e)

        }

        console.log('Connected to MySQL.');

        this.pool.getConnection((error, connection) => {

            if(error)
                console.log('An idle client has experienced an error', error);

        })

    };

}

let self = new MySQLManager();

module.exports = self;