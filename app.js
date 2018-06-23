import h from './my-hyperscript.js';

const App = (props) => {
  const { list } = props;

  return h('div', { class: 'app' },
    h('h1', null, 'Simple vDOM'),
    h(
      'ul', null,
      ...list.map(item => h('li', null, item))
    )
  );
};

let currentApp;
const render = (state) => {
  const newApp = App(state);
  currentApp 
    ? document.body.replaceChild(newApp, currentApp)
    : document.body.appendChild(newApp);
  
  currentApp = newApp;
};

const state = {
  list: [
    '🕺', '💃', '😀', '🙋‍', '💼',
    '🕶️️', '👏', '🤳', '🕵️', '👩‍🔧'
  ]
};

render(state);