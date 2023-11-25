import http from '../../../uitl/request'

export async function UserDetails(param:any){
    return await http("get",'api/User/UserDetails',param);
  }