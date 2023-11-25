import http from '../../uitl/request'

export async function GetDiscuss(params:any){
    return await http("get",'api/Article/GetDiscuss',params);
  }

  export async function PublishDiscuss(params:any){
    return await http("post",'api/Article/PublishDiscuss',params);
  }

 