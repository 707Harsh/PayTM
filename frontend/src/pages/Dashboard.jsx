import { useEffect, useState } from "react";
import { Searchbox } from "../components/SearchBox";
// import { Topbar } from "../components/Topbar";
import { Users } from "../components/Users";
// import { useSearchParams, useNavigate } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { nameAtom } from "../store/atom";
// import { useRecoilState } from "recoil";

export function Dashboard()
{
    // let [searchParams] = useSearchParams();
    const firstName = useRecoilValue(nameAtom);
    //  
    const [usersList, setUsersList] = useState({});
    const [filter, setFilter] = useState("");
    const [balance, setBalance] = useState(0);
    const [visible, setVisible] = useState(false);
    const token = localStorage.getItem('token');
    // const history = useHistory();
    const location = useLocation();
    const navigate = useNavigate();

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
                    if(!(location.pathname.endsWith('/sendmoney')))
                    {
                        navigate('/Home?firstName='+response.data.firstName);
                        setVisible(true);
                    }
                }
            } catch (error) {
                if (error.response && error.response.status === 403) {
                  // Redirect to the sign-in page if the user is not authenticated
                  navigate('/signin');
                } else {
                  console.error('An unexpected error occurred:', error);
                }
              }
        }

        check();
    },[navigate])
    

        // debouncing here
        useEffect(()=>{
            axios.get('http://localhost:3000/api/v1/user/bulk?filter='+filter,
            {
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            }).then(response=>{setUsersList(response.data.users)})
    
        },[filter])
    
        useEffect(()=>{
    
            axios.get('http://localhost:3000/api/v1/account/balance',
            {
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            }).then((response)=>setBalance(response.data.balance))
        },[])

    return(
        <div>
            {visible && 
            <div>
                {/* <Topbar firstName={name}/> */}
                <div className=" text-2xl py-4 px-6 font-medium my-2">
                    Your Balance : ₹ {balance}
                </div>
                <div className="text-2xl px-6 font-medium my-2">
                    Users
                </div>
                <div className="px-6 my-2">
                    <Searchbox onChange={(e)=>{setFilter(e.target.value)}} placeholder={'Search users ...'}/>
                </div>
                <div>
                    {
                        Object.entries(usersList).map((user)=>{
                            if(user[1].firstName != firstName)
                            return <Users key={user[0]} firstName={user[1].firstName} lastName={user[1].lastName} to={user[1]._id}/>
                        })
                    }
                </div>
            </div>
            }
        </div>
    )
}