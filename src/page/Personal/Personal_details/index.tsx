import React, { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  Upload,
  UploadFile,
  UploadProps,
  Row,Col,Card
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';
import ImgCrop from 'antd-img-crop';
import { useNavigate } from 'react-router-dom';
import { getStorage } from '../../../uitl/localStotage'
import { UserDetails } from './server';



const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Personal_details: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  useEffect(() => {
    if (getStorage('BK_User').guid == null) {
      navigate("/Login", { replace: false })
    };
    const params = {
      uid: getStorage('BK_User').guid
    }
    UserDetails(params).then(res => {
      console.log(res)
    })
  }, [])

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const [fileList, setFileList] = useState<UploadFile[]>([
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
  ]);
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const props: UploadProps = {
    action: 'http://localhost:5204/api/Tests/ImgUpload',
    listType: 'picture-card',
    // onChange(file) {
    //     if (file.file.response != null) {
    //         setimgsrc(file.file.response.data.href)
    //     }
    // },
  };

  return (
    <>
      <Row gutter={24}>
        <Col span={24}>
          信息编辑：
          <Card bordered={true} style={{ margin: '12px' }}>
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
              style={{ maxWidth: 500 }}
              scrollToFirstError
            >
              <Form.Item label="头像" valuePropName="fileList" name="avt">
                {/* <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload> */}
                <ImgCrop rotationSlider >
                  <Upload
                    {...props}
                    // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    // listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}

                  >
                    {fileList.length < 1 && '+ 上传头像'}
                  </Upload>
                </ImgCrop>
              </Form.Item>

              <Form.Item
                name="UID"
                label="UID"
                
              >
                <Input disabled={true} defaultValue="123123123123" />
              </Form.Item>

              <Form.Item
                name="nickname"
                label="昵称"
              >
                <Input value="1313"/>
              </Form.Item>

              <Form.Item
                name="username"
                label="用户名"
                
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    // required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="last_login_time"
                label="最近登录时间"
              >
                <Input disabled={true} />
              </Form.Item>

              <Form.Item
                name="phone"
                label="手机号"
              >
                <Input />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={24} >
          预留：
          <Card bordered={true} style={{ margin: '12px' }}>
            {/* <Outlet /> */}
          </Card>
        </Col>
      </Row>
    </>

  );
};

export default Personal_details;