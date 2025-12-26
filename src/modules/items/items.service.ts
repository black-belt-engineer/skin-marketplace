import { FastifyRedis } from '@fastify/redis';
import { SkinportApi } from './skinport-api';
import { ItemDto } from './interfaces/item.dto';
import { SkinportItem } from './interfaces/skinport-item.interface';

export class ItemsService {
    private readonly CACHE_TTL = 300;
    private readonly ITEMS_KEY = 'items_list'

    constructor(
        private readonly skinportApi: SkinportApi,
        private readonly redis: FastifyRedis,
    ) { }

    async getItems(): Promise<ItemDto[]> {
        const cached = await this.getCachedItems();
        if (cached) {
            return cached;
        }

        const items = await this.fetchAndProcessItems();
        await this.cacheItems(items);

        return items;
    }

    private async getCachedItems(): Promise<ItemDto[] | null> {
        const cached = await this.redis.get(this.ITEMS_KEY);
        return cached ? JSON.parse(cached) : null;
    }

    private async cacheItems(items: ItemDto[]): Promise<void> {
        await this.redis.set(this.ITEMS_KEY, JSON.stringify(items), 'EX', this.CACHE_TTL);
    }

    private async fetchAndProcessItems(): Promise<ItemDto[]> {
        const [tradableItems, nonTradableItems] = await Promise.all([
            this.skinportApi.getItems(true),
            this.skinportApi.getItems(false),
        ]);

        return this.mergeItems(tradableItems, nonTradableItems);
    }

    private mergeItems(tradableItems: SkinportItem[], nonTradableItems: SkinportItem[]): ItemDto[] {
        const itemMap = new Map<string, ItemDto>();

        for (const item of nonTradableItems) {
            itemMap.set(item.market_hash_name, this.mapToDto(item, null, item.min_price));
        }

        for (const item of tradableItems) {
            if (itemMap.has(item.market_hash_name)) {
                const existing = itemMap.get(item.market_hash_name)!;
                existing.minPriceTradable = item.min_price;
                existing.quantity += item.quantity; // Sum quantity
            } else {
                itemMap.set(item.market_hash_name, this.mapToDto(item, item.min_price, null));
            }
        }

        return Array.from(itemMap.values());
    }

    private mapToDto(
        item: SkinportItem,
        minPriceTradable: number | null,
        minPriceNonTradable: number | null,
    ): ItemDto {
        return {
            marketHashName: item.market_hash_name,
            currency: item.currency,
            suggestedPrice: item.suggested_price,
            itemPage: item.item_page,
            marketPage: item.market_page,
            minPrice: item.min_price,
            maxPrice: item.max_price,
            meanPrice: item.mean_price,
            medianPrice: item.median_price,
            quantity: item.quantity,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
            minPriceTradable,
            minPriceNonTradable,
        };
    }
}
