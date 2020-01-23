import { Controller, Logger, Post, Body, OnModuleInit } from '@nestjs/common';
import { IGrpcService } from './grpc.interface';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { microserviceOptions } from './grpc.options';

@Controller()
export class AppController implements OnModuleInit {
  // Create a logger instance
  private logger = new Logger('AppController');

  @Client(microserviceOptions)
  private client: ClientGrpc;

  private gprcService: IGrpcService;

  onModuleInit() {
    this.gprcService = this.client.getService<IGrpcService>('AppController');
  }

  // Map the 'POST /add' route to this method
  @Post('add')
  // Define the logic to be executed
  async accumulate(@Body('data') data: number[])  {
    this.logger.log('Adding ' + data.toString()); // Log something on every call
    return this.gprcService.accumulate({ data });
  }
}
