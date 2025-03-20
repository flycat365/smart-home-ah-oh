import {
  req,
  json
} from './axiosFun';


// 规则列表
export const RuleList = (params) => {
  return req("post", "/rule_engine/rules/"+params.type+"/"+params.size+"/"+params.page, {})
};

// 规则保存
export const RuleSave = (params) => {
  return json("post", "/rule_engine/rule/save", params)
};

// 规则删除
export const RuleDelete = (ruleId) => {
  return req("delete", "/rule_engine/rule/"+ruleId+'/delete', {})
};

// 规则暂停
export const RulePause = (ruleId) => {
  return req("post", "/rule_engine/rule/"+ruleId+"/pause",{})
};

// 规则恢复
export const RuleResume = (ruleId) => {
  return req("post", "/rule_engine/rule/"+ruleId+"/resume",{})
};

// 规则日志
export const RuleLogsList = (params) => {
  return req("post", "/rule_engine/rule/"+params.ruleId+"/logs/"+params.size+"/"+params.page, {})
};

export const RuleLogsClear = (ruleId) => {
  return req("delete", "/rule_engine/rule/"+ruleId+"/logs/clear", {})
};


// 任务列表
export const TaskList = (params) => {
  return req("post", "/rule_engine/tasks", params)
};

// 任务保存
export const TaskSave = (params) => {
  return json("post", "/rule_engine/saveTask", params)
};

// 停止任务
export const TaskPause = (taskId) => {
  return req("post", "/rule_engine/task/"+taskId+"/pause",{})
};

// 恢复任务
export const TaskResume = (taskId) => {
  return req("post", "/rule_engine/task/"+taskId+"/resume",{})
};

// 重启开始任务
export const TaskRenew = (taskId) => {
  return req("post", "/rule_engine/task/"+taskId+"/renew",{})
};

// 删除任务
export const TaskDelete = (taskId) => {
  return req("delete", "/rule_engine/task/"+taskId+"/delete",{})
};


// 任务日志
export const TaskLogsList = (params) => {
  return req("post", "/rule_engine/task/"+params.taskId+"/logs/"+params.size+"/"+params.page, {})
};

export const TaskLogsClear = (taskId) => {
  return req("delete", "/rule_engine/task/"+taskId+"/logs/clear", {})
};
