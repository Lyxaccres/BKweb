import http from '../../uitl/request'


export async function weather(value:any){
    return await http("get",'/WeatherForecast',value);
  }
  
  export async function home(){
    return await http("get",'api/Tests/home');
  }