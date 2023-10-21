import React, { useState } from 'react';
import { CascaderProps,message } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import {
    AutoComplete,
    Button,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
} from 'antd';
import {useNavigate, Link } from 'react-router-dom';
import { GetCaptcha, Register } from './server'
import "../login.css";

const { Option } = Select;

interface DataNodeType {
    value: string;
    label: string;
    children?: DataNodeType[];
}

const residences: CascaderProps<DataNodeType>['options'] = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
];

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

const App: React.FC = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();

    const [capId, setCapid] = useState("");

    const [captcha, setCaptcha] = useState("");

    const [form] = Form.useForm();

    //var capId = "";

    const onFinish = (values: any) => {
        console.log(capId)
        const params = {
            nickname:values.nickname,
            password:values.password,
            confirm:values.confirm,
            email:values.email,
            phone:values.phone,
            captcha:values.captcha,
            capId:capId.toString(),
            prefix:values.prefix
        }
        Register(params).then(res => {
            if (res.data.code == '999') {
                messageApi.open({
                    type: 'error',
                    content: res.data.data,
                });

                //刷新图形验证码
                Captcha()

            }
            else{
                messageApi.open({
                    type: 'success',
                    content: res.data.data,
                });
                setTimeout(() => {
                    navigate("/Login")
                  }, 1000);
            }
        })
        // console.log('Received values of form: ', values);//提交获取表单信息
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );



    function Captcha() {
        const ss = new Date().getSeconds()
        setCapid(ss)
        GetCaptcha(ss).then(res => {
            setCaptcha(res.data.data)
            
        })
    }

    return (
        <>
        {contextHolder}
        <div className="Loginboby">
            <p>注册</p>
            <div style={{ width: '100px' }}><Link to={"/Login"}><LeftOutlined />返回登录</Link></div>
            <div className="loginfrom">
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{ residence: ['zhejiang', 'hangzhou', 'xihu'], prefix: '86' }}
                    style={{ maxWidth: 600 }}
                    scrollToFirstError
                >

                    <Form.Item
                        name="nickname"
                        label="昵称"
                        tooltip="限制字数8字以内！"
                        rules={[{ required: true, message: '请输入你的昵称', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: '这不是一个正确的邮箱格式',
                            },
                            {
                                required: true,
                                message: '请输入你的邮箱！',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="设置密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入你的密码!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请确认你的密码',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('两个密码不一致'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item label="验证码" extra="">
                        <Row gutter={8}>
                            <Col span={12}>
                                <Form.Item
                                    name="captcha"
                                    noStyle
                                    rules={[{ required: true, message: '请填写正确的验证码' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <img src={captcha} alt="" style={{ width: "110px", height: "32px" }} onClick={Captcha} />
                            </Col>
                        </Row>
                    </Form.Item>

                    {/* <Form.Item
                        name="gender"
                        label="性别"
                        rules={[{ required: true }]}
                    >
                        <Select placeholder="选择你的性别" >
                            <Option value="0">女</Option>
                            <Option value="1">男</Option>
                            <Option value="2">保密</Option>
                        </Select>
                    </Form.Item> */}


                    <Form.Item
                        name="phone"
                        label="手机号(选填)"
                        rules={[{ required: false }]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    </Form.Item>




                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" block>
                            立即注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
        </>
    );
};

export default App;