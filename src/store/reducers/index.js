import { combineReducers } from 'redux';
import { CounterReducer } from './counterReducers';
import { todoReducer } from './todoReducer';
import { photoReducer } from './photoReducer';

const rootReducer = combineReducers({
  counter: CounterReducer,
  todoReducer: todoReducer,
  photoReducer: photoReducer,
});

export default rootReducer;
