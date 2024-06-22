import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import styles from './About.module.css';
import AboutPosts from '../AboutPosts/AboutPosts';
import ListWithStyle from '../ListWithStyle/ListWithStyle';

const About = () => {
  const complexCompute = (id) => {
    let i = 0;
    while (i < 1000000000) i++;
    return id;
  };
  const [inputValue, setInputValue] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(true);
  const [inputBorderColor, setInputBorderColor] = useState('black');
  const [listStyle, setListStyle] = useState({});
  const [counter, setCounter] = useState(0);
  const [computedValue, setComputedValue] = useState(null);
  const inputRef = useRef(null);
  const renderCount = useRef(0);
  const [posts, setPosts] = useState([]);
  const userId = useMemo(() => complexCompute(counter), [counter]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleContentChange = useCallback(() => {
    const computedValue = complexCompute(counter);
    setComputedValue(computedValue);
    console.log( `Сount изменён: ${computedValue}`);
  }, [counter]);
  const changeListStyle = () => {
    setListStyle({
      ...listStyle,
      color: listStyle.color === 'black' ? 'red' : 'black',
    });
  };

  const toggleInputVisibility = () => {
    setIsInputVisible(!isInputVisible);
  };

  const toggleInputBorderColor = () => {
    setInputBorderColor(inputBorderColor === 'black' ? 'red' : 'black');
  };

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const decrementCounter = () => {
    setCounter(counter - 1);
  };
  useEffect(() => {
    renderCount.current += 1;
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users/1/posts'
        );

        if (!response.ok) {
          throw new Error('Не удалось получить посты');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <div className="about">
      <h1>About - lesson-8 React Hooks</h1>

      {isInputVisible && (
        <input
          className={styles.input}
          ref={inputRef}
          type="text"
          value={inputValue}
          style={{ borderColor: inputBorderColor }}
          onChange={(e) => setInputValue(e.target.value)}
        />
      )}
      <div className={styles.buttonСontainer}>
        <button
          className={styles.button}
          onClick={toggleInputVisibility}
          style={{ backgroundColor: isInputVisible ? 'green' : 'red' }}
        >
          {isInputVisible ? 'Скрыть' : 'Показать'} поле ввода
        </button>
        <button className={styles.button} onClick={toggleInputBorderColor}>
          Поменять цвет
        </button>
        <button className={styles.button} onClick={incrementCounter}>
          Увеличить счетчик
        </button>
        <button className={styles.button} onClick={decrementCounter}>
          Уменьшить счетчик
        </button>
        <button className={styles.button} onClick={changeListStyle}>
          Изменить стиль списка
        </button>
      </div>
      <h2>Счетчик: {counter}</h2>
      <h2>Вычисленное значение: {computedValue}</h2>
      <AboutPosts inputValue={inputValue} userId={userId} />
      <ListWithStyle style={listStyle} count={counter} onContent={handleContentChange} />
    </div>
  );
};

export default About;
