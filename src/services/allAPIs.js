import { serverURL } from "./serverURL";

import { commonAPI } from "./commonAPI"

//  1.Add resume details to the server - post -reqBody
export const addResumeAPI = async (reqBody) =>{
  return await commonAPI('post',`${serverURL}/resumes`,reqBody)
}

// 2. history added to the server - post, reqBody
export const addResumeHistoryAPI = async (reqBody) =>{
  return await commonAPI('post',`${serverURL}/history`,reqBody)
}

// 2. get history from the server - get, ""
export const getResumeHistoryAPI = async () =>{
  return await commonAPI('get',`${serverURL}/history`,"")
}

// 2. delete history from the server - delete,
export const deleteResumeHistoryAPI = async (id) =>{
  return await commonAPI('delete',`${serverURL}/history/${id}`,"")
}

// 2. get resume for edit from the server - get, ""
export const getResumeEditHistoryAPI = async (id) =>{
  return await commonAPI('get',`${serverURL}/history/${id}`,"")
}

// 2. edit resume history - put, reqBody
export const updateHistoryAPI = async (id,reqBody) =>{
  return await commonAPI('put',`${serverURL}/history/${id}`,reqBody)
}