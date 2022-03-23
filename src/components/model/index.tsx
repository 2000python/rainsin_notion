/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import { ProxyType } from 'immer/dist/internal';
import React, { FC, ReactElement, useState, useEffect,useContext } from 'react';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import './index.css';

/**
 * @param {Boolean} unfold 是否挂载
 * @param {Function} change 改变挂载状态的函数
 */

interface IProps {
    unfold: boolean;
    chilren: ReactElement;
    change: Function;
}

  
const ModelChunk: FC<IProps> = ({ 
    children,
    unfold,
    change,
}): ReactElement => {
    const context = useContext(Context);
    return unfold ? <>
        <div className='magnet-main-box'>
                            <div className='magnet-meck-box' onClick={() => change()}>

                            </div>
                            <div className='magnet-box'>
                                {children}
                            </div>          
                        </div>
    </> : <></>
} 

export default observer(ModelChunk);  