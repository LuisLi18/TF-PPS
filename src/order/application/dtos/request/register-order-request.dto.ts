export class RegisterOrderRequestDto {
    constructor(
        public readonly description: string,
        public readonly orderDate: number,
    ) {}
}