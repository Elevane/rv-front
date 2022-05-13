import React from "react";
import swal from 'sweetalert2';
import "./style/Login.css";

async function authenticate(username, password) {
    const user ={
      username : username,
      password : password
    }
    return fetch("https://localhost:7139/api/Users/authenticate" ,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        "Accept" : "*/*"
      },
      body: JSON.stringify(user)
    })
      .then(data => data.json())
   }


export default function Login(){
    const [username, setUserName] = React.useState();
    const [password, setPassword] = React.useState();
  
    const handleSubmit = async e => {
      
      e.preventDefault();
      let response = await authenticate(
        username,
        password
      ).then((value) => {
        if(!value.isSuccess){
          new swal("Failed connection Error", value.errorMessage, "error");
        }
        if(value.result === undefined){
          new swal("Failed connection Error","", "error")
        }
        
        localStorage.setItem("user", JSON.stringify({user : value.result, auth: true}));
        window.location.href = "/home"
      })
     
      
    }
      return(
      <div id="login-form-wrap">
          <h2>Login</h2>
          <form id="login-form" onSubmit={handleSubmit}>
            <p>
            <input type="text" id="username" onChange={e => setUserName(e.target.value)} name="username" placeholder="Username" required/>
            </p>
            <p>
            <input type="password" id="password" onChange={e => setPassword(e.target.value)}  name="password" placeholder="password" required/>
            </p>
            <p>
            <input type="submit" id="login" value="Login"/>
            </p>
          </form>
          <div id="create-account-wrap">
            <p>Not a member? <a href="#">Create Account</a></p>
          </div>
      </div>
      );
    }
  