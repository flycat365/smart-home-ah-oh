import {
  req,json
} from './axiosFun';


// 通讯组件列表
export const ComponentList = (params) => {
  return req("post", "/protocol/components/"+params.size+"/"+params.page, params)
};
// 保存组件
export const ComponentSave = (params) => {
  return req("post", "/protocol/saveComponent", params)
};
// 添加组件
export const ComponentAdd = (params) => {
  return req("post", "/protocol/addComponent", params)
};
// 删除组件
export const ComponentDelete = (id) => {
  return req("post", "/protocol/deleteComponent/"+id, {})
};
// 保存组件脚本
export const ComponentScriptSave = (params) => {
  return json("post", "/protocol/saveComponentScript/"+params.id, params.script)
};
//获取组件脚本
export const ComponentScriptGet = (id) =>{
  return req("get","/protocol/getComponentScript/"+id,{});
}
//组件状态变更
export const ComponentStateChange = (params) =>{
  return req("post","/protocol/component/"+params.id+"/state/"+params.state,{});
}


// 转换器列表
export const ConverterList = (params) => {
  return req("post", "/protocol/converters/"+params.size+"/"+params.page, params)
};
// 保存转换器
export const ConverterSave = (params) => {
  return req("post", "/protocol/saveConverter", params)
};
// 添加转换器
export const ConverterAdd = (params) => {
  return req("post", "/protocol/addConverter", params)
};
// 删除转换器
export const ConverterDelete = (id) => {
  return req("post", "/protocol/deleteConverter/"+id, {})
};
// 保存转换脚本
export const ConverterScriptSave = (params) => {
  return json("post", "/protocol/saveConverterScript/"+params.id, params.script)
};
//获取组件脚本
export const ConverterScriptGet = (id) =>{
  return req("get","/protocol/getConverterScript/"+id,{});
}