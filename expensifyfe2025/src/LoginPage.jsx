import React from "react";
import {useState, useEffect} from "react";
import InfoPage from '/InfoPage.png';
import { Button, Form } from "react-bootstrap";
import Logo from '/projectLogo.png';
import { useNavigate } from "react-router-dom";
function LoginPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSignup = () => {
        console.log("Inside function");
        props.setIsSignupClicked(true);
        navigate("/signup");
    }
    return (
        <div className="flex">
            <div className="login-section flex flex-col justify-center items-center">
                <div className="login-form shadow-2xl rounded-2xl border border-amber-50">
                    <Form className="flex flex-col gap-2.5 m-2.5">
                      <Form.Label className="font-medium">Email Address</Form.Label>
                       <Form.Control type="email" placeholder="Enter email" className="text-field-css"/>
                       <Form.Label className="font-medium">Password</Form.Label>
                       <Form.Control type="password" placeholder="Enter password" />
                       <div className="flex items-center justify-center gap-2.5 mt-3.5">
                        <Button className="w-40 !border-none button-color">
                            Login
                        </Button>
                        <Button className="w-40 !border-none button-color">
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