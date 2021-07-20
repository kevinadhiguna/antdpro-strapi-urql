import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, Button, Upload, message, Select } from 'antd';
import { useMutation } from 'urql';

import { ADDJUVENTUSPLAYER, UPLOADPROFPIC } from '@/graphql/mutation';
import DevelopmentAlert from '@/components/DevelopmentAlert';

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

const { Option } = Select;

const AddPlayer: React.FC = () => {
  // Call a form method
  const [addPlayerForm] = Form.useForm();

  // States to manage form data
  const [name, setName] = useState<string>('');
  const [number, setNumber] = useState<number | undefined>();
  const [age, setAge] = useState<number | undefined>();
  const [country, setCountry] = useState<string>('');
  const [appearences, setAppearences] = useState<number | undefined>();
  const [goals, setGoals] = useState<number | undefined>();
  const [minutesPlayed, setMinutesPlayed] = useState<number | undefined>();
  const [position, setPosition] = useState<string>('');
  const [profpic, setProfpic] = useState<File | null>(null);

  // A state to manage button
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isClickable: boolean =
    name != undefined &&
    number != undefined &&
    age != undefined &&
    country != undefined &&
    appearences != undefined &&
    goals != undefined &&
    minutesPlayed != undefined &&
    position != undefined &&
    profpic != null;

  // useMutations hooks to add a player and upload player's profile picture
  const [, addJuventusPlayer] = useMutation(ADDJUVENTUSPLAYER);
  const [, uploadProfpic] = useMutation(UPLOADPROFPIC);

  const normFile = (e: any) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  const onFinish = async (values: any) => {
    console.log('Values from Form : ', values);

    setIsLoading(true);

    // ID of the entry in Juventuses collection-type
    let refId;

    try {
      const addJuventusPlayerVariables = {
        input: {
          data: {
            name,
            number,
            age,
            country,
            appearences,
            goals,
            minutesPlayed,
            position,
          },
        },
      };

      const { data } = await addJuventusPlayer(addJuventusPlayerVariables);

      console.info('Data from addJuventusPlayer : ', data);

      // refId refers to the ID of the entry that Strapi created successfully
      refId = data.createJuventus.juventus.id;
    } catch (error) {
      console.error('Error occured during Juventus player record creation : ', error);

      // Display a notification on Strapi entry creation error
      message.error('Error occured during record creation !');

      // To not display loading spin on the verify button
      setIsLoading(false);

      // Avoid running the rest of code
      return;
    }

    // Define a content-type name in which images will be uplaoded
    const ref = 'juventus';
    const field = 'profpic';

    try {
      const uploadProfpicVariables = {
        ref,
        refId,
        field,
        file: profpic,
      };

      await uploadProfpic(uploadProfpicVariables);

      message.success('Successfully Uploaded 🎉');

      // Make the verify button not loading anymore
      setIsLoading(false);

      // Reset form fields and set all images' states to null
      addPlayerForm.resetFields();
      setProfpic(null);
    } catch (error) {
      console.error('Error during uploading the profile picture : ', error, ' variables : ', {
        ref,
        refId,
        field,
        profpic,
      });

      // Inform users that an error happened during uploading images
      message.error('Error occured during uploading the profile picture');

      // Stop showing the loading spin on the verify button
      setIsLoading(false);

      // The rest of code will not be executed
      return;
    }
  };

  // To-do :
  const onPositionChange = (value: string) => {
    switch (value) {
      // case 'GK':
      //   form.setFieldsValue({ note: 'Hi, man!' });
      //   return;
      // case 'DF':
      //   form.setFieldsValue({ note: 'Hi, lady!' });
      //   return;
      // case 'MF':
      //   form.setFieldsValue({ note: 'Hi there!' });
      // case 'FW':
      //   form.setFieldsValue({ note: 'Hi there!' });
    }
  };

  return (
    <>
      <DevelopmentAlert />
      <Form
        {...AddPlayerFormLayout}
        name="addPlayer"
        onFinish={onFinish}
        validateMessages={validateMessages}
        form={addPlayerForm}
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
          <Input value={name} onChange={(e) => setName(e.target.value)} />
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
          <InputNumber value={number} onChange={(e) => setNumber(e)} />
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
          <InputNumber value={age} onChange={(e) => setAge(e)} />
        </Form.Item>
        <Form.Item name="country" label="Country">
          <Input value={country} onChange={(e) => setCountry(e.target.value)} />
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
          <InputNumber value={appearences} onChange={(e) => setAppearences(e)} />
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
          <InputNumber value={goals} onChange={(e) => setGoals(e)} />
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
          <InputNumber value={minutesPlayed} onChange={(e) => setMinutesPlayed(e)} />
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
          {/* <Input value={position} onChange={(e) => setPosition(e.target.value)} /> */}
          <Select
            placeholder="Select a option and change input text above"
            onChange={onPositionChange}
            allowClear
          >
            <Option value="GK">GK</Option>
            <Option value="DF">DF</Option>
            <Option value="MF">MF</Option>
            <Option value="FW">FW</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="profpic"
          label="Profile Picture"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="Please upload player's picture"
          required={true}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Upload
            name="profilePicture"
            listType="picture"
            accept="image/png, image/jpeg"
            maxCount={1}
            // Use 'beforeUpload' function instead of 'onChange' function as 'onChange' function does not allow to upload a file
            beforeUpload={(e) => {
              setProfpic(e);
              return false;
            }}
            onRemove={() => setProfpic(null)}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ ...AddPlayerFormLayout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" loading={isLoading} disabled={!isClickable}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddPlayer;
