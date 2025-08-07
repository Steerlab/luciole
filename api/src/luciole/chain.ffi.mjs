export function select_file(prev, filepath) {
  return prev.selectFile(filepath)
}

export function click(prev) {
  return prev.click()
}

export function contain(prev, selector) {
  return prev.contains(selector)
}

export function each(prev, callback_fn) {
  return prev.each(callback_fn)
}

export function find(prev, selector) {
  return prev.find(selector)
}

export function invoke(prev, fn_name) {
  return prev.invoke(fn_name)
}

export function then(prev, callback_fn) {
  return prev.then(callback_fn)
}

export function within(prev, callback_fn) {
  return prev.within(callback_fn)
}

export function write(prev, text) {
  return prev.type(text)
}
