import React, { useState } from 'react';

function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    picture: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'picture') {
      const file = files[0];
      if (file && file.size > 2 * 1024 * 1024) {
        setError('Image size should be less than 2MB');
        return;
      }
      setForm({ ...form, picture: file });
      setError('');
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, picture } = form;

    if (!name || !email || !password || !confirmPassword || !picture) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setSuccess('Signup successful!');
    console.log('Form submitted:', form);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Signup</h2>
      <form onSubmit={handleSubmit} style={styles.form} target='_blank' >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <div style={styles.passwordField}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={styles.toggle}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <div style={styles.passwordField}>
          <input
            type={showConfirm ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            style={styles.toggle}
          >
            {showConfirm ? 'Hide' : 'Show'}
          </button>
        </div>
        <input
          type="file"
          name="picture"
          accept="image/*"
          onChange={handleChange}
          style={styles.input}
          required
        />
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
        <button type="submit" style={styles.button}>Signup</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    borderRadius: '10px',
    background: '#f7f7f7',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    padding: '10px',
    margin: '8px 0',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px'
  },
  button: {
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px'
  },
  toggle: {
    position: 'absolute',
    right: '10px',
    top: '7px',
    background: 'none',
    border: 'none',
    color: '#007BFF',
    cursor: 'pointer'
  },
  passwordField: {
    position: 'relative'
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px'
  },
  success: {
    color: 'green',
    fontSize: '14px',
    marginTop: '5px'
  }
};

export default Signup;
