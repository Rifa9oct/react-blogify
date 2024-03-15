import { useState, useEffect } from "react";

export const useLocalStorage = (storageKey, defaultValue) => {
    const [userInfo, setUserInfo] = useState(
        JSON.parse(localStorage.getItem(storageKey)) ?? defaultValue
        );
    
    useEffect(()=>{
        localStorage.setItem(storageKey, JSON.stringify(userInfo))
    },[storageKey, userInfo])
    
    return [userInfo, setUserInfo]
};

