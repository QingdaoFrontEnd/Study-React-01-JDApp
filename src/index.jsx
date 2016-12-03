const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./components/app.jsx');
// 引入通用样式
import './style/Elf/browser/_normalize.sass'


ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
