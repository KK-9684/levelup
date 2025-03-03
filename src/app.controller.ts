import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Get a greeting message' })
  @ApiResponse({
    status: 200,
    description: 'Returns a hello message',
    type: String,
  })
  getHello(): string {
    return 'Hello, World!';
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
