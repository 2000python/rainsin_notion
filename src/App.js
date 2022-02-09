/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import './App.css';
import { Helmet } from "react-helmet";
import IndexPage from './page/index';
// import { Layout } from 'antd';
import 'antd/dist/antd.css'
// import { Link,Route } from 'react-router-dom';

// const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Helmet>
                <meta charSet="utf-8" />
                <title>解忧杂货店</title>
                <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
      <IndexPage/>
    </div>
  );
}

export default App;
