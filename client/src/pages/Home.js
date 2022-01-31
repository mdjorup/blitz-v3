import React, {useState} from 'react';

function Home() {
  const [responseA, setResponseA] = useState("")

  const onRegisterClick =  () => {
    const fetchResponse = async() => {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers : {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({hello: 'hello'})
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
      <button onClick={onRegisterClick}>Register</button>
      {JSON.stringify(responseA)}
    </div>
  );
}

export default Home;
