import { useState } from 'react';
import { Form, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { useMutation } from 'urql';
import { CREATEJUVENTUS, UPLOADPROFPIC } from '@/graphql/mutation';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};


const UploadProfpic = () => {
  const [profpic, setProfpic] = useState<File | null>(null);

  const [CreateJuventus] = useMutation(CREATEJUVENTUS);
  const [UploadProfpic] = useMutation(UPLOADPROFPIC);

  return (
    <>
      <h1>Upload page</h1>
    </>
  );
};

export default UploadProfpic;
