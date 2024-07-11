import React, { useEffect } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const EditPostModal = ({
  isModalVisible,
  setIsModalVisible,
  handleEditPost,
  initialValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  if (!isModalVisible) return null;

  const onSubmit = (data) => {
    handleEditPost(data);
    setIsModalVisible(false);
  };

  return (
    <Modal
      open={isModalVisible}
      onClose={() => setIsModalVisible(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <TextField
          fullWidth
          margin="normal"
          label="Название поста"
          {...register('title', {
            required: 'Пожалуйста, введите название поста',
            maxLength: {
              value: 50,
              message: 'Название поста не должно превышать 50 символов',
            },
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Описание поста"
          multiline
          rows={4}
          {...register('body', {
            required: 'Пожалуйста, введите описание поста',
            maxLength: {
              value: 100,
              message: 'Описание поста не должно превышать 100 символов',
            },
          })}
          error={!!errors.body}
          helperText={errors.body?.message}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Ссылка на изображение"
          {...register('url', {
            required: 'Пожалуйста, введите ссылку на изображение',
            validate: (value) =>
              value.includes('http') || 'URL должен содержать http',
            pattern: {
              type: 'url',
              message: 'Пожалуйста, введите корректный URL',
            },
          })}
          error={!!errors.url}
          helperText={errors.url?.message}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Рейтинг"
          type="number"
          {...register('rate', {
            required: 'Пожалуйста, введите рейтинг',
            valueAsNumber: true,
            min: {
              value: 1,
              message: 'Рейтинг должен быть от 1 до 5',
            },
            max: {
              value: 5,
              message: 'Рейтинг должен быть от 1 до 5',
            },
          })}
          error={!!errors.rate}
          helperText={errors.rate?.message}
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button color="primary" onClick={() => setIsModalVisible(false)}>
            Отмена
          </Button>
          <Button type="submit" color="primary">
            Сохранить
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditPostModal;
