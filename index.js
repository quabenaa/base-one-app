const webServer = require('./services/web-server');
const log = console.log;

const startup = async () => {
    try {
        log('Initializing web services...')
        await webServer.initialize();
    } catch (error) {
        console.error(error);
        process.exit(1); // Non-zero failure code
    }
}

startup();