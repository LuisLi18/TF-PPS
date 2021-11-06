export class OrderRegisteredEvent {
    constructor(
        public readonly id: number,
        public readonly description: string,
        public readonly orderDate: number,
        public readonly address: string,
    ) {}
}