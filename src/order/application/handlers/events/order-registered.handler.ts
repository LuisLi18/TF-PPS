import {OrderRegisteredEvent} from "../../../domain/events/order-registered-event";
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';

@EventsHandler(OrderRegisteredEvent)
export class OrderRegisteredHandler implements IEventHandler<OrderRegisteredEvent> {
    constructor() {}

    handle(event: OrderRegisteredEvent) {
        console.log('handle logic for CustomerRegisteredEvent');
        console.log(event);
    }
}