import React from "react";
import { Button, Form } from "react-bootstrap";
import InfoPage from '/InfoPage.png';
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";

function SignupPage(props) {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSwitch = () => {
        props.setIsSignupClicked(false);
        navigate("/");
    }

    const handleUserName = (event) => {
        setUserName(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSignup = async () => {
           if(userName.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0) {
              Swal.fire({
                title: 'Error!',
                text: "Signup fields are empty!",
                icon: 'warning',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            })
            return;
        }
        const signupBody = {
            userName: userName,
            email: email,
            password: password
        }
        try {
            await axios.post("http://localhost:9090/expensify-login-api/signup", signupBody);

            Swal.fire({
                title: 'Success!',
                text: "Signup completed!",
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    confirmButton: 'my-confirm-button'
                }
            }).then((result)=> {
                if(result.isConfirmed) {
                    handleReset();
                    navigate("/");
                }
            });

        } catch (error) {
            console.log("Error signing up new user", error);
        }
    }

    const handleReset = () => {
        setEmail('');
        setUserName('');
        setPassword('');
    };

    return (
        <div className="flex">
            <div className="login-section flex flex-col justify-center items-center">
                
                <div className="login-form signup-form shadow-2xl rounded-2xl border border-amber-50">
                    <Form className="flex flex-col gap-2.5 m-2.5">
                        <Form.Label className="font-medium">Username</Form.Label>
                       <Form.Control type="text" placeholder="Enter username" className="text-field-css" value={userName} onChange={handleUserName}/>
                      <Form.Label className="font-medium">Email Address</Form.Label>
                       <Form.Control type="email" placeholder="Enter email" className="text-field-css" value={email} onChange={handleEmail}/>
                       <Form.Label className="font-medium">Password</Form.Label>
                       <Form.Control type="password" placeholder="Enter password" value={password} onChange={handlePassword}/>
                       <div className="flex items-center justify-center gap-2.5 mt-3.5">
                        <Button className="w-40 !border-none button-color" onClick={()=> handleSignup()}>
                            Sign Up
                        </Button>
                        <Button className="w-40 !border-none button-color" onClick={()=> handleReset()}>
                            Reset
                        </Button>
                       </div>
                       <p className="mt-2" onClick={handleSwitch}>Already have an account? <span className="cursor-pointer font-medium hover:underline login-page-minor-css">Login</span></p>
                    </Form>
                </div>


            </div>
            <div className="info-section">
                <img src={InfoPage} className="info-page-css" />
            </div>
        </div>
    )
}
export default SignupPage;