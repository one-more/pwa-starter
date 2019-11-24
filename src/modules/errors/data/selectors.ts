import { ErrorsState, WithErrorsState } from '~/modules/errors';

export const errorsSelector = (state: WithErrorsState): ErrorsState => state.errors;
