import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config'
import * as bodyParser from 'body-parser'

import express from 'express';


async function bootstrap() {

  const serverConfig = config.get('server')
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule, {bodyParser: true});

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  );
  app.enableCors();

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);

  logger.log(`The application is listening on port ${port}`)

}
bootstrap();
