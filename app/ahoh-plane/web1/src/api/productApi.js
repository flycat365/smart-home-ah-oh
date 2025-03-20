import {
  req
} from './axiosFun';

/**
 * 设备管理
 **/
// 品类列表
export const CategoryList = (params) => {
  return req("get", "/product/categories", params)
};
// 保存品类
export const CategorySave = (params) => {
  return req("post", "/product/saveCategory", params)
};
// 删除品类
export const CategoryDel = (params) => {
  return req("post", "/product/delCategory", params)
};
// 设备列表
export const ProductList = (params) => {
  return req("post", "/product/list/"+params.size+"/"+params.page, params)
};
// 保存产品
export const ProductSave = (params) => {
  return req("post", "/product/save", params)
};
// 取产品
export const GetProduct = (params) => {
  return req("get", "/product/" + params, {})
};
// 取物模型
export const GetThingModel = (params) => {
  return req("get", "/product/thingModel/" + params, {})
};
// 保存物模型
export const ThingModelSave = (params) => {
  return req("post", "/product/thingModel/save", params)
};
// 删除物模型
export const ThingModelDelete = (params) => {
  return req("post", "/product/thingModel/" + params, {})
};

// 获取产品型号列表
export const ProductModelList = (pk) => {
  return req("get", "/product/"+pk+"/models", {})
};
// 保存产品型号
export const ProductModelSave = (params) => {
  return req("post", "/product/saveProductModel", params)
};



export const ParseProperty = (model, enumItems, boolItem) => {
  let modelRaw = JSON.parse(JSON.stringify(model))
  let dataType = modelRaw.dataType
  if (dataType.type == "enum") {
    dataType.specs = {}
    enumItems.forEach(ei => {
      dataType.specs[ei.value] = ei.name
    })
  } else if (dataType.type == "bool") {
    dataType.specs = {
      "0": boolItem._true,
      "1": boolItem._false
    }
  } else if (dataType.type == "int32" ) {
    dataType.specs = {
      "min": dataType.specs["min"],
      "max": dataType.specs["max"]
    }
  }else if (dataType.type == "float") {
    dataType.specs = {
      "min": dataType.specs["min"],
      "max": dataType.specs["max"],
      "precision":dataType.specs["precision"]
    }
  } else if (dataType.type == "text") {
    dataType.specs = {
      "length": dataType.specs["length"]
    }
  } else {
    dataType.specs = {}
  }

  let property = {
    identifier: modelRaw.identifier,
    name: modelRaw.name,
    dataType: dataType,
    accessMode: modelRaw.accessMode || "r"
  }
  return property
}
