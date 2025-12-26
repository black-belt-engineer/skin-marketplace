import { FastifyInstance } from 'fastify';
import { SkinportApi } from './skinport-api';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { getItemsSchema } from './items.schema';

export async function itemsModule(fastify: FastifyInstance) {
    const skinportApi = new SkinportApi();
    const itemsService = new ItemsService(skinportApi, fastify.redis);
    const itemsController = new ItemsController(itemsService);

    fastify.get('/items', { schema: getItemsSchema }, itemsController.getItems.bind(itemsController));
}
