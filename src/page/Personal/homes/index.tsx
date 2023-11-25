import React from 'react';
import { Card, Col, Row, Image, Space,List } from 'antd';
import { useNavigate,Link } from "react-router-dom";
import ListText from '../../../Components/ListText/ListText';
import {getStorage} from '../../../uitl/localStotage';
import './index.css';

const Homes: React.FC = () => (
  <>

    {/* <hr></hr> */}
    <Row gutter={24}>
      <Col span={24} style={{ padding: 10 }}>
        <Card bordered={true} >
        <ListText uid={getStorage('BK_User').guid}></ListText>
        </Card>
      </Col>
    </Row>
  </>
);

export default Homes;