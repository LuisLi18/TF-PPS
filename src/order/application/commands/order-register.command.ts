export class OrderRegisterCommand{
    constructor(
        public readonly description:string,
        public readonly orderDate:number,
    ){}
}