import { httpClient } from '../../infra/http/http-client';
import { SKINPORT_BASE_URL } from '../../config/app-config';
import { SkinportItem } from './interfaces/skinport-item.interface';

export class SkinportApi {
    async getItems(tradable: boolean): Promise<SkinportItem[]> {
        return httpClient.get<SkinportItem[]>(`${SKINPORT_BASE_URL}/items`, {
            tradable: tradable ? 1 : 0,
        });
    }
}
