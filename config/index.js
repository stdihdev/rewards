function newMysqlConfig() {

    return {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        soketPath: process.env.CLOUD_SQL_CONNECTION_NAME,
    }

}

function newConfig() {

    return {
        mysql: newMysqlConfig(),
        port: parseInt(process.env.PORT) || 8080,
        debug: Boolean(process.env.DEBUG) || process.env.NODE_ENV !== "production",
    }

}

class ConfigManager {

    constructor() {
        this.data = newConfig();
    }

    // loads our config file
    async load() {
        if (!this.data.mysql) {

            console.log('Config: mysql, not set!');

        }

        if (!this.data.mysql.user) {

            console.log('Config: mysql.user, not set!');

        }

        if (!this.data.mysql.password) {

            console.log('Config: mysql.password, not set!');

        }

        if (!this.data.mysql.database) {

            console.log('Config: mysql.database, not set!');

        }

        if (!this.data.mysql.soketPath) {

            console.log('Config: mysql.soketPath, not set!');

        }

        console.log('Config loaded successfully.');
    }
}

let self = new ConfigManager();

module.exports = self;