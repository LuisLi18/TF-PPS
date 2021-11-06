import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/common/application/app.notification';
import { RegisterOrderRequestDto} from "../dtos/request/register-order-request.dto";
import { Repository } from 'typeorm';
import { OrderTypeorm} from "../../infrastructure/persistence/typeorm/entities/order.typeorm";

@Injectable()
export class RegisterOrderValidator {
    constructor(
        @InjectRepository(OrderTypeorm)
        private customerRepository: Repository<OrderTypeorm>,
    ) {
    }

    public async validate(
        RegisterOrderRequestDto: RegisterOrderRequestDto,
    ): Promise<AppNotification> {
        let notification: AppNotification = new AppNotification();
        const description: string = RegisterOrderRequestDto.description.trim();
        if (description.length <= 0) {
            notification.addError('Customer description is required', null);
        }
        const orderDate: number = RegisterOrderRequestDto.orderDate;
        if (orderDate <= 0) {
            notification.addError('Customer orderDate is required', null);
        }
        if (notification.hasErrors()) {
            return notification;
        }
        return notification;
    }
}