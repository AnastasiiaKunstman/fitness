export interface Tariff {
    name: string,
    price: number,
    lengthInDays: number,
    isPopular: boolean,
    isEndless: boolean,
    isDiscount: boolean,
    nonDiscountId: null,
    id: number,
    ownerId: number,
    statusId: null,
    creationDateTime: number,
    deleted: boolean
}