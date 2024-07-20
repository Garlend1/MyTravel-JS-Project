import { INCREMENT, DECREMENT } from '../types/types';
const initialState = {
  value: 0,
  isLoading: false,
};

export const CounterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        value: state.value + action.payload,
      };
    case DECREMENT:
      return {
        ...state,
        value: state.value - action.payload,
      };
    case 'LOADING':
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    default:
      return state;
  }
};
