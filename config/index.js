function newMysqlConfig() {

    return {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost',
        port: process.env.DB_PORT
    }

}

function newAuthConfig() {

    return {
        secret: process.env.PASSPORT_SECRET,
        eCode: process.env.E_CODE
    }

}

function newConfig() {

    return {
        mysql: newMysqlConfig(),
        port: parseInt(process.env.PORT) || 8080,
        debug: Boolean(process.env.DEBUG) || process.env.NODE_ENV !== "production",
        auth: newAuthConfig()
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

        if (!this.data.mysql.host) {

            console.log('Config: mysql.host, not set!');

        }

        if (!this.data.mysql.port) {

            console.log('Config: mysql.port, not set!');

        }

        if (!this.data.auth.secret) {

            console.log('Config: Passport secret, not set!');

        }

        if (!this.data.auth.eCode) {

            console.log('Config: E-Code, not set!');

        }

        console.log('Config loaded successfully.');
    }
}

let self = new ConfigManager();

module.exports = self;