export class RegisterOrderResponseDto {
    constructor(
        public id:number,
        public readonly description: string,
        public readonly orderDate: number,
    ) {}
}