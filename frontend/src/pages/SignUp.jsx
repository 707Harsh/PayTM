import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { Textbox } from "../components/Textbox";
import { Warning } from "../components/Warning";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function SignUp()
{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return(
        <div className=" w-screen h-screen bg-gray-1 flex justify-center items-center">
            <div className="bg-white p-5 w-80 sm:w-480 rounded-lg">
                <Heading value={'Sign Up'}/>
                <Subheading value={'Enter your information to create an account'}/>
                <Textbox title={'First Name'} onChange={(e)=>setFirstName(e.target.value)} placeholder={'Harsh'} type={'text'}/>
                <Textbox title={'Last Name'} onChange={(e)=>setLastName(e.target.value)} placeholder={'Chaudhary'} type={'text'}/>
                <Textbox title={'Email'} onChange={(e)=>setUsername(e.target.value)} placeholder={'harsh@example.com'} type={'text'}/>
                <Textbox title={'Password'} onChange={(e)=>setPassword(e.target.value)} placeholder={null} type={'password'}/>
                <Button onClick={async ()=>{
                    const response = await axios.post('http://localhost:3000/api/v1/user/signup',{
                        username,
                        firstName,
                        lastName,
                        password
                    });
                    localStorage.setItem('token',response.data.token);
                    navigate('/Home?firstName='+ firstName);
                }} value={'Sign up'}/>
                <Warning value={'Already have an account'} toValue={'Sign in'} to={'/signin'}/>
            </div>
        </div>
    )
}