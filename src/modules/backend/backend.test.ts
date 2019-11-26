import { toCollection } from '~/modules/backend/index';

describe('backend', () => {
    describe('toCollection', () => {
        it('returns object with add method', () => {
            expect(toCollection('errors').add({})).toBeInstanceOf(Promise);
        });
    });
});
