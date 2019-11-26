import { persistor, store, version } from './index';
import { errorsDefaultState } from '~/modules/errors';
import { persistStore } from 'redux-persist';

describe('store', () => {
    it('creates reducers tree', () => {
        expect(store.getState()).toStrictEqual({
            errors: errorsDefaultState,
            router: {
                action: 'POP',
                location: {
                    hash: '',
                    pathname: '/',
                    query: {},
                    search: '',
                    state: undefined,
                },
            },
            _persist: {
                rehydrated: false,
                version,
            },
        });
    });
    it('exports persistor', () => {
        expect(Object.keys(persistor)).toEqual(Object.keys(persistStore(store)));
    });
});
