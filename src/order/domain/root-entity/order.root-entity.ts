import {AggregateRoot} from "@nestjs/cqrs";
import {OrderId} from "../value-objects/orderId.value-object";
import{Address} from "../value-objects/address.value-object";
import {OrderRegisteredEvent} from "../events/order-registered-event";

export class Order extends AggregateRoot{
    private orderId: OrderId;
    private description:string;
    private orderDate:number;
    private address:Address;


    public constructor(orderId:OrderId, description:string, orderDate:number, address:Address){
        super();
        this.orderId = orderId;
        this.description = description;
        this.orderDate = orderDate;
        this.address = address;
    }
    public register() {
        const event = new OrderRegisteredEvent(
            this.orderId.getId(),
            this.description,
            this.orderDate,
            this.address.getAddress());
        this.apply(event);
    }
    public geOrderId():OrderId{
        return this.orderId;
    }
    public getDescription():string{
        return this.description;
    }
    public getOrderDate():number{
        return this.orderDate;
    }
    public getAddress():Address{
        return this.address;
    }
    public changeOrderId(orderId:OrderId):void{
        this.orderId = orderId;
    }
    public changeDescription(description:string):void{
        this.description = description;
    }
    public changeOrderDate(orderDate:number):void {
        this.orderDate = orderDate;
    }
    public changeAddress(address:Address):void {
        this.address = address;
    }

}