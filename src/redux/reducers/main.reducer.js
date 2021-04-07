import * as types from '../actions/types';
import LightTheme from 'app/themes/light';
import DarkTheme from 'app/themes/dark';

const INITIAL_STORE = {
  theme: DarkTheme,
};

const reducer = (state = INITIAL_STORE, action) => {
  switch (action.type) {
    case types.CHANGE_THEME:
      return {
        ...state,
        theme: action.payload.isDark ? DarkTheme : LightTheme,
      };
    case types.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme.dark ? LightTheme : DarkTheme,
      };

    default:
      return state;
  }
};

export default reducer;
