export class EditOrderRequestDto {
    constructor(
        public readonly description: string,
        public readonly orderDate: number,
    ) {}
}