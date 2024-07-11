import React from 'react';
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

const CreateCommentModal = ({ isModalVisible, setIsModalVisible }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  if (!isModalVisible) return null;

  const onSubmit = (data) => {
    setIsModalVisible(false);
  };
  return (
    <Modal
      open={isModalVisible}
      onClose={() => setIsModalVisible(false)}
      aria-labelledby="create-review-modal-title"
      aria-describedby="create-review-modal-description"
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
          label="Название отзыва"
          {...register('title', {
            required: 'Название отзыва обязательно',
            maxLength: {
              value: 30,
              message: 'Слишком длинное название отзыва',
            },
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Текст отзыва"
          multiline
          rows={4}
          {...register('body', {
            required: 'Текст отзыва обязателен',
            maxLength: {
              value: 500,
              message: 'Слишком длинный текст отзыва',
            },
          })}
          error={!!errors.body}
          helperText={errors.body?.message}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Рейтинг"
          {...register('rate', {
            required: 'Пожалуйста, введите рейтинг',
            valueAsNumber: true,
            min: {
              value: 1,
              message: 'Rate должен быть целочисленный от 1 до 5',
            },
            max: {
              value: 5,
              message: 'Rate должен быть целочисленный от 1 до 5',
            },
            validate: (value) =>
              (value >= 1 && value <= 5) ||
              'Rate должен быть целочисленный от 1 до 5',
          })}
          type="number"
          error={!!errors.rate}
          helperText={errors.rate?.message}
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button color="primary" onClick={() => setIsModalVisible(false)}>
            Отмена
          </Button>
          <Button type="submit" color="primary">
            Создать отзыв
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateCommentModal;
