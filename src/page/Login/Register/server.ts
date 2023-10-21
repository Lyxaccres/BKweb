import http from '../../../uitl/request'


export async function GetCaptcha(value: any) {
  const params = {
    id: value
  }
  return await http("get", 'api/User/GetCaptcha', params);
}

export async function Register(data: any) {
  return await http("post", 'api/User/Register', data);
}
