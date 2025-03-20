import {
  json,
  req
} from './axiosFun';

/**
 * 设备管理
 **/
// 设备列表
export const DeviceList = (params) => {
  return json("post", "/device/list/"+params.size+"/"+params.page, params)
};
// 创建设备
export const DeviceCreate = (params) => {
  return req("post", "/device/create", params)
};
// 子设备列表
export const GatewayChildren = (deviceId) => {
  return req("get", "/device/" + deviceId + "/children", {})
};
// 设备详情
export const DeviceDetail = (deviceId) => {
  return req("get", "/device/" + deviceId+"/detail", {})
};
// 获取设备信息
export const GetDeviceByDn = (pk,dn) => {
  return req("get", "/device/" + pk +"/"+dn, {})
};
//删除设备
export const DeleteDevice = (deviceId) => {
  return req("post", "/device/" + deviceId+"/delete", {})
};
//解绑
export const UnbindDevice = (deviceId) => {
  return req("post", "/device/" + deviceId + "/unbind", {})
};
// 设备属性设置
export const PropertySet = (deviceId, params) => {
  return json("post", "/device/" + deviceId + "/service/property/set", params)
};
// 设备服务调用
export const ServiceInvoke = (deviceId, identifier, params) => {
  return json("post", "/device/" + deviceId + "/service/" + identifier+"/invoke", params)
};
// 设备日志查询
export const DeviceLogs = (deviceId, params) => {
  return req("post", "/device/" + deviceId + "/logs/"+params.size+"/"+params.page, params)
};

// 取物模型
export const GetDeviceThingModel = (deviceId) => {
  return req("get", "/device/"+deviceId+"/thingModel" , {})
};

// 取设备属性历史数据
export const GetDevicePropertyHistory = (deviceId,name,start,end) => {
  return req("get", "/device/"+deviceId+"/property/"+name+"/"+start+"/"+end , {})
};

// 添加设备标签
export const DeviceTagAdd = (params) => {
  return req("post", "/device/"+params.deviceId+"/tag/add" , params)
};

// 模拟设备消息发送
export const SimulateSend = (deviceId,params) => {
  return json("post", "/device/"+deviceId+"/simulateSend" , params)
};


// 虚拟设备列表
export const VirtualDeviceList = (params) => {
  return json("post", "/virtual_device/list/"+params.size+"/"+params.page, {})
};

// 添加虚拟设备
export const VirtualDeviceAdd = (params) => {
  return req("post", "/virtual_device/add" , params)
};

// 修改虚拟设备
export const VirtualDeviceModify = (params) => {
  return req("post", "/virtual_device/modify" , params)
};

//删除虚拟设备
export const VirtualDeviceDelete = (id) => {
  return req("delete", `/virtual_device/${id}/delete`, {})
};

//设置虚拟设备状态
export const VirtualDeviceSetState = (params) => {
  return req("post", `/virtual_device/${params.id}/setState`, params)
};

// 虚拟设备详情
export const VirtualDeviceDetail = (id) => {
  return req("get", `/virtual_device/${id}/detail`, {})
};

// 保存关联设备列表
export const VirtualDeviceSaveDevices = (id,devices) => {
  return json("post", `/virtual_device/${id}/saveDevices`, devices)
};

// 保存虚拟设备脚本
export const VirtualDeviceSaveScript = (id,script) => {
  return req("post", `/virtual_device/${id}/saveScript`, {script:script})
};

// 执行虚拟设备
export const VirtualDeviceRun = (id) => {
  return req("post", `/virtual_device/${id}/run`, {})
};

// 获取虚拟设备日志
export const VirtualDeviceLogList = (params) => {
  return req("post", `/virtual_device/${params.id}/logs/${params.size}/${params.page}`, {})
};

// 设备分组列表
export const DeviceGroupList = (params) => {
  return req("post", "/device/groups/"+params.size+"/"+params.page, params)
};

// 添加分组
export const GroupAdd = (params) => {
  return req("post", "/device/group/add", params)
};

// 修改分组
export const GroupSave = (params) => {
  return req("post", "/device/group/save", params)
};

// 删除分组
export const GroupDelete = (id) => {
  return req("delete", "/device/group/delete/"+id, {})
};

//将设备添加到组中
export const GroupDeviceAdd = (group,devices) => {
  return json("post", "/device/group/addDevices/"+group, devices)
};

//将设备从组中删除
export const GroupDeviceRemove = (group,devices) => {
  return json("post", "/device/group/removeDevices/"+group, devices)
};

//设备配置获取
export const DeviceConfigGet = (deviceId) => {
  return req("get", "/device/config/"+deviceId+"/get",{})
};

//设备配置保存
export const DeviceConfigSave = (deviceId,config) => {
  return req("post", "/device/config/"+deviceId+"/save", config)
};

//设备配置下发
export const DeviceConfigSend = (deviceId) => {
  return req("post", "/device/config/"+deviceId+"/send", {})
};
