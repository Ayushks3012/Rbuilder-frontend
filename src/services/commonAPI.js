// 1. import Axios
import axios from "axios";

// 2. configure axios

  export const commonAPI = async (httpMethod,url,reqBody)=>{
    const reqConfig = {
      method:httpMethod,
      url,
      data:reqBody
    }
    return await axios(reqConfig).then((res)=>{
      return res
    })
    .catch((err)=>{
      return err
    })
  }