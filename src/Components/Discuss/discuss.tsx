import React, { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Card, Avatar, Space, List, Skeleton, Button, Input, Anchor } from 'antd';
import { GetDiscuss,PublishDiscuss } from './server';
import { getStorage } from '../../uitl/localStotage';

const Discuss: React.FC = (props) => {
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const params = {
            art_id: searchParams.get('id')
        }

        GetDiscuss(params).then(res => {
            console.log(res)
            setInitLoading(false);
            setData(res.data.data);
            setList(res.data.data);
        })
        // fetch(fakeDataUrl)
        //     .then((res) => res.json())
        //     .then((res) => {
        //         setInitLoading(false);
        //         // setData(res.results);
        //         // setList(res.results);
        //     });

    }, [])

    const { TextArea } = Input;
    const [textAreavalue, setTextAreavalue] = useState(String);
    const [defAreavalue, setDeftAreavalue] = useState("评论留言");
    const [pardis, setpardis] = useState(-1);
    const [open, setOpen] = useState("block");
    interface DataType {
        discuss_id: number;
        discuss_uid: string;
        discuss_name: string;
        discuss_ava: string;
        discuss_details: string;
        discuss_date: string;
        content_flag: number;
        child_descuss: [];
        loading: boolean;
    }
    const [list, setList] = useState<DataType[]>([

    ]);
    const count = 3;
    const [reply_comment_id, setReply_comment_id] = useState(Number);
    const [reply_user_id, setReply_user_id] = useState(String);
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // console.log('Change:', e.target.value);
        setTextAreavalue(e.target.value)
    };
    const onChangeKey = (e) => {
        // console.log(e.key)
        if (e.target.value == "" && e.key == "Backspace") {
            console.log(-1)
            setpardis(-1)
            setDeftAreavalue("评论留言")
            setReply_comment_id(0)
            setReply_user_id("")
        }
    }

    const showDrawer = () => {

        if (open == "none") {
            setOpen("block");
        }
        else {
            setOpen("none");
        }

    };

    const showAreaDisuss = (comment_id: number, user_id: string, name: string) => {

        let anchorElement = document.getElementById("part-1");
        // 如果对应id的锚点存在，就跳转到锚点
        if (anchorElement) { anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' }); }
        setpardis(1)//标记子评论        
        setDeftAreavalue("回复 @" + name)
        setReply_comment_id(comment_id)
        setReply_user_id(user_id)

    };

    const subTextArea = () => {
        const searchParams = new URLSearchParams(window.location.search);
        
        const params = {
            parent: pardis,
            user_id: getStorage('BK_User').guid,
            comment: textAreavalue,
            contentid: searchParams.get('id'),//文章id
            reply_comment_id: reply_comment_id,//评论id
            reply_user_id: reply_user_id//回复给哪个用户的id
        }
        PublishDiscuss(params).then(res=>{
            console.log(res);
        })
        
    }



    const onLoadMore1 = () => {
        setLoading(true);
        setList(
            data.concat([...new Array(count)].map(() => ({ loading: true, name: "", picture: "" }))),
        );
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                const newData = data.concat(res.results);
                setData(newData);
                setList(newData);
                setLoading(false);
                window.dispatchEvent(new Event('resize'));
            });
    };

    const loadMore1 =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <a onClick={onLoadMore1}>加载更多<DownOutlined /></a>
            </div>
        ) : null;


    return (
        <>
            <TextArea id="part-1"
                onKeyDown={onChangeKey}
                showCount
                maxLength={500}
                onChange={onChange}
                value={textAreavalue}
                placeholder={defAreavalue}
                style={{ height: 120, resize: 'none' }}
            />
            <Card bordered={false} style={{ marginTop: 30, textAlign: 'right' }}>
                <Button type="primary" onClick={subTextArea}>评论</Button>
            </Card>
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore1}
                dataSource={list}
                renderItem={(item) => (
                    <div>
                        <List.Item
                        // actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                        >
                            <Space size={10}>
                                {item.child_descuss.length > 0 ? <a>共 {item.child_descuss.length} 条回复</a> : ""}
                                {/* <a>回复</a> */}

                            </Space>

                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.Discuss_ava} />}
                                    title={
                                        <>
                                        <a style={{fontSize:16,fontWeight:'bold'}} onClick={() => { showAreaDisuss(item.discuss_id,item.discuss_uid,item.discuss_name) }}>{item.discuss_name+" "}</a>
                                        <p style={{color:'#d9d9d9',fontSize:12}}>{item.discuss_date}</p>
                                        </>
                                    }
                                    description={item.discuss_details}
                                />
                            </Skeleton>

                        </List.Item>
                        {/* 二级评论 */}

                        <List.Item style={{ marginLeft: 50, display: "block" }}
                        // actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                        >
                            {
                                item.child_descuss.length > 0 ?
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={item.child_descuss}
                                        // loadMore={loadMore1}
                                        renderItem={(i) => (
                                            <div>
                                                <p />
                                                {/* <Button type="link" block onClick={(showDrawer)}>回复</Button> */}
                                                <Skeleton avatar title={false} loading={item.loading} active>
                                                    <List.Item.Meta
                                                        avatar={<Avatar src={i.discuss_ava} />}
                                                        title={<a onClick={() => { showAreaDisuss(i.discuss_name) }}>{i.discuss_name}</a>}
                                                        description={i.discuss_details}
                                                    />
                                                </Skeleton>
                                                {/* {TextAreasolt} */}
                                                {/* {txar} */}
                                            </div>
                                        )} /> : ""
                            }

                        </List.Item>

                    </div>
                )}
            />
        </>
    )
};
export default Discuss;