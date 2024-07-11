import React, { useState } from 'react';
import styles from './Profile.module.css'; // Предполагаем, что у вас уже есть этот CSS-модуль
import { Button } from '@mui/material';

import { useAuth } from '../../hook';

const Profile = () => {
  const auth = useAuth();

  const handleLogout = () => {
    auth.signout(() => {
      console.log('вы вышли из системы');
    });
  };

  // Пример данных пользователя
  const [user, setUser] = useState({
    name: 'Павел Михайлов',
    email: 'garlend123@gmail.com',
    bio: 'Люблю путешествовать и изучать новое.',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_YyqsqTrWnefQphGSL198DzpmkoQTTRh_YQ&s', // Пример ссылки на аватар
  });

  return (
    <div className={styles.container}>
      <img src={user.avatarUrl} alt="Аватар" className={styles.avatar} />
      <h1 className={styles.title}>{user.name}</h1>
      <p className={styles.bio}>{user.bio}</p>
      <a href={`mailto:${user.email}`} className={styles.email}>
        {user.email}
      </a>
      <Button onClick={handleLogout} sx={{ mt: 8 }} variant="outlined">
        Выйти из профиля
      </Button>
    </div>
  );
};

export default Profile;
