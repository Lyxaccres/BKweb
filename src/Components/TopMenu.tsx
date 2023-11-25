import React, { useState } from 'react';
import { FormOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import { MenuProps, MenuTheme, Col, Row, Image, Button, Avatar, Space, Badge, Dropdown } from 'antd';
import { Menu } from 'antd';
import { getStorage } from '../uitl/localStotage';
import { useNavigate, Link } from "react-router-dom";
import Router from '../router/router';




const App: React.FC = (props) => {
  const items: MenuProps['items'] = props.Menuitem;
  const [current, setCurrent] = useState('mail');
  //const [theme] = useState<MenuTheme>('light');
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);

    navigate(e.key)
  };

  function EditArtice() {
    navigate("/Editor")
  }
  function getSin() {
    if (getStorage('BK_User').nickname == null) {
      navigate("/Login")
    }
    navigate("/Personal")
  }

  return <>
    <Row gutter={24}>
      <Col span={2}>
        <Image
          width={100}
          height={46}
          src={props.logo}
        />
      </Col>
      <Col span={16} style={{ height: "46px" }}>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        {/* <TopMenu className="menu" /> */}
      </Col>
      <Col span={5}
        style={{ margin: "7px", width: "400px" }}
      >
        <Space size={20} wrap style={{ width: "400px" }}>
          <div >
            {/*  */}
            {<Link to={getStorage('BK_User').nickname != null ? '/Personal' : '/Login'}>
              {
                getStorage('BK_User').nickname != null ?
                getStorage('BK_User').nickname
                  // <Dropdown menu={item}>
                  //   <a onClick={(e) => e.preventDefault()}>
                  //     <Space onClick={getSin}>
                  //       {getStorage('BK_User').nickname}
                  //       <DownOutlined />
                  //     </Space>
                  //   </a>
                  // </Dropdown>
                  : "登录"}
            </Link>}
            {/* <a type="link" size={'default'} > {localStorage.getItem('BK_User') != null ? JSON.parse(localStorage.getItem('BK_User')).nickname : "没登录"} </a> */}
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          </div>
          <Badge dot><a href="#" >消息</a></Badge>
          <Badge><a href="#">历史</a></Badge>
          <Button type="primary" size={'default'} onClick={EditArtice}>去发布<FormOutlined /></Button>
        </Space>
      </Col>
    </Row>
  </>



};

export default App;