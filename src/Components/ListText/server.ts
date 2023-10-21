import http from '../../uitl/request'


export async function GetArticle(params:any){
    return await http("get",'api/Article/GetArticle',params);
  }