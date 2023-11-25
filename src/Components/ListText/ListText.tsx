import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space ,Button} from 'antd';
import React, {useEffect, useState } from 'react';
import { useNavigate,Link } from "react-router-dom";
import './ListText.css'
import { GetArticle } from './server'


const App: React.FC = (props) => {
  const navigate = useNavigate();
  const [sizes, setSize] = useState(1);
  const count = 12;
const fakeDataUrl = `https://randomuser.me/api/?result=${count}&inc=name,gender,email,nat,picture&noinfo`;
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);
  let storedPerson = localStorage.getItem("BK_User")
  
  const [list, setList] = useState<Array<{
    [key:string]:string}>>(
    [
    ]
  );

  function details() {
    navigate("/article/details")
  }
  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  useEffect(() => {
    // fetch(fakeDataUrl)
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setInitLoading(false);
    //     setData(res.results);
    //     setList(res.results);
    //   });
    setSize(1)
    const params = {
      usguid:props.uid,
      size:count,
      page:sizes,
      // usguid:JSON.parse(storedPerson).guid
  }
    GetArticle(params)
    // .then((res) => res.json())
    .then((res) => {
      console.log(res.data.data)
          setInitLoading(false);
          setData(res.data.data.result);
          setList(res.data.data.result);
          setSize(sizes+1)
          console.log(res.data.data.result.length)
          if(res.data.data.result.length<count){
            setLoading(true);
          }
        })
  }, []);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat([...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} }))),
    );
    setSize(sizes+1)
    const params = {
      size:count,
      page:sizes,
      // usguid:JSON.parse(storedPerson).guid
    }
    GetArticle(params)
    .then((res) => {
      const newData = data.concat(res.data.data.result);
        setData(newData);
        setList(newData);
        setLoading(false);
      // console.log(res.data.data)
      //     setInitLoading(false);
      //     setData(res.data.data.result);
      //     setList(res.data.data.result);
      window.dispatchEvent(new Event('resize'));
        })

  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 3,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>查看更多...</Button>
      </div>
    ) : null;

  return (
    <List
      itemLayout="vertical"
      size="large"
      loadMore={loadMore}
      dataSource={list}
      footer={
        <div>
          <b>ant design</b> footer part
        </div>
      }
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <IconText icon={StarOutlined} text={item.collects_count} key="list-vertical-star-o" />,
            <IconText icon={LikeOutlined} text={item.digg_count} key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text={item.look_count} key="list-vertical-message" />,
            <IconText icon={StarOutlined} text={item.create_date} key="list-vertical-message" />,
          ]}
          extra={
            <img
              width={200}
              height={100}
              alt="logo"
              src={item.cover}
            />
          }
        >
          <List.Item.Meta
            //avatar={<Avatar src={item.avatar} />}
            // title={<a href={'/article/details?id='+item.id}>{item.title}</a>}
            title={<Link to={'/article/details?id='+item.id}>{item.title}</Link>}
            description={item.tag}
          />
          {item.abstracts}
        </List.Item>
      )}
    />
  )
};

export default App;