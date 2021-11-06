import {Order} from "../root-entity/order.root-entity";
import {OrderId} from "../value-objects/orderId.value-object";
import {Address} from "../value-objects/address.value-object";
export class OrderFactory{
    public static createFrom(description:string, orderDate:number):Order{
            return new Order(OrderId.create(0), description, orderDate, Address.create(''));
        }
    public static withId(orderId:OrderId, description:string, orderDate:number, address:Address):Order{
            return new Order(orderId, description, orderDate, address);
    }
}