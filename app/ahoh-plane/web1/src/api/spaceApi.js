import {
  req
} from './axiosFun';

// 获取空间列表
export const SpaceList = (params) => {
  return req("post", "/space/list", params)
};
// 获取空间设备列表
export const SpaceDevices = (userId) => {
  return req("get", "/space/" + userId + "/devices", {})
};
