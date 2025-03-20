import {
  req
} from './axiosFun';

// 获取首页统计数据
export const GetMainStatsData = () => {
  return req("get", "/stats/main", {})
};