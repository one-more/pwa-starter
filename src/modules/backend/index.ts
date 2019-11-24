type Collections = 'errors';

interface Collection {
    add(data: object): Promise<unknown>;
}

export function toCollection(collection: Collections): Collection {
    return {
        add(data) {
            return Promise.resolve();
        },
    };
}
