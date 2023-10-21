import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react'
import { Radio, Input, Upload, Form, Card, Col, Row, Button, message, Tag, Space, Cascader } from 'antd';
import type { UploadProps } from 'antd';
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { AddArticle } from './server'


const ArticleEditor: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [editor, setEditor] = useState<IDomEditor | null>(null)   // TS 语法
    // const [editor, setEditor] = useState(null)                   // JS 语法
    const { TextArea } = Input;

    // 编辑器内容
    const [html, setHtml] = useState('<p>hello</p>')
    const [taglist, settaglist] = useState("")
    const [imgsrc, setimgsrc] = useState("")
    const { SHOW_CHILD } = Cascader;
    const [inputtitle, setinputtitle] = React.useState('');
    const [inputabstract, setinputabstract] = React.useState('');
    const [inputradio, setinputradio] = React.useState('');
    const onChange = (value: string[][]) => {
        let ta = ""
        value.forEach(element => {
            ta += element[1] + ","
            console.log(ta);
        });
        settaglist(ta)

    };

    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        setTimeout(() => {
            setHtml('<p>hello world</p>')
        }, 1500)
    }, [])

    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = {}  // TS 语法
    // const toolbarConfig = { }                        // JS 语法



    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} }
    editorConfig.placeholder = '请输入内容...';
    editorConfig.MENU_CONF['uploadImage'] = {
        // 上传图片的配置
        server: 'http://localhost:5204/api/Tests/ImgUpload',
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const props: UploadProps = {
        action: 'http://localhost:5204/api/Tests/ImgUpload',
        listType: 'picture-card',
        onChange(file) {
            if (file.file.response != null) {
                setimgsrc(file.file.response.data.href)
            }

        }
    };



    interface Option {
        value: string;
        label: string;
        children?: Option[];
    }

    const options: Option[] = [
        {
            value: '前端',
            label: '前端',
            children: [
                {
                    value: 'vue',
                    label: 'vue',
                },
                {
                    value: 'layui',
                    label: 'layui',
                },
                {
                    value: 'react',
                    label: 'react',
                },
            ],
        },
        {
            value: '后端',
            label: '后端',
            children: [
                {
                    value: '.net',
                    label: '.net',
                },
            ],
        },
    ];




    const getArticle = async () => {
        var storedPerson = localStorage.getItem("BK_User")
        // console.log(storedPerson)
        const params = {
            title: inputtitle,
            abstract: inputabstract,
            content: html,
            cover: imgsrc,
            tag: taglist,
            author: JSON.parse(storedPerson).guid,
            soure: inputradio
        }
        AddArticle(params).then(res => {
            messageApi.open({
                type: 'success',
                content: res.data.msg,
            });
        })

    };

    return (
        <>
            
            <Row gutter={24}>
                <Col span={24}>
                {contextHolder}
                    <Card>
                        <Button type="primary" onClick={getArticle}>Primary Button</Button>
                    </Card>
                </Col>
                <Col span={16} style={{ margin: '0 auto' }}>
                    <Card>
                        <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                            <Toolbar
                                editor={editor}
                                defaultConfig={toolbarConfig}
                                mode="default"
                                style={{ borderBottom: '1px solid #ccc' }}
                            />
                            <Editor
                                defaultConfig={editorConfig}
                                value={html}
                                onCreated={setEditor}
                                onChange={editor => setHtml(editor.getHtml())}
                                mode="default"
                                style={{ height: '600px', overflowY: 'hidden' }}
                            />
                        </div>
                        <div style={{ marginTop: '15px' }}>
                            {html}
                        </div>
                    </Card>
                </Col>
                <Col span={16} style={{ margin: '0 auto' }}>
                    <Card>
                        <Form >
                            <Form.Item label="文章标题">
                                <Input value={inputtitle}
                                    onChange={e => setinputtitle(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="文章摘要">
                                <TextArea rows={4} placeholder="摘要" value={inputabstract}
                                    onChange={e => setinputabstract(e.target.value)} />
                            </Form.Item>
                            <Form.Item label="添加封面" valuePropName="fileList" getValueFromEvent={normFile}>
                                <Upload {...props}>
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>添加文章封面</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                            <Form.Item label="文章类型">
                                <Cascader
                                    style={{ width: '100%' }}
                                    options={options}
                                    onChange={onChange}
                                    multiple
                                    maxTagCount="responsive"
                                    showCheckedStrategy={SHOW_CHILD}
                                    placeholder="选择文章标签"
                                // defaultValue={[

                                // ]}
                                />

                            </Form.Item>
                            <Form.Item label="文章类型">
                                <Radio.Group onChange={e => setinputradio(e.target.value)}>
                                    <Radio value="0"> 原创 </Radio>
                                    <Radio value="1"> 转载 </Radio>
                                </Radio.Group>
                            </Form.Item>

                        </Form>
                    </Card>
                </Col>


            </Row>

        </>
    )
}
export default ArticleEditor;