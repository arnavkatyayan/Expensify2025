import React from "react";
import {useState, useEffect} from "react";
import InfoPage from '/InfoPage.png';
import { Button, Form } from "react-bootstrap";
import Logo from '/projectLogo.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
function LoginPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = () => {
        props.setIsSignupClicked(true);
        navigate("/signup");
    }

    const handleReset = () => {
        setEmail("");
        setPassword("");
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    const handleLogin = async () => {
        if (email.trim().length === 0 || password.trim().length === 0) {
            Swal.fire({
                title: 'Error!',
                text: "Signup fields are empty!",
                icon: 'warning',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            });
            return;
        }
        const loginRequestBody = {
            email:email,
            password:password
        }
        try {
            const resp = await axios.post("http://localhost:9090/expensify-login-api/login", loginRequestBody);
            if(resp.data === true) {
             Swal.fire({
                    title: 'Success!',
                    text: 'Login Succesful!.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'my-confirm-button'
                    }
                });
            }
            else {
                  Swal.fire({
                    title: 'Error!',
                    text: 'The credentials are wrong!.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'my-confirm-button'
                    }
                });
            }
        }
        catch (error) {
            console.log("Error in login.",error);
        }
    }
    return (
        <div className="flex">
            <div className="login-section flex flex-col justify-center items-center">
                <div className="login-form shadow-2xl rounded-2xl border border-amber-50">
                    <Form className="flex flex-col gap-2.5 m-2.5">
                      <Form.Label className="font-medium">Email Address</Form.Label>
                       <Form.Control type="email" placeholder="Enter email" className="text-field-css" value={email} onChange={handleEmail}/>
                       <Form.Label className="font-medium">Password</Form.Label>
                       <Form.Control type="password" placeholder="Enter password" value={password} onChange={handlePassword}/>
                       <div className="flex items-center justify-center gap-2.5 mt-3.5">
                        <Button className="w-40 !border-none button-color" onClick={()=>handleLogin()}>
                            Login
                        </Button>
                        <Button className="w-40 !border-none button-color" onClick={()=>handleReset()}>
                            Reset
                        </Button>
                       </div>
                       <p className="mt-2" onClick={handleSignup}>Dont have an account? <span className="cursor-pointer font-medium hover:underline">SignUp</span></p>
                    </Form>
                </div>


            </div>
            <div className="info-section">
                <img src={InfoPage} className="info-page-css" />
            </div>
        </div>
    )
}
export default LoginPage;