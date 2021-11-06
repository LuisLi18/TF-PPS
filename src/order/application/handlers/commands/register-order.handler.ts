import {OrderRegisterCommand} from "../../commands/order-register.command";
import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {OrderTypeorm} from "../../../infrastructure/persistence/typeorm/entities/order.typeorm";
import {Repository} from "typeorm";
import {AppNotification} from "../../../../common/application/app.notification";
import {Result} from "typescript-result";
import {OrderFactory} from "../../../domain/factories/order.factory";
import {Order} from "../../../domain/root-entity/order.root-entity";
import {OrderMapper} from "../../mappers/order.mapper";
import {OrderId} from "../../../domain/value-objects/orderId.value-object";

@CommandHandler(OrderRegisterCommand)
export class RegisterOrderHandler implements ICommandHandler<OrderRegisterCommand>{
    constructor(
        @InjectRepository(OrderTypeorm)
        private orderRepository: Repository<OrderTypeorm>,
        private publisher: EventPublisher,
    ) {
    }
    async execute(command:OrderRegisterCommand){
        let call:Order;
        let order: Order = OrderFactory.createFrom(call.getDescription(), call.getOrderDate());
        let customerTypeORM = OrderMapper.toTypeorm(order);
        customerTypeORM = await this.orderRepository.save(customerTypeORM);
        if (customerTypeORM == null) {
            return 0;
        }
        const orderId:number = Number(customerTypeORM.id.value);
        order.changeOrderId(OrderId.create(orderId));
        order = this.publisher.mergeObjectContext(order);
        order.register();
        order.commit();
        return orderId;
    }

}