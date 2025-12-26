export const httpClient = {
    async get<T>(url: string, params?: Record<string, string | number | boolean>): Promise<T> {
        const urlObj = new URL(url);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                urlObj.searchParams.append(key, String(value));
            });
        }

        const response = await fetch(urlObj.toString(), {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        return (await response.json()) as T;
    },
};
