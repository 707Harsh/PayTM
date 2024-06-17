import { useRecoilState } from "recoil";
import { Dashboard } from "./Dashboard";
import { SendMoney } from "./SendMoney";
import { useLocation, useNavigate } from 'react-router-dom';
import { dbAtom, smAtom } from "../store/atom";
import {useEffect} from 'react'

export function MainPage()
{
    let location = useLocation();
    const [sm , setSm] = useRecoilState(smAtom);
    const [db, setDb] = useRecoilState(dbAtom);
    const navigate = useNavigate();
    useEffect(() => {
        if (location.pathname === '/sendmoney') {
            navigate('/sendmoney')
        } else if (location.pathname === '/Home') {
            setSm("hidden");
            setDb("");
        }
    }, [location.pathname, setSm, setDb]);
    return(
        <div>
            <Dashboard/>
        </div>
    )
}