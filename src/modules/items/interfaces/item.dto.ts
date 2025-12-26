export interface ItemDto {
    marketHashName: string;
    currency: string;
    suggestedPrice: number;
    itemPage: string;
    marketPage: string;
    minPrice: number;
    maxPrice: number;
    meanPrice: number;
    medianPrice: number;
    quantity: number;
    createdAt: number;
    updatedAt: number;
    minPriceTradable: number | null;
    minPriceNonTradable: number | null;
}
