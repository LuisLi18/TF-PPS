import {Order} from "../../domain/root-entity/order.root-entity";
import {OrderTypeorm} from "../../infrastructure/persistence/typeorm/entities/order.typeorm";
import {OrderDateTypeorm} from "../../../common/infrastructure/persistence/typeorm/entities/orderDate.typeorm";
import {OrderIdTypeorm} from "../../infrastructure/persistence/typeorm/entities/order.id.typeorm";
import {DescriptionTypeorm} from "../../../common/infrastructure/persistence/typeorm/entities/description.typeorm";

export class OrderMapper{
    public static toTypeorm(order:Order):OrderTypeorm{
        const orderTypeorm:OrderTypeorm = new OrderTypeorm();
        orderTypeorm.id = OrderIdTypeorm.from(order.geOrderId().getId());
        orderTypeorm.description = DescriptionTypeorm.from(order.getDescription());
        orderTypeorm.orderDate = OrderDateTypeorm.from(order.getOrderDate());
        return orderTypeorm;
    }

}