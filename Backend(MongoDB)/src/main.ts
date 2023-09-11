import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config'
import * as dotenv from 'dotenv'

import * as express from 'express'; 


async function bootstrap() {

  const serverConfig = config.get('server')
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule, {bodyParser: true});

  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  dotenv.config()
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
    })
  );
  app.enableCors();

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);

  logger.log(`The application is listening on port ${port}`)

}
bootstrap();
