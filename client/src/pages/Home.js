import React, {useState} from 'react';

function Home() {
  const [responseA, setResponseA] = useState("")

  const onRegisterClick =  () => {
    const fetchResponse = async() => {
      await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "email": "mld2eg@virginia.edu",
          "password": "1234567890"
        })
      }).then(response => response.json())
      .then(response => {
        setResponseA(response);
        console.log(response);
      })
    }
    fetchResponse();
  }

  const onLoginClick = () => {
    const fetchResponse = async() => {
      //need to update body
      await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "email": "michael.djorup@gmail.com",
          "password": "!MD6a5e6a11!"
        })
      }).then(response => response.json())
      .then(response => {
        setResponseA(response);
        console.log(response);
      })
    }
    fetchResponse();
  }

  const onLogoutClick = () => {
    const fetchResponse = async() => {
      //need to update body
      await fetch('http://localhost:5000/auth/logout', {
        method: 'POST',
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify({})
      }).then(response => response.json())
      .then(response => {
        setResponseA(response);
        console.log(response);
      })
    }
    fetchResponse();
  }

  return (
    <div className="bg-blue-400">
      <button className="bg-yellow-700/100" onClick={onRegisterClick}>Register</button>
      <br/>
      <button className="bg-yellow-700/100" onClick={onLoginClick}>Login</button>
      <br/>
      <button className="bg-yellow-700/100" onClick={onLogoutClick}>Logout</button>
      <br/>
      {JSON.stringify(responseA)}
    </div>
  );
}

export default Home;
