import {useNavigate} from 'react-router-dom'
export function Users({firstName, lastName, to})
{
    const navigate = useNavigate();
    return(
        <div className="mx-6 flex items-center justify-between bg-gray-100 rounded-lg my-2">
            <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center cursor-pointer text-lg">
                        {firstName[0].toUpperCase()}
                </div>
                <div className="px-3 font-medium text-lg">
                    {firstName} {lastName}
                </div>
            </div>
            <div className="flex justify-center my-2">
                <button onClick={()=>{
                            navigate(`/Home/sendmoney?to=${to}`)
                        }} className="w-full font-medium rounded-lg px-3 py-2 text-white bg-black hover:bg-slate-800">
                    Send Money
                </button>
            </div>
        </div>
    )
}