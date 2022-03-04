/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import './App.css';
import { BrowserRouter as Router, Route,Link ,Switch} from 'react-router-dom'
import { Helmet } from "react-helmet";
import IndexPage from './page/index';
import PubSub from 'pubsub-js';
// import { Layout } from 'antd';
import 'antd/dist/antd.css'
// import { Link,Route } from 'react-router-dom';

// const { Header, Footer, Sider, Content } = Layout;

export function IApp() {
  
  return (
    <div className="App">
      <IndexPage></IndexPage>
    </div>
  );
}
function App(props) {
  return (
    <>
      {props.children}
    </>
  )
}

export default App;
