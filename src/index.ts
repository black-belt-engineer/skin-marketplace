import { buildApp } from './app';
import { PORT, HOST } from './config/app-config';

const start = async () => {
    let app;
    try {
        app = await buildApp();
        await app.listen({ port: PORT, host: HOST });
    } catch (err) {
        if (app) {
            app.log.error(err);
        } else {
            console.error(err);
        }
        process.exit(1);
    }
};

start();
