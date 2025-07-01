export function click(prev) {
  return prev.click();
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

export function within(prev, body) {
  return prev.within(body);
}
