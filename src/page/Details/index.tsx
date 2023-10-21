import React ,{useState, useEffect}from 'react';
import { UserOutlined,StarFilled,EyeFilled,LikeFilled } from '@ant-design/icons';
import { Card, Col, Row, Avatar, Space, Tag,Descriptions } from 'antd';
import './index.css'
import { detail } from './server'



const Details: React.FC = () => {
    const [url, seturl] = useState('https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg');
    const [htmls, sethtmls] = useState('<div></div>');//标签
    const [tags, settags] = useState([]);//标签
    const [like, setlike] = useState();//点赞
    const [Star, setStar] = useState();//收藏
    const [eye, setEye] = useState();//浏览

    useEffect(() => {
        
   
        const searchParams = new URLSearchParams(window.location.search);
        // console.log(searchParams.get('id'));
        const params = {
            id:searchParams.get('id')
            // usguid:JSON.parse(storedPerson).guid
          }
       detail(params).then(res=>{
        console.log(res)
        //头像
        if(res.data.data.avatar!=null){
            seturl(res.data.data.avatar)
        }
        sethtmls(res.data.data.article.contents)
        settags(res.data.data.tags)
        setlike(res.data.data.like)
        setStar(res.data.data.star)
        setEye(res.data.data.eye)

       })
      
    },[ ])
    
    return (
        <>
            <div className='centen'>
                <Row gutter={24}>
                    <Col span={18}>
                        <Card className='centen-det' bordered={false}>
                            {/* Card content */}
                            
                            <div dangerouslySetInnerHTML={{__html:htmls as String}}></div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card bordered={false}>
                            <Avatar size={64} icon={<UserOutlined />} src={url} />  {}
                            <div>
                                <Space size={[0, 8]} wrap>
                                    {/* { tags.map(item=> <Tag color="red">{item}</Tag>)} */}
                                    
                                    {
                                        tags.map((item,index)=>{
                                            return <Tag color="orange" key={index}>{item}</Tag>
                                        })
                                    }
                                    {/* <Tag color="volcano">volcano</Tag>
                                    <Tag color="orange">orange</Tag>
                                    <Tag color="gold">gold</Tag>
                                    <Tag color="lime">lime</Tag>
                                    <Tag color="green">green</Tag>
                                    <Tag color="cyan">cyan</Tag>
                                    <Tag color="blue">blue</Tag>
                                    <Tag color="geekblue">geekblue</Tag>
                                    <Tag color="purple">purple</Tag> */}
                                </Space>
                            </div>
                            <div>
                                <Space wrap>
                                <Descriptions.Item ><LikeFilled />:{like}</Descriptions.Item>
                                <Descriptions.Item ><StarFilled />:{Star}</Descriptions.Item>
                                <Descriptions.Item ><EyeFilled />:{eye}</Descriptions.Item>
                                </Space>
                            </div>
                        </Card>
                        <Card bordered={false} style={{ marginTop: 16 }}>
                            文章目录预留
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card bordered={false} style={{ marginTop: 16 }}>
                            评论预留
                        </Card>
                    </Col>
                </Row>
            </div>

        </>
    )
};

export default Details;