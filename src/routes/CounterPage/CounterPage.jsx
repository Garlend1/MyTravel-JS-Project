import React from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAction } from '../../store/reducers/todoReducer';
import {
  incrementAction,
  decrementAction,
} from '../../store/actions/counterActions';
import { useAuth } from '../../hook';


const CenteredDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const ButtonsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const CounterPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  const isLoading = useSelector((state) => state.counter.isLoading);
  const stateRedux = useSelector((state) => state);
  console.log({ stateRedux });
  // console.log({ count });

  const handlerIncrement = () => {
    const randomValue = Math.floor(Math.random() * 10);
    dispatch(incrementAction(randomValue));
  };

  const handlerDecrement = () => {
    dispatch(decrementAction(10));
  };
  
  return (
    <CenteredDiv>
      <h1>Счётчик: {count}</h1>
      <h1>LOADING: {isLoading ? 'loading...' : 'not loading'} </h1>
      <ButtonsRow>
        <Button onClick={handlerIncrement} variant="contained" sx={{ mt: 2 }}>
          Добавить
        </Button>
        <Button onClick={handlerDecrement} variant="contained" sx={{ mt: 2 }}>
          Убавить
        </Button>
        <Button
          onClick={() => dispatch({ type: 'LOADING' })}
          variant="contained"
          sx={{ mt: 2 }}
        >
          Очистить
        </Button>
        <Button
          onClick={() =>
            dispatch(addTodoAction({ Title: 'Todo', Body: 'Body' }))
          }
          variant="contained"
          sx={{ mt: 2 }}
        >
          Click todo state
        </Button>
      </ButtonsRow>
    </CenteredDiv>
  );
};

export default CounterPage;
