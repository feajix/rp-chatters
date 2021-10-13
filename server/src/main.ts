import path from 'path';
import http, { Server } from 'http';
import app from './app';
import { consoleLog, fileLog } from './winston';
console.log(__dirname);
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server: Server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(value: string): string | number | undefined {
    const port = parseInt(value, 10);

    if (isNaN(port)) {
        return value;
    }
    if (port >= 0) {
        return port;
    }
    return undefined;
}

function onError(error: any) {
    //TODO: resolve the type
    if (error.syscall != 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
        case 'EACCES':
            fileLog(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            fileLog(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind =
        typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
    consoleLog.info('Listening on ' + bind);
}


