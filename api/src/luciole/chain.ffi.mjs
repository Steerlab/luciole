export function clear(prev) {
  return prev.clear()
}

export function click(prev) {
  return prev.click()
}

export function contain(prev, selector) {
  return prev.contains(selector)
}

export function each(prev, callback) {
  return prev.each(callback)
}

export function find(prev, selector) {
  return prev.find(selector)
}

export function invoke(prev, callback) {
  return prev.invoke(callback)
}

export function select_file(prev, filepath) {
  return prev.selectFile(filepath)
}

export function then(prev, callback) {
  return prev.then(callback)
}

export function within(prev, callback) {
  return prev.within(callback)
}

export function write(prev, text) {
  return prev.type(text)
}
