import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;

    // Corrected URL with 'http://'
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    const json = await response.json();
    console.log(json); // Handle response or navigate to another page after signup

    if (json.success) {
      // Redirect on success
      localStorage.setItem('token', json.authtoken); 
      navigate('/');
      props.showalert("Account Created Successfully","success")
    } else {
      props.showalert("Invalid credentials","danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="container mt-3 ">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} required minLength={5} />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
