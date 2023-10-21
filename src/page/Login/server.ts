import http from '../../uitl/request'

export async function Signin(value:any){
    return await http("post",'api/User/Signin',value);
  }