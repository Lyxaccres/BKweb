
import Home from '../page/home/index'
import ArticleEditor from '../page/PublishArticle/index'
import Login from '../page/Login/index'
import Register from '../page/Login/Register/index'
import Personal from '../page/Personal/index'
import Details from '../page/Details'
import Personal_details from '../page/Personal/Personal_details/index'
import Homes from '../page/Personal/homes/index'


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
                // label:"笔记",
                key:'homes',
                path:'homes',
                element:<Homes></Homes>,
            },
            {
                // label:"个人信息",
                key:'Personal_details',
                path:'Personal_details',
                element:<Personal_details></Personal_details>,
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