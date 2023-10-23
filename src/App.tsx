import { useState } from 'react'
import './App.css'
import Home from './page/home/index'
import TopMenu from './Components/TopMenu'
import { ConfigProvider, Col, Row, Switch } from 'antd';
import router from './router/router'
import "./theme/custom-dark.css"
import "./theme/custom-default.css"
import { Route, useNavigate, useRoutes } from 'react-router-dom';
import {AppstoreOutlined, MailOutlined, SettingOutlined} from '@ant-design/icons';




function App() {
  const [prefix, setPrefix] = useState("custom-default");
  //菜单列表
  const [menuitem,setMenuitem] = useState([
    {
      label: '首页',
      key: '/',
      icon: <MailOutlined />,
    },
    {
      label: '保留菜单',
      key: '/Ed',
      icon: <AppstoreOutlined />,
    },
    {
      label: '保留菜单（带下拉）',
      key: 'SubMenu',
      icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            {
              label: 'Option 1',
              key: 'setting:1',
            },
            {
              label: 'Option 2',
              key: 'setting:2',
            },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            {
              label: 'Option 3',
              key: 'setting:3',
            },
            {
              label: 'Option 4',
              key: 'setting:4',
            },
          ],
        },
      ],
    }
  ])
  //logo
  const [logo,setLogo]=useState("https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png")
  const element = useRoutes(router);
  const handlePrefixChange = (e) => {
    console.log(e)
    setPrefix(e);
  }

  // const [theme, setTheme] = useState<MenuTheme>('light');
  const changeTheme = (value: boolean) => {
    setPrefix(value ? 'custom-dark' : 'custom-default');
  };

  return (

    <ConfigProvider prefixCls={prefix}>

      <div className={` ${prefix}`} style={{ height: '100%' }}>
        <div className="zmenu">

          <Row gutter={24}
            style={{ margin: "0 auto", background: prefix == "custom-dark" ? "black" : "white" }}
          >
            <Col span={22}
            >
              <TopMenu className="menu" Menuitem={menuitem} logo={logo}/>
            </Col>
            <Col span={2}
            
            >
              <div style={{ width:"120px"}}>
              昼夜
              <Switch
                style={{ margin: "10px" }}
                value={prefix}
                checked={prefix === 'custom-dark'}
                onChange={changeTheme}
                checkedChildren="昼"
                unCheckedChildren="夜"
              />
              </div>
              
            </Col>
          </Row>
          {/* <div className="theme">

          </div> */}
        </div>

        <div className="potion">
          
          {element}
          
          
          {/* <RouterProvider router={Router}></RouterProvider> */}

        </div>

      </div>
    </ConfigProvider>

  )
}

export default App
