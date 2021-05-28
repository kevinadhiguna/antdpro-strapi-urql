import { useState } from 'react';
import { Form, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { useMutation } from 'urql';
import { CREATEJUVENTUS, UPLOADPROFPIC } from '@/graphql/mutation';

import Swal from 'sweetalert2';

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
  const [profpic, setProfpic] = useState<File | null>(null);

  const [createJuventusResult, createJuventus] = useMutation(CREATEJUVENTUS);
  const [uploadProfpicResult, uploadProfpic] = useMutation(UPLOADPROFPIC);

  const onFinish = async(values: File) => {
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

    try {
      await uploadProfpic({
        variables: {
          ref,
          refId, 
          profpic,
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Successfully Uploaded 🎉',
        text: 'Congrats!',
      });
    } catch (error) {
      console.error('Error during uploading pictures : ', error, ' variables : ', {
        ref,
        refId,
        profpic
      });

      Swal.fire({
        icon: 'error',
        title: 'Please input required pictures!',
        text: 'Error occured during uploading pictures',
      });

      return;
    }
  }

  return (
    <>
      <h1>Upload page</h1>
    </>
  );
};

export default UploadProfpic;
