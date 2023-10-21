import React,{  useState } from 'react'
import { Image, Menu, Space, Descriptions, Row, Col, Card,Tag } from 'antd';
import type { MenuProps } from 'antd';
import "./personal.css"


const Personal: React.FC = (props) => {
    const [menuitem,setMenuitem] = useState([
        {
          label: '我的文章',
          key: '/',
          icon: '',
        },
        {
          label: '编辑信息',
          key: '/Ed',
          icon: '',
        },
        
        // {
        //   label: '保留菜单（带下拉）',
        //   key: 'SubMenu',
        //   icon: '',
        //   children: [
        //     {
        //       type: 'group',
        //       label: 'Item 1',
        //       children: [
        //         {
        //           label: 'Option 1',
        //           key: 'setting:1',
        //         },
        //         {
        //           label: 'Option 2',
        //           key: 'setting:2',
        //         },
        //       ],
        //     },
        //     {
        //       type: 'group',
        //       label: 'Item 2',
        //       children: [
        //         {
        //           label: 'Option 3',
        //           key: 'setting:3',
        //         },
        //         {
        //           label: 'Option 4',
        //           key: 'setting:4',
        //         },
        //       ],
        //     },
        //   ],
        // }
      ])
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
      };
    return (
        <>
            <div className="box">
                <img className="box-img" src="src\assets\6086c3fe8db8509f0d365f81744ef998.jpeg" alt="" />
                <div className="box-bg">
                    <div className="personal">
                        <div className="personal-top">
                            <Image className="personal-img"
                                width={140}
                                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                            <div className="personal-top-text" style={{ fontSize: '18px', color: '#fff', position: 'relative' }}>
                                <div>昵称
                                <Space size={1} style={{ marginLeft: '10px'}}>
                                    <Tag color="orange">orange</Tag>
                                    <Tag color="gold">gold</Tag>
                                    <Tag color="lime">lime</Tag>
                                    <Tag color="green">green</Tag>
                                    <Tag color="cyan">cyan</Tag>
                                    <Tag color="blue">blue</Tag>
                                </Space>
                                </div>
                                <div style={{ fontSize: '14px', color: 'rgb(161, 161, 161)' }}>
                                    1123123
                                </div>
                                <div style={{ position: 'absolute', bottom: '35px' }}>
                                    <Space size={15} style={{ fontSize: '12px' }}>
                                        <Descriptions.Item >文章：0</Descriptions.Item>
                                        {/* <Descriptions.Item >点赞:0</Descriptions.Item>
                                <Descriptions.Item >收藏:0</Descriptions.Item> */}
                                        <Descriptions.Item >浏览：0</Descriptions.Item>
                                    </Space>
                                </div>
                            </div>
                        </div>
                        <div className="personal-message">
                            <Row gutter={24}>
                                <Col span={4}>
                                    <Card bordered={false} >
                                        <Menu 
                                            onClick={onClick}
                                            style={{ padding: '0' }}
                                            defaultSelectedKeys={['/']}
                                            mode="inline"
                                            items={menuitem}
                                        />
                                    </Card>
                                </Col>
                                <Col span={20}>
                                    <Card bordered={false}>
                                        Card content
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Personal;