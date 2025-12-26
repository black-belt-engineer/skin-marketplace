import { buildApp } from './app';

const start = async () => {
    let app;
    try {
        app = await buildApp();
        const port = app.config.PORT;
        const host = app.config.HOST;

        await app.listen({ port, host });
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
