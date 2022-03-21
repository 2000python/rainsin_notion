/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React, { useRef, FC, ReactElement,useContext,useCallback,useState } from 'react';
import TextChunk from '../chunk/text-chunk';
import './index.css';

interface IProps {
    type: string;
    defaultValue: string;
    onChange: () => string;
 }

  
const Input: FC<IProps> = ({ 
    type,
    defaultValue,
    onChange,
}): ReactElement => {

    const inputRef = useRef<HTMLInputElement>(null);

    const change = () => {
        onChange()
    }
    return <>
        <input type={type} placeholder={defaultValue} ></input>
        {type === 'search' ? <>
            <button onClick={change}></button>
        </> : <><TextChunk>我不是搜索框</TextChunk></>}
    </>
} 

export default Input