/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import PubSub from 'pubsub-js';
import { Helmet } from 'react-helmet';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import './index.css';
import { IApp } from './App';
import BookDetail from './page/books-rack/detail';
import RubikIndex from './page/rubik';
import BlogIndex from './page/blog';
import reportWebVitals from './reportWebVitals';
import { ViewportProvider } from './api/viewportContext';

function AllTitle() {
  const [title, setTitle] = useState('解忧杂货店');

  const setPagetitle = (_,data) => {
    setTitle(data.Ititle)
  }

  useEffect(() => {
    PubSub.subscribe('PageTitle',setPagetitle)
  },[])
  return (
    <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </>
  )
}

ReactDOM.render(
  <ViewportProvider>
    <BrowserRouter>
      <AllTitle></AllTitle>
      <Routes>
        <Route path="/" element={<IApp />}>
        </Route>
        <Route path="/library/:mid" element={<BookDetail></BookDetail>}>
          {/* <Route path="/:artdetail" element={}>

          </Route> */}
        </Route>
        <Route path="/rubik/:mid" element={<RubikIndex></RubikIndex>}>
        </Route>
        <Route path='/blog/:mid' element={<BlogIndex></BlogIndex>}>
        </Route>
      </Routes>
    </BrowserRouter>
    </ViewportProvider>,
    
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
