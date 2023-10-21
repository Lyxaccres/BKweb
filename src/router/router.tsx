
import Home from '../page/home/index'
import ArticleEditor from '../page/PublishArticle/index'
import Login from '../page/Login/index'
import Register from '../page/Login/Register/index'
import Personal from '../page/Personal/index'
import Details from '../page/Details'

export default [
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
        element:<Personal></Personal>
    },
    {
        path:'/article/details',
        element:<Details></Details>
    }
]