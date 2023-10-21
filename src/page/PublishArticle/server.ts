import http from '../../uitl/request'


export async function AddArticle(param:any){
    return await http("post",'api/Article/AddArticle',param);
  }