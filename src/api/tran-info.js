/*
 * @LastEditors: 尉旭胜(Riansin)
 * @Author: 尉旭胜(Riansin)
 */
import React from "react";
import PubSub from 'pubsub-js';
import { useLocation,useMatch } from 'react-router-dom';

const tranData = React.createContext({});

export const TranData = ({ children }) => {
    const [pathStack, setPathstack] = React.useState(
        [
            {
                pathname: '/',
                search: '',
                state: null,
            }
        ]);
    const location = useLocation();

    const setTitle = (_,data) => {
        const nowPath = {...location,title: data};
        setPathstack(prev => [prev,nowPath])
    }

    React.useEffect(() => {
        PubSub.subscribe('PageTitle',setTitle)
    },[])
    return (
        <tranData.Provider value={pathStack}>
            {children}
        </tranData.Provider>
    )
}

const useData = {
    usePath: () => {
        const data = React.useContext(tranData);
        return data.pathData;
    },
}
export default useData;