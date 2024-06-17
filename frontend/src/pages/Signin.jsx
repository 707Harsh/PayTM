import axios from "axios";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { Textbox } from "../components/Textbox";
import { Warning } from "../components/Warning";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";

export function Signin()
{

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");   
    const navigate = useNavigate(); 

    return(
        <div className=" w-screen h-screen bg-gray-1 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg w-80 sm:w-480">
                <Heading value={'Sign In'}/>
                <Subheading value={'Enter your credentials to access your account'}/>
                <Textbox onChange={(e)=>{
                    setUsername(e.target.value);
                }} title={'Email'} placeholder={'harsh@example.com'} type={'text'}/>
                <Textbox onChange={(e)=>{
                    setPassword(e.target.value);
                }} title={'Password'} placeholder={null} type={'password'}/>
                <Button onClick={async()=>{
                    let response;
                    try {
                        response = await axios.post('http://localhost:3000/api/v1/user/signin',
                        {
                            username,
                            password
                        });
                        localStorage.setItem('token',response.data.token);
                        navigate('/Home?firstName='+ response.data.firstName);
                    } catch (error) {
                        console.log(error.response.data.msg); // remove this console.log and print the msg on screen
                    }
                }} value={'Sign In'}/>
                <Warning value={"Don't have an account"} toValue={'Sign Up'} to={'/signup'}/>
            </div>
        </div>
    )
}