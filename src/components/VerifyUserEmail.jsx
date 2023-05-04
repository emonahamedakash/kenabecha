import React,{ useState} from 'react'
import { useLocation,useNavigate } from "react-router-dom";
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import './VerifyUserEmail.css';


const VerifyUserEmail = () => {
  const { state } = useLocation();
  const { formData } = state;

  const {email}= formData;
  const [verifyCode, setVerCode] = useState(formData.email);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    const data = {
      email,
      verifyCode,
    };
    axios
      .post(`${baseUrl}/api/mailverify`, JSON.stringify(data, undefined, 5), {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      })
      .then((res) => {
        console.log(res);
        alert("Email verified successfully...")
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h2>
        Hello {formData.name}
      </h2>
      <h3>Please check your inbox and give the verification code below.</h3>
      <form onSubmit={handleSubmit} className='verifyForm'>
        <input type="text" name="verifyCode" onChange={(e)=>setVerCode(e.target.value)}/>
        <br />
        <br />
        <input className="btn btn-primary" type="submit" />
      </form>
    </div>
  )
}

export default VerifyUserEmail