// import { Topbar } from "../components/Topbar";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Textbox } from "../components/Textbox";
import { useNavigate, useSearchParams } from "react-router-dom";
import {useEffect, useState} from 'react';
import axios from 'axios';
// import { useRecoilValue } from "recoil";
// import { nameAtom } from "../store/atom";

export function SendMoney()
{
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(false);
    const [firstname, setFirstName] = useState("");
    const [amount, setAmount] = useState(0);
    // const name =  useRecoilValue(nameAtom);
    const [lastname, setLastName] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    let [searchParams] = useSearchParams();
    const to = searchParams.get('to');

    useEffect( ()=>{
        const check = async()=>{
            try {
                const response = await axios.get('http://localhost:3000/api/v1/user/me',{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                })
                if(response.data.msg==='good to go')
                {
                    if(to)
                    {
                        const response1 = await axios.post('http://localhost:3000/api/v1/user/toChecker',{
                            to : to
                        })
                        if(response1.data.msg === 'good to go')
                        {
                            const gain = async ()=>{
                                const response = await axios.post('http://localhost:3000/api/v1/user/getName',{id:to})
                                setFirstName(response.data.firstName);
                                setLastName(response.data.lastName);
                            }
                    
                            gain();
                            setVisible(true);
                            setError(false);
                        }
                    }
                    else
                    {
                        setError(true);
                        setVisible(false);
                        // throw new TypeError('Invalid inputs');
                        console.log('Type error');
                    }
                }
            } catch (error) {
                if ((error.response && error.response.status === 403)) {
                  // Redirect to the sign-in page if the user is not authenticated
                  navigate('/signin');
                }
                else if(error.response && error.response.status === 400)
                {
                    console.log('Invalid inputs',error);
                    setError(true);
                }
                 else {
                  console.log('An unexpected error occurred:', error);
                  setError(true);
                }
              }
        }

        check();
    },[navigate])

    // useEffect(()=>{
    //     const gain = async ()=>{
    //         const response = await axios.post('http://localhost:3000/api/v1/user/getName',{id:to})
    //         setFirstName(response.data.firstName);
    //         setLastName(response.data.lastName);
    //     }

    //     gain();
    // },[])


    return(
        <div>
            {error &&
                <div>
                    Error 400 : Bad inputs
                </div>
            }
            
            {visible &&
                <div>
                    {/* <Topbar firstName={name}/> */}
                    <div className=" w-screen h-screen bg-gray-200 flex justify-center items-center">
                        <div className="bg-white p-5 w-80 sm:w-480 rounded-lg">
                            <Heading value={'Send Money'}/>
                            <div className="flex items-center pt-4 border-t-2">
                                <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-lg">
                                    {firstname?firstname[0].toUpperCase():""}
                                </div>
                                <div className="px-3 font-medium text-lg">
                                    {`${firstname?firstname:""} ${lastname?lastname:""}`}
                                </div>
                            </div>
                            <Textbox onChange={(e)=>{setAmount((e.target.value))}} title={'Amount ( in Rs )'} placeholder={'Enter amount'} type={'text'}/>
                            <Button onClick={async()=>{
                                try {
                                    const response = await axios.post('http://localhost:3000/api/v1/account/transfer',{
                                        amount:parseFloat(amount),
                                        to
                                    },{
                                        headers:{
                                            'Authorization':`Bearer ${token}`
                                        }
                                    })
                                    console.log(response.data.msg);
                                    // navigate('/Home');
                                    window.location.href='/Home'
                                } catch (error) {
                                    console.log(error.data.msg);
                                }
                            }} value={'Initiate Transfer'}/>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}