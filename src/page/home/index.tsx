import { React, useState } from 'react'
import { Card, Col, Row, Carousel, Image ,Button} from 'antd';
import Calen from '../../Components/Calendar/Calendar';
import ListText from '../../Components/ListText/ListText';
import {weather,home} from './server'
import './home.css'
import logo from '../../assets/test/th.jpg'
import { createWorker } from 'tesseract.js';



const recognizeCaptcha = async (imageUrl:string) => {
  const worker = createWorker()
  //await (await worker).load();
  await (await worker).loadLanguage('eng');
  await (await worker).initialize('eng')
  const {data:{text}}=await (await worker).recognize(imageUrl)
  await (await worker).terminate()
  return text
};

const handelDelete = async () => {
  const captchaText = await recognizeCaptcha("http://jwgl.bsuc.edu.cn/bsxyjw/cas/genValidateCode?dateTime=54")
  console.log(captchaText)
};

//走马灯属性

//
const tabList = [
  {
    key: 'tab1',
    tab: '今日新闻',
  },
  {
    key: 'tab2',
    tab: '吃瓜',
  },
];

const contentList: Record<string, React.ReactNode> = {
  tab1: <div><p>content1</p><p>content1</p><p>content1</p><p>content1</p><p>content1</p></div>,
  tab2: <div><p>content2</p><p>content2</p><p>content2</p><p>content2</p><p>content2</p></div>,
};



const Home: React.FC = () => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };
  return (
    <>
      <Carousel autoplay>
        <div className="carousel">
          <img src={logo} alt="" />
        </div>
        <div className="carousel">
          <img src={logo} alt="" />
        </div>
      </Carousel>
      <br />
      <div className="text">
        <Row gutter={24}>
          {/* <Col span={10}>
            <Card
              style={{ width: '100%', height: '321px' }}
              title="-------"
              tabList={tabList}
              activeTabKey={activeTabKey1}
              onTabChange={onTab1Change}
            >
              {contentList[activeTabKey1]}
            </Card>
          </Col> */}
          {/* <Col span={8}>
            <Card
              style={{ width: '100%', height: '321px' }}
            >
              <Button type="primary" onClick={handelDelete}>Primary Button</Button>
            </Card>
          </Col> */}
          {/* <Col span={6}>
              <Calen width={'100%'}></Calen>
          </Col> */}
          <Col span={18}>
          <Card
              style={{ width: '100%', height: '100%' , margin:'12px 0 0 0'}}
            >
              <ListText></ListText>
            </Card>
            
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Home;
