export default function hyperscript(nodeName, attributes, ...children) {
  return { nodeName, attributes, children }
}