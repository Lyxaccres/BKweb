import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import styled from 'styled-components'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { message } from 'antd'
import {v4 as uuid} from 'uuid'
import axios from '@/services/index';

const WangEditor = forwardRef((props:any, ref:any) => {
    const [editor, setEditor] = useState<IDomEditor | null>(null);
    // 编辑器内容
    const [html, setHtml] = useState(props.editorContent|| '') 
    // 模拟 ajax 请求，异步设置 html
    useEffect(() => {
        
    }, [])              // JS 语法
    // 工具栏配置
    const toolbarConfig: Partial<IToolbarConfig> = { 
        
    }  // TS 语法
    // 对外暴露方法，可以让父组件调用子组件的方法
    // 作用: 减少父组件获取子组件的DOM元素属性,只暴露给父组件需要用到的DOM方法
    // 参数1: 父组件传递的ref属性
    // 参数2: 返回一个对象,父组件通过ref.current调用对象中方法
    useImperativeHandle(ref, () => ({
        
    }));
    useEffect(() => {
        setHtml(props.editorContent); //设置编辑器内容
    }, [props.editorContent]);

    // 及时销毁 editor ，重要！
    useEffect(() => {
        return () => {
            if (editor == null) return
            if(editor) {
                (editor as any).destroy() 
            }
            setEditor(null)
        }
    }, [editor])
    
    // 编辑器配置
    const editorConfig: Partial<IEditorConfig> = {    // TS 语法
        placeholder: '请输入内容...',
        //插入图片
        MENU_CONF: {
            uploadImage: {
                // 单个文件的最大体积限制，默认为 2M
                maxFileSize: 4 * 1024 * 1024, // 4M
                // 最多可上传几个文件，默认为 100
                maxNumberOfFiles: 10,
                // 超时时间，默认为 10 秒
                timeout: 5 * 1000, // 5 秒
                // 用户自定义上传图片
                customUpload(file: any, insertFn: any) {
                    const data = new FormData();
                    data.append("file", file); // file 即选中的文件 主要就是这个传的参数---看接口要携带什么参数{ key :value}
                    const hide = message.loading('上传中...', 0);
                    //这里写自己的接口
                    axios({
                        method: 'post',
                        url: '/upload/uploadAvatar',
                        headers:{'Content-Type': 'multipart/form-data'},
                        data:data
                    }).then((res) => { 
                        const url = res.data.data.url;
                        insertFn(url); //插入图片，看返回的数据是什么
                        hide();
                    }).catch(err=> {
                        hide();
                    })
                }
            }
        }
    }
    // // 自定义粘贴
    editorConfig.customPaste = (editor: IDomEditor, event: ClipboardEvent): boolean => {     // TS 语法
        // event 是 ClipboardEvent 类型，可以拿到粘贴的数据
        // 可参考 https://developer.mozilla.org/zh-CN/docs/Web/API/ClipboardEvent
        // let html = event && event?.clipboardData?.getData('text/html') // 获取粘贴的 html
        const text = event && event?.clipboardData?.getData('text/plain') // 获取粘贴的纯文本
        let files = event && event?.clipboardData?.files
        event.preventDefault();
        
        if(files && files.length>0) {
            const file = files[0]
            const type = file.type.split('/')
            //对复制粘贴的图片进行重命名，原因是每次复制粘贴的图片名都是一样的，会导致bug，可以自行去掉重现该bug
            const newfile = new File([file], 'pictur'+uuid() + '.' + type[1], {type: file.type});
            //这里写自己的接口
            const data = new FormData();
            data.append("file", newfile); 
            const hide = message.loading('上传中...', 0);
        
            axios({
                method: 'post',
                url: '/upload/uploadAvatar',
                headers:{'Content-Type': 'multipart/form-data'},
                data:data
            }).then((res) => { 
                const url = res.data.data.url;
                editor.dangerouslyInsertHtml(`<img src="${url}" />`)
                hide();
            }).catch(err=> {
                hide();
            })
            return false;
        }else {
            editor.insertText(text || '');
            return false;
        }
    }
    return (
        <Wrap>
            <div style={{ border: '1px solid #ccc', zIndex: 100}}>
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
                    onChange={editor => {
                        setHtml(editor.getHtml());
                        props.saveHtmParams(editor.getHtml())
                    }}
                    mode="default"
                    style={{ height: 'calc(100vh - 420px)', overflowY: 'hidden' }}
                />
            </div>
        </Wrap>
    )
})
const Wrap = styled.div`

  .w-e-text-container img{
    width: 300px;
    height: 400px;
  }
`;
export default WangEditor;
