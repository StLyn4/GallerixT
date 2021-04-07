import * as types from '../actions/types';

const INITIAL_STORE = {};

const reducer = (state = INITIAL_STORE, action) => {
  switch (action.type) {
    case types.TYPE:
      return {
        ...state,
        /* Changes */
      };

    default:
      return state;
  }
};

export default reducer;
