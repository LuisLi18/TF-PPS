import { PrimaryGeneratedColumn } from 'typeorm';
export class OrderIdTypeorm{
    @PrimaryGeneratedColumn('increment', {type:'bigint', name:'id', unsigned: true})
    value:number

    private constructor(value:number){
        this.value = value;
    }
    public static from(value: number):OrderIdTypeorm{
        return new OrderIdTypeorm(value);
    }
}