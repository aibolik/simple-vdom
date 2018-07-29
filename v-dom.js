const renderNode = vnode => {
  let el

  const { nodeName, attributes, children } = vnode

  if (vnode.split) return document.createTextNode(vnode)

  if (typeof nodeName === 'string') {
    el = document.createElement(nodeName)

    for (let key in attributes) {
      el.setAttribute(key, attributes[key])
    }
  } else if (typeof nodeName === 'function') { // here is our `People`
    // initiate our component
    const component = new nodeName(attributes)
    el = renderNode(
      component.render(component.props, component.state)
    )
    // save DOM reference to `base` field as in `renderComponent`
    component.base = el
  }
  // recursively do this to all of its children
  (children || []).forEach(child => el.appendChild(renderNode(child)))

  return el
}

export const renderComponent = (component, parent) => {
  let rendered = component.render(component.props, component.state)
  component.base = diff(component.base, rendered)
}

export const diff = (dom, vnode, parent) => {
  if (dom) {
    if (typeof vnode === 'string') {
      dom.nodeValue = vnode

      return dom
    } 
    if (typeof vnode.nodeName === 'function') {
      const component = new vnode.nodeName(vnode.attributes)
      const rendered = component.render(component.props, component.state)

      diff(dom, rendered)
      return dom
    }

    // Naive check for number of chilren of vNode and dom
    if (vnode.children.length !== dom.childNodes.length) {
      dom.appendChild(
        // render only the last child
        renderNode(vnode.children[vnode.children.length - 1])
      )
    }

    // run diffing for children
    dom.childNodes.forEach((child, i) => diff(child, vnode.children[i]))

    return dom
  } else {
    const newDom = renderNode(vnode)
    parent.appendChild(newDom)
    return newDom
  }
}