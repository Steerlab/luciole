import * as path from 'path'

export function setExtensionTo(curr: string, extension: string): string {
  return path.format({
    ...path.parse(curr),
    base: undefined, // works only with this attribute
    ext: extension,
  })
}

export function removeFirstPartOfPath(curr: string): string {
  const segments = path.normalize(curr).split(path.sep)
  const newSegments = segments.slice(1)
  return path.join(...newSegments)
}
