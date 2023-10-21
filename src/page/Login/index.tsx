import { React, useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input,Image,message  } from 'antd';
import { useNavigate,Link } from "react-router-dom";
import { Signin} from './server'
import { setStorage } from '../../uitl/localStotage';
import "./login.css"

const Login: React.FC = (props) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: any) => {
    const params = {
      email:values.username,
      pwd:values.password
    }
    Signin(params).then(res=>{
      
      if(res.data.code == "999"){
        messageApi.open({
          type: 'error',
          content: res.data.data,
      });
      }
      else{
        //保持token和user信息
        setStorage('BK_Token', JSON.stringify(res.data.data.token), 1);
        setStorage('BK_User', JSON.stringify(res.data.data), 1);
        messageApi.open({
          type: 'success',
          content: "登录成功",
      });
      setTimeout(() => {
        navigate("/")
      }, 1000);
        
        
      }
    })
    //console.log('Received values of form: ', values);
  };
  return <>
  {contextHolder}
    <div className="Loginboby">
    
      <p>登录</p>
      <div className="loginfrom">
       
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username" 
            rules={[{ required: true, message: '请输入你的邮箱' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入你的密码' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              忘记密码
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" block>
              登录
            </Button>
            <Link to={"/Register"}>去注册一个？</Link>
            {/* <a href=>去注册一个？</a> */}
          </Form.Item>
        </Form>
      </div>
    </div>

  </>
}
export default Login;