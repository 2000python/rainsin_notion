/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React from "react";
import add from "../20220424170726.gif"
import "./loading.css"

const Loading = (props) => {

    return <>
        <div className="loading-box">
            <div className="loading-icon-box">
                {/* <svg className="icon rotate" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5808" width="40" height="40"><path d="M469.333333 128a42.666667 42.666667 0 0 1 42.666667-42.666667c235.648 0 426.666667 191.018667 426.666667 426.666667a42.666667 42.666667 0 1 1-85.333334 0 341.333333 341.333333 0 0 0-341.333333-341.333333 42.666667 42.666667 0 0 1-42.666667-42.666667z" p-id="5809"></path></svg> */}
                <img src={add} alt='等一下'></img>
            </div>
            {props.content ? props.content : '皇上不急太监急...'}
        </div>
        
    </>
}

export default Loading;

