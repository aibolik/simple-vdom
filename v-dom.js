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
  const oldBase = component.base
  component.base = renderNode(
    component.render(component.props, component.state)
  )

  if (parent) {
    parent.appendChild(component.base)
  } else {
    oldBase.parentNode.replaceChild(component.base, oldBase)
  }
}