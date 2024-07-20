import { INCREMENT, DECREMENT } from '../types/types';

export const incrementAction = (payload) => {

  return {
    type: INCREMENT,
    payload
  };
};

export const decrementAction = (payload) => {
  return {
    type: DECREMENT,
    payload
  };
};