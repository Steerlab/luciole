export function attach_file(prev, filepath) {
  return prev.attachFile(filepath);
}

export function click(prev) {
  return prev.click();
}

export function contains(prev, content) {
  return prev.contains(content);
}

export function each(prev, fun) {
  return prev.each(fun);
}

export function find(prev, selector) {
  return prev.find(selector);
}

export function invoke(prev, functionName) {
  return prev.invoke(functionName);
}

export function then(prev, body) {
  return prev.then(body);
}

export function type_(prev, body) {
  return prev.type(body);
}

export function within(prev, body) {
  return prev.within(body);
}
