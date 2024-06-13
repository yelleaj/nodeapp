import React, { Fragment, useEffect, useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');
  const [fullName, setFullName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [gender, setGender] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [showReview, setShowReview] = useState(false);

  async function getName() {
    try {
      const response = await fetch('http://localhost:5000/dashboard', {
        method: 'GET',
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setName(parseRes.user_name);
    } catch (err) {
      console.error(err.message);
    }
  }

  const logout = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
  };

  useEffect(() => {
    getName();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setShowReview(true);
  };

  const handleFinalSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.token,
        },
        body: JSON.stringify({
          fullName,
          countryCode,
          mobileNumber,
          gender,
          address1,
          address2,
        }),
      });

      const parseRes = await response.json();
      console.log(parseRes);

      if (response.ok) {
        // Reset form
        setFullName('');
        setCountryCode('');
        setMobileNumber('');
        setGender('');
        setAddress1('');
        setAddress2('');
        setShowReview(false);
        // Show success message
        alert('Data submitted successfully');
      } else {
        // Handle error
        alert('Failed to submit data');
      }
    } catch (err) {
      console.error(err.message);
      alert('Server error');
    }
  };

  return (
    <Fragment>
      <div className='dashboard-container'>
        <h1>Contact Details</h1>
        {!showReview ? (
          <form onSubmit={handleSubmit}>
                          <label>Enter Your Full Name</label>

            <input 
              type='text' 
              placeholder='Enter Full Name' 
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
            />
                          <label>Mobile Number</label>
            <div>

              <select 
                className='country-code'
                value={countryCode}
                onChange={e => setCountryCode(e.target.value)}
                required>
                <option value="">Choose Country Code</option>
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+465">+465</option>
                <option value="+23">+23</option>
              </select>

              <input 
                type='number' 
                placeholder='Mobile Number' 
                value={mobileNumber}
                onChange={e => setMobileNumber(e.target.value)}
                required 
              />
            </div>
            <label>Gender</label>
            <select 
              className='options'
              value={gender}
              onChange={e => setGender(e.target.value)}
              required
            >
              <option value="">Choose Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input 
              type='text' 
              placeholder='Address 1' 
              value={address1}
              onChange={e => setAddress1(e.target.value)}
              required 
            />
            <input 
              type='text' 
              placeholder='Address 2'
              value={address2}
              onChange={e => setAddress2(e.target.value)}
            />
            <button type='submit'>Submit</button>
          </form>
        ) : (
          <div className="review-container">
            <h2>Review Your Details</h2>
            <p><strong>Full Name:</strong> {fullName}</p>
            <p><strong>Country Code:</strong> {countryCode}</p>
            <p><strong>Mobile Number:</strong> {mobileNumber}</p>
            <p><strong>Gender:</strong> {gender}</p>
            <p><strong>Address 1:</strong> {address1}</p>
            <p><strong>Address 2:</strong> {address2}</p>
            <button onClick={handleFinalSubmit}>Confirm and Submit</button>
            <button onClick={() => setShowReview(false)}>Go Back</button>
          </div>
        )}
      </div>
      <button onClick={logout}>Logout {name}</button>
    </Fragment>
  );
};

export default Dashboard;
