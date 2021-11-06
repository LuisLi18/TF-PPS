import { Column, Unique } from 'typeorm';
export class DescriptionTypeorm{
    @Column('varchar', {name:'description', length:50, nullable: true})
    value:string

    private constructor(value:string){
        this.value = value;
    }
    public static from(value: string):DescriptionTypeorm{
        return new DescriptionTypeorm(value);
    }
}