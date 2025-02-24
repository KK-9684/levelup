import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './utils/http-exception.filter';
// import { LoggerMiddleware } from './logger/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('query parser', 'extended');
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.use(LoggerMiddleware);

  const config = new DocumentBuilder()
    .setTitle('levelup nest server')
    .setDescription('This is swagger ui')
    .setVersion('1.0')
    .addTag('level_up')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Error during application bootstrap', err);
  process.exit(1); // Exit the process with a failure code
});
