import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Controller()
@UseInterceptors(LoggingInterceptor)
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Get a greeting message' })
  @ApiResponse({
    status: 200,
    description: 'Returns a hello message',
    type: String,
  })
  getHello(): string {
    return 'Hello World!';
  }

  @Get('ping')
  @ApiOperation({ summary: 'Ping the server' })
  @ApiResponse({
    status: 200,
    description: 'Returns the server status',
    type: Object,
  })
  getPing(): object {
    return { status: 'success' };
  }
}
