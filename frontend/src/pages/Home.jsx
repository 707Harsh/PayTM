import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import { Topbar } from "../components/Topbar";
import { useRecoilState } from "recoil";
import { nameAtom } from "../store/atom";
import {useEffect, useState} from 'react'
import { SendMoney } from "./SendMoney";
import { Dashboard } from "./Dashboard";

export function Home()
{
    let [searchParams] = useSearchParams();
    const [name, setName] = useRecoilState(nameAtom);
    const [show, setShow] = useState("");
    const signedInName = searchParams.get('firstName');
    useEffect(() => {
        if (signedInName) {
            setName(signedInName);
        }
    }, [signedInName, setName]);
    const location = useLocation();
    useEffect(()=>{
        if(location.pathname.endsWith("/sendmoney"))
        {
            setShow("hidden");
        }
        else
        {
            setShow("");
        }
    },[location]);
    return(
        <div>
            <Topbar firstName={name?name:"error"}/>
            <div className={`${show}`}>
                <Dashboard/>
            </div>
            <Routes>
                <Route path="sendmoney" element={<SendMoney/>}/>
            </Routes>
        </div>
    )
}