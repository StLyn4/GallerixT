import * as types from './types';

// Шаблон асинхронного действия
// Используется если необходимо асинхронное действие.
// Например, загрузка файла, информации
// export const asyncAction = (...) => {
//   return async (dispatch) =>
//     dispatch({
//       type: types.TYPE,
//       payload: ...,
//     });
// };

export const changeTheme = (isDark) => {
  return {
    type: types.CHANGE_THEME,
    payload: { isDark },
  };
};

export const toggleTheme = () => {
  return {
    type: types.TOGGLE_THEME,
  };
};
