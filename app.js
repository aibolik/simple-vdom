import h from './my-hyperscript.js';

const App = () => {
  return h(
    'h1',
    null,
    'Hello, vDOM!'
  );
};

console.log('App', App());