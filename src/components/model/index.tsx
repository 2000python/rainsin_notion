/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React, { FC, ReactElement, useState ,useEffect } from 'react';
import './index.css';

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
    // useEffect(() => {
    //   document.body.style.overflow = 'hidden';
    //   return function () {
    //     document.body.style.overflow = 'auto';
    //   }
    // },[])
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

export default ModelChunk  