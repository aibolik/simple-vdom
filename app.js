import h from './my-hyperscript.js'
import Component from './component'
import { diff } from './v-dom.js';

const getRandomItemFromArray = (list) => {
  return list[
    Math.round(Math.random() * (list.length - 1))
  ];
};

class App extends Component {
  render() {
    return h('div', { class: 'app' },
      h('h1', null, 'Simple vDOM'),
      h(People)
    )
  }
};

class People extends Component {
  constructor(props) {
    super(props)

    this.state = {
      list: [
        '🕺', '💃', '😀', '🙋‍', '💼',
        '🕶️️', '👏', '🤳', '🕵️', '👩‍🔧'
      ]
    }

    this.timer = setInterval(_ => {
      this.setState({
        list: [...this.state.list, getRandomItemFromArray(this.state.list)]
      })
    }, 1000)
  }

  render(props, state) {
    return h(
      'ul', null,
      ...state.list.map(item => h('li', null, item))
    )
  }
}

const render = (vnode, parent) => {
  diff(undefined, vnode, parent)
}

render(h(App), document.querySelector('#root'))
