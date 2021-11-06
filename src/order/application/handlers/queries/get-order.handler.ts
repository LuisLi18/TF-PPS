import {GetOrderQuery} from "../../queries/get-order.query";
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import {GetOrdersDto} from "../../dtos/queries/get-orders.dto";

@QueryHandler(GetOrderQuery)
export class GetOrderHandler implements IQueryHandler<GetOrderQuery> {
    constructor() {}

    async execute(query: GetOrderQuery) {
        const manager = getManager();
        const sql = `
    SELECT 
      id,
      description,
      orderDate as date,
    FROM 
      order`;
        const ormOrders = await manager.query(sql);
        if (ormOrders.length <= 0) {
            return [];
        }
        const order: GetOrdersDto[] = ormOrders.map(function (ormOrder) {
            let orderDto = new GetOrdersDto();
            orderDto.id = Number(ormOrder.id);
            orderDto.description = ormOrder.firstName;
            orderDto.orderDate = ormOrder.lastName;
            return orderDto;
        });
        return order;
    }
}