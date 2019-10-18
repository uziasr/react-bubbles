import React, {useState} from "react";
import axiosWithAuth from '../utils/axiosWithAuth'


const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  console.log('this is props',props)
  const [user, setUser] = useState()
  const handleChange = (e) =>{
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })
  }

  const submitUser = (e) =>{
    e.preventDefault()
    axiosWithAuth()
    .post('/login',user)
    .then(res=>{
      console.log(res)
      localStorage.setItem('token', res.data.payload)
      props.history.push('/bubble')
    })
    .catch(err=>console.log(err.response))
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form>
        <input type='text' name='username' placeholder='password' onChange={handleChange}></input>
        <input type='password' name='password' placeholder='password' onChange={handleChange}></input>
        <button onClick={submitUser}>Login!</button>
      </form>
    </>
  );
};

export default Login;
