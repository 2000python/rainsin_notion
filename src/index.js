/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React, { useState, useEffect, createContext,useContext,useMemo } from 'react';

import {observer} from "mobx-react-lite";

import store  from './app/store';

import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import './index.css';
import  App  from './App';
import BookDetail from './page/books-rack/detail';
import RubikIndex from './page/rubik';
import BlogIndex from './page/blog';
import reportWebVitals from './reportWebVitals';
import { ViewportProvider } from './api/viewportContext';
import BlogDetail from './page/blog/detail';
import Nav from './components/nav/nav';
import { tianyi, aliyun } from './api/tianyi';
import Resume from './page/resume';

export const Context = createContext({});

function Title() {
  const path = useContext(Context);
  return (
    <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>{path.page_title[path.page_title.length - 1]}</title>
                <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </>
  )
}
const AllTitle = observer(Title);
ReactDOM.render(
  <Context.Provider value={store}>
  <ViewportProvider>
    <BrowserRouter>
      <AllTitle></AllTitle>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<App />} />
          <Route path="/library/:mid" element={<BookDetail></BookDetail>}>
          </Route>
          <Route path="/rubik/:mid" element={<RubikIndex></RubikIndex>}>
          </Route>
          <Route  path='/blog/:mid' element={<BlogIndex></BlogIndex>}>
          </Route>
          <Route path='/blog/detail/:art_mid/:art_title' element={<BlogDetail></BlogDetail>}>
            </Route>
            <Route path='/resume' element={<Resume></Resume>}>
              
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </ViewportProvider>
    </Context.Provider>,
    
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
