import http from '../../uitl/request'


export async function detail(params:any){
    return await http("get",'api/Article/detail',params);
  }