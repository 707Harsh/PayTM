import { useEffect, useState } from "react"

export function useDebounce(inputValue, n)
{
    const [value, setValue] = useState(inputValue);
                                         
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setValue(inputValue);
        },n*1000)
        return () => {
            clearTimeout(timer)
        }
    },[inputValue,n])

    return value;
}