import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterOrderRequestDto} from "../dtos/request/register-order-request.dto";
import { OrderRegisterCommand} from "../commands/order-register.command";
import { RegisterOrderResponseDto} from "../dtos/response/register-order-response.dto";
import { RegisterOrderValidator} from "../validators/register-order.validator";
import { AppNotification } from 'src/common/application/app.notification';
import { Result } from 'typescript-result';
@Injectable()
export class OrderApplicationService {
    constructor(
        private commandBus: CommandBus,
        private registerCustomerValidator: RegisterOrderValidator,
    ) {}

    async register(
        registerOrderRequestDto: RegisterOrderRequestDto,
    ): Promise<Result<AppNotification, RegisterOrderResponseDto>> {
        const notification: AppNotification = await this.registerCustomerValidator.validate(
            registerOrderRequestDto,
        );
        if (notification.hasErrors()) {
            return Result.error(notification);
        }
        const orderRegisterCommand: OrderRegisterCommand = new OrderRegisterCommand(
            registerOrderRequestDto.description,
            registerOrderRequestDto.orderDate,
        );
        const orderId = await this.commandBus.execute(orderRegisterCommand);
        const registerOrderResponseDto: RegisterOrderResponseDto = new RegisterOrderResponseDto(
            orderId,
            registerOrderRequestDto.description,
            registerOrderRequestDto.orderDate,
        );
        return Result.ok(registerOrderResponseDto);
    }
}
