import {
  req
} from './axiosFun';

export const DesignList = (params) => {
  return req("post", "/app/designs", params)
};

export const DesignDetail = (id) => {
  return req("get", "/app/designDetail?id=" + id, {})
};

export const saveDesign = (design) => {
  return req("post", "/app/saveDesign", design)
};

export const CachePreview = (html) => {
  return req("post", "/app/cachePreview", html)
};
