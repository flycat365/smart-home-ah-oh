import {
  req,json
} from './axiosFun';

export const GetPlatformUsers = (params) => {
  return req("get", "/user/platform/users", params)
};

export const PlatformUserAdd = (params) => {
  return json("post", "/user/platform/user/add", params)
};

export const PlatformUserPwdReset=(params)=>{
  return req("post",`/user/platform/user/${params.uid}/resetPwd`,{})
};

export const GetClientUsers = (params) => {
  return req("get", "/user/client/users", params)
};

export const ClientUserAdd = (params) => {
  return json("post", "/user/client/user/add", params)
};

export const ClientUserSave = (params) => {
  return json("post", "/user/client/user/save", params)
};

export const DeleteClientUser = (uid) => {
  return json("post", "/user/client/user/"+uid+"/delete", {})
};

export const AliBindDevices = (uid) => {
  return req("get", "/aligenieDevice/list/"+uid, {})
};
export const AliDeviceBindSave = (uid,devices) => {
  return json("post", "/aligenieDevice/bind/"+uid, devices)
};

export const UserPwdModify = (params) => {
  return req("post", `/user/${params.uid}/modifyPwd`, params)
};

