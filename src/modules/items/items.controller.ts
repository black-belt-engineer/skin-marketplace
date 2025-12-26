import { FastifyRequest, FastifyReply } from 'fastify';
import { ItemsService } from './items.service';

export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    async getItems(_request: FastifyRequest, reply: FastifyReply) {
        const items = await this.itemsService.getItems();
        return reply.send(items);
    }
}
