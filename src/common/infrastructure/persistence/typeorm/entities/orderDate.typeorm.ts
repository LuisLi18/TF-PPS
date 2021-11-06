import {CreateDateColumn} from "typeorm";

export class OrderDateTypeorm{
    @CreateDateColumn('date')
    value:number;

    private constructor(value:number){
        this.value = value;
    }
    public static from(value: number):OrderDateTypeorm{
        return new OrderDateTypeorm(value);
    }
}