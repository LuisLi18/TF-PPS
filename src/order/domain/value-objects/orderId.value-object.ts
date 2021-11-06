export class OrderId{
    private readonly id: number;
    private constructor(id:number) {
        this.id = id;
    }
    public static create(id:number){
        return new OrderId(id);
    }
    public getId():number{
        return this.id;
    }

}