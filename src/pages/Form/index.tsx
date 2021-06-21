import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, Button, Upload } from 'antd';

const AddPlayerFormLayout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
    goals: '${label} is not a valid goal number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const AddPlayer: React.FC = () => {
  const normFile = (e: any) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form
      {...AddPlayerFormLayout}
      name="addPlayer"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="number"
        label="Number"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
            max: 99,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="age"
        label="Age"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
            max: 99,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name="country" label="Country">
        <Input />
      </Form.Item>
      <Form.Item
        name="appearences"
        label="Appearence(s)"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
            max: 1000,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="goals"
        label="Goal(s)"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="minutesPlayed"
        label="Minutes Played"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="position"
        label="Position"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="profpic"
        label="Profile Picture"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="Please upload player's picture"
        required={true}
      >
        <Upload
          name="profilePicture"
          listType="picture"
          accept="image/png, image/jpeg"
          maxCount={1}
          // Use 'beforeUpload' function instead of 'onChange' function as 'onChange' function does not allow to upload a file
          beforeUpload={(e) => {
            return false;
          }}
          onRemove={() => {}}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item wrapperCol={{ ...AddPlayerFormLayout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddPlayer;
