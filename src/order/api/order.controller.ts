import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { RegisterOrderRequestDto} from "../application/dtos/request/register-order-request.dto";
import { RegisterOrderResponseDto} from "../application/dtos/response/register-order-response.dto";
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetOrderQuery} from "../application/queries/get-order.query";
import {OrderApplicationService} from "../application/services/order-application.service";

@Controller('customers')
export class OrderController {
    constructor(
        private readonly ordersApplicationService: OrderApplicationService,
        private readonly queryBus: QueryBus
    ) {}

    @Post()
    async register(
        @Body() registerOrderRequestDto: RegisterOrderRequestDto,
        @Res({ passthrough: true }) response
    ): Promise<object> {
        try {
            const result: Result<AppNotification, RegisterOrderResponseDto> =
                await this.ordersApplicationService.register(registerOrderRequestDto);
            if (result.isSuccess()) {
                return ApiController.created(response, result.value);
            }
            return ApiController.error(response, result.error.getErrors());
        } catch (error) {
            return ApiController.serverError(response, error);
        }
    }

    @Get()
    async getCustomers(@Res({ passthrough: true }) response): Promise<object> {
        try {
            const customers = await this.queryBus.execute(new GetOrderQuery());
            return ApiController.ok(response, customers);
        } catch (error) {
            return ApiController.serverError(response, error);
        }
    }
}