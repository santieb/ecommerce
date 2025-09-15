import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config/dist';
import * as morgan from 'morgan';
import * as cors from 'cors';
import { CORS } from './constants';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.use((req, res, next) => {
    const origin = req.headers.origin || '*';
    const allowOrigin =
      origin === 'http://localhost:3001' || /:\/\/.*\.ngrok-free\.app$/.test(String(origin))
        ? origin
        : 'http://localhost:3001';

    res.header('Access-Control-Allow-Origin', allowOrigin);
    res.header('Vary', 'Origin');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    const reqHdr = (req.headers['access-control-request-headers'] as string) || 'authorization,content-type,ngrok-skip-browser-warning';
    res.header('Access-Control-Allow-Headers', reqHdr);

    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
  });

  app.use(morgan('dev'));

  app.enableCors(CORS);
  app.use(cors(CORS));
  const instance = app.getHttpAdapter().getInstance();
  instance.options('*', cors(CORS));

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get('PORT'));
  console.log(`app listening on: ${await app.getUrl()}`);
}
bootstrap();
