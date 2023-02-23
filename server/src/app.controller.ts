import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  healthCheck() {
    return {
      message: 'OK',
      uptime: process.uptime(),
      timestamp: Date.now(),
    };
  }
}
