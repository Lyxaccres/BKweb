
import Home from '../page/home/index'
import ArticleEditor from '../page/PublishArticle/index'
import Login from '../page/Login/index'
import Register from '../page/Login/Register/index'
import Personal from '../page/Personal/index'
import Details from '../page/Details'
import Personal_details from '../page/Personal/Personal_details/index'
import { Outlet } from 'react-router-dom'


export default  [
    {
        path:'/',
        element:<Home></Home>
    },
    {
        path:'/Editor',
        element:<ArticleEditor></ArticleEditor>
    },
    {
        path:'/Login',
        element:<Login></Login>
    },
    {
        path:'/Register',
        element:<Register></Register>
    },
    {
        path:'/Personal',
        element:<Personal></Personal>,
        children:[
            {
                label:"笔记",
                key:'login',
                path:'login',
                element:<Login></Login>,
            },
            {
                label:"个人信息",
                key:'abc',
                path:'abc',
                element:<Register></Register>,
            }
        ]
    },
    {
        path:'/article/details',
        element:<Details></Details>
    },
    // {
    //     path:'/Personal_details',
    //     element:<Personal_details></Personal_details>,
    // }
]