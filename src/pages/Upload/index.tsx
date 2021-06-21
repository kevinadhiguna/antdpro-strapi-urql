import { useState } from 'react';
import { Form, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

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
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const [createJuventusResult, createJuventus] = useMutation(ADDJUVENTUSPLAYER);
  const [uploadProfpicResult, uploadProfpic] = useMutation(UPLOADPROFPIC);

  const onFinish = async (values: File) => {
    console.log('Received values from Form : ', values);

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

      return;
    }

    const ref = 'juventus';
    const field = 'profpic';

    try {
      await uploadProfpic({
        variables: {
          refId,
          ref,
          field,
          file: profilePicture,
        },
      });

      console.info('refId : ', refId);
      console.info('ref : ', ref);
      console.info('field : ', field);
      console.info('file : ', profilePicture);

      if (uploadProfpicResult.data !== undefined) {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Uploaded 🎉',
          text: 'Congrats!',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops.. something went wrong',
          text: 'Please try again later',
        });
      }
    } catch (error) {
      console.error('Error during uploading pictures : ', error, ' variables : ', {
        refId,
        ref,
        field,
        file: profilePicture,
      });

      Swal.fire({
        icon: 'error',
        title: 'Please input required pictures!',
        text: 'Error occured during uploading pictures',
      });

      return;
    }
  };

  return (
    <>
      <DevelopmentAlert />
      <h1>Upload page</h1>
      <Form name="validate_other" {...formItemLayout} onFinish={onFinish}>
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
          <Button type="primary" htmlType="submit">
            Set Profile Picture now
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UploadProfpic;
