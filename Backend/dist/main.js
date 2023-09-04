"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const config = require("config");
const bodyParser = require("body-parser");
async function bootstrap() {
    const serverConfig = config.get('server');
    const logger = new common_1.Logger('bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bodyParser: true });
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    }));
    app.enableCors();
    const port = process.env.PORT || serverConfig.port;
    await app.listen(port);
    logger.log(`The application is listening on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map