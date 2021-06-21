import { useState } from 'react';
import { Form, Button, Upload } from 'antd';
import { FileImageOutlined, UploadOutlined } from '@ant-design/icons';

import { useMutation } from 'urql';
import { ADDJUVENTUSPLAYER, UPLOADPROFPIC } from '@/graphql/mutation';

import Swal from 'sweetalert2';

import DevelopmentAlert from '@/components/DevelopmentAlert';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const uploadedFile = (e: any) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const UploadProfpic = () => {
  const [uploadForm] = Form.useForm();

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [createJuventusResult, createJuventus] = useMutation(ADDJUVENTUSPLAYER);
  const [uploadProfpicResult, uploadProfpic] = useMutation(UPLOADPROFPIC);

  const isClickable: boolean = profilePicture != null;

  const onFinish = async (values: File) => {
    console.log('Received values from Form : ', values);

    setIsLoading(true);

    let refId;

    try {
      const { data, error: createJuventusError } = await createJuventus();

      refId = data.createJuventus.juventus.id;

      if (createJuventusError) {
        console.error('An error happened during Juventus record creation :', createJuventusError);
      }
    } catch (error) {
      console.error('Error occured during record creation : ', error);

      Swal.fire({
        icon: 'error',
        title: 'Please try again...',
        text: 'Error occured during record creation',
      });

      setIsLoading(false);

      return;
    }

    const ref = 'juventus';
    const field = 'profpic';

    try {
      await uploadProfpic({
        refId,
        ref,
        field,
        file: profilePicture,
      });

      Swal.fire({
        icon: 'success',
        title: 'Successfully Uploaded 🎉',
        text: 'Congrats!',
      });

      uploadForm.resetFields();

      setProfilePicture(null);
      setIsLoading(false);
    } catch (error) {
      console.error('Error during uploading pictures : ', error, ' variables : ', {
        refId,
        ref,
        field,
        file: profilePicture,
      });

      Swal.fire({
        icon: 'error',
        title: 'Oops.. something went wrong',
        text: 'Please try again later',
      });

      setIsLoading(false);
    }
  };

  return (
    <>
      <DevelopmentAlert />
      <h1>Upload page</h1>
      <Form name="upload" form={uploadForm} {...formItemLayout} onFinish={onFinish}>
        <Form.Item
          name="upload"
          label="Profile Picture"
          valuePropName="fileList"
          getValueFromEvent={uploadedFile}
          extra="Please upload your profile picture here"
        >
          <Upload
            name="logo"
            action="/upload.do"
            listType="picture"
            accept="image/png, image/jpeg"
            // Use 'beforeUpload' function instead of 'onChange' function as 'onChange' function does not allow to upload a file
            beforeUpload={(e) => {
              setProfilePicture(e);
              return false;
            }}
            onRemove={() => setProfilePicture(null)}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            icon={<FileImageOutlined />}
            loading={isLoading}
            disabled={!isClickable}
          >
            Set Profile Picture now
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UploadProfpic;
