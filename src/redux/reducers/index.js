import { combineReducers } from 'redux';
import main from './main.reducer';

// На тот случай, если нужно будет в будущем 2+ редуктора
const combined = combineReducers({
  main,
});

export default combined;
