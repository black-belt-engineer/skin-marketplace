export const itemSchema = {
    type: 'object',
    properties: {
        marketHashName: { type: 'string' },
        currency: { type: 'string' },
        suggestedPrice: { type: 'number', },
        itemPage: { type: 'string' },
        marketPage: { type: 'string' },
        minPrice: { type: 'number', },
        maxPrice: { type: 'number', },
        meanPrice: { type: 'number', },
        medianPrice: { type: 'number', },
        quantity: { type: 'number' },
        createdAt: { type: 'number' },
        updatedAt: { type: 'number' },
        minPriceTradable: { type: 'number', nullable: true },
        minPriceNonTradable: { type: 'number', nullable: true },
    },
} as const;

export const getItemsSchema = {
    response: {
        200: {
            type: 'array',
            items: itemSchema,
        },
    },
};
