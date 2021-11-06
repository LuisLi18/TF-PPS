export class Address{
    private readonly address:string;
    private constructor(address:string){
        this.address = address;
    }
    public static create(address:string){
        return new Address(address);
    }
    public getAddress():string{
        return this.address;
    }
}