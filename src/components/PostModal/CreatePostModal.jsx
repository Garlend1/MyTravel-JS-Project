import React from 'react';
import { Form, Input, Modal } from 'antd';

const CreatePostModal = ({
  isModalVisible,
  setIsModalVisible,
  handleCreatePost,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Новый пост"
      open={isModalVisible}
      onOk={form.submit}
      onCancel={() => setIsModalVisible(false)}
      okText="Создать"
      cancelText="Отмена"
    >
      <Form
        form={form}
        onFinish={handleCreatePost}
        layout="vertical"
        initialValues={{
          title: '',
          body: '',
          url: '',
        }}
      >
        <Form.Item
          name="title"
          label="Название поста"
          rules={[
            { required: true, message: 'Пожалуйста, введите название поста' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="body"
          label="Описание поста"
          rules={[
            { required: true, message: 'Пожалуйста, введите описание поста' },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="url"
          label="Ссылка на изображение"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите ссылку на изображение',
            },
            { type: 'url', message: 'Пожалуйста, введите корректный URL' },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePostModal;
