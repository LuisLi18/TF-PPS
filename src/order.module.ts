import { Module } from '@nestjs/common';
import {RegisterOrderHandler} from "./order/application/handlers/commands/register-order.handler";
import {OrderRegisteredHandler} from "./order/application/handlers/events/order-registered.handler";
import {GetOrderHandler} from "./order/application/handlers/queries/get-order.handler";
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {OrderTypeorm} from "./order/infrastructure/persistence/typeorm/entities/order.typeorm";
import {OrderApplicationService} from "./order/application/services/order-application.service";
import {RegisterOrderValidator} from "./order/application/validators/register-order.validator";
import {OrderController} from "./order/api/order.controller";

export const CommandHandlers = [RegisterOrderHandler];
export const EventHandlers = [OrderRegisteredHandler];
export const QueryHandlers = [GetOrderHandler];

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([OrderTypeorm]),
    ],
    controllers: [OrderController],
    providers: [
        OrderApplicationService,
        RegisterOrderValidator,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers
    ]
})
export class OrderModule {}