import {Column, Entity} from "typeorm";
import {Unique} from "typeorm/browser";
import {OrderIdTypeorm} from "./order.id.typeorm";
import {DescriptionTypeorm} from "../../../../../common/infrastructure/persistence/typeorm/entities/description.typeorm";
import {OrderDateTypeorm} from "../../../../../common/infrastructure/persistence/typeorm/entities/orderDate.typeorm";

@Entity('order')
@Unique('UQ_order_description', ['description.value-object'])
export class OrderTypeorm{
    @Column((type) => OrderIdTypeorm, { prefix: false })
    public id: OrderIdTypeorm;
    @Column((type) => DescriptionTypeorm, { prefix: false })
    public description: DescriptionTypeorm;
    @Column((type) => OrderDateTypeorm, { prefix: false })
    public orderDate: OrderDateTypeorm;
}