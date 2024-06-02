import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      role: '',
      name: '',
      address: '',
      phone: '',
      dateOfBirth: '',
      parentName: '',
      parentAddress: '',
      parentPhone: '',
      parentDateOfBirth: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      role: Yup.string().required('Role is required'),
      name: Yup.string().required('Name is required'),
      address: Yup.string().required('Address is required'),
      phone: Yup.string().required('Phone is required'),
      dateOfBirth: Yup.string().required('Date of Birth is required'),
      parentName: Yup.string().required('Parent Name is required'),
      parentAddress: Yup.string().required('Parent Address is required'),
      parentPhone: Yup.string().required('Parent Phone is required'),
      parentDateOfBirth: Yup.string().required('Parent Date of Birth is required'),
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .max(8, 'Password must not be more than 8 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
        console.log(values);
      try {
        const response = await fetch('https://backend.foworks.com.tr/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 402) {
            setAlertMessage('SignUp Failed! A user with this email already exists.');
            alert('SignUp Failed! A user with this email already exists.');
          } else {
            setAlertMessage('SignUp Failed! Please try again.');
            alert('SignUp Failed! Please try again.');
          }
        } else {
          alert('SignUp Successful.');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error:', error.message);
        alert('SignUp Failed! An error occurred. Please try again.');
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];
      alert(errors[firstErrorField]);
      return;
    }
    formik.handleSubmit();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-6 text-center">Kayıt ol</h1>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Define your role</label>
            <div className="flex justify-between">
              <div>
                <input
                  className="mr-2"
                  type="radio"
                  id="student"
                  name="role"
                  value="student"
                  checked={formik.values.role === "student"}
                  onChange={formik.handleChange}
                />
                <label htmlFor="student">Öğrenci</label>
              </div>
              <div>
                <input
                  className="mr-2"
                  type="radio"
                  id="company"
                  name="role"
                  value="company"
                  checked={formik.values.role === "company"}
                  onChange={formik.handleChange}
                />
                <label htmlFor="company">Şirket</label>
              </div>
              <div>
                <input
                  className="mr-2"
                  type="radio"
                  id="teacher"
                  name="role"
                  value="teacher"
                  checked={formik.values.role === "teacher"}
                  onChange={formik.handleChange}
                />
                <label htmlFor="teacher">Öğretmen</label>
              </div>
            </div>
          </div>
          <div className='w-full flex justify-between '>

          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <h2 className="text-xl font-semibold mb-4">Parent Information</h2>
          </div>
          <div className='flex gap-4'>
            <div className='w-full flex flex-col '>
            <div className="mb-4">
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} />
          </div>

          <div className="mb-4">
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              name="address"
              id="address"
              placeholder="Address"
              type="text"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="mb-4">
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} />
          </div>

          <div className="mb-4">
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              id="dateOfBirth"
              name="dateOfBirth"
              placeholder="Date of Birth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} />
          </div>
            </div>
          
          <div className='w-full flex flex-col'>

          

          <div className="mb-4">
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              id="parentName"
              name="parentName"
              placeholder="Parent Name"
              value={formik.values.parentName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} />
          </div>

          <div className="mb-4">
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              name="parentAddress"
              id="parentAddress"
              placeholder="Parent Address"
              type="text"
              value={formik.values.parentAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        
          <div className="mb-4">
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              id="parentPhone"
              name="parentPhone"
              placeholder="Parent Phone"
              value={formik.values.parentPhone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} />
          </div>

          <div className="mb-4">
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              id="parentDateOfBirth"
              name="parentDateOfBirth"
              placeholder="Parent Date of Birth"
              value={formik.values.parentDateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} />
          </div>
          </div>
          </div>
          <h2 className="text-xl font-semibold mb-4">Email & Password</h2>
        
          <div className="mb-4">
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} />
          </div>

          <div className="mb-4">
            <input
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur} />
          </div>
          <div className="flex justify-center">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300" type="submit">Kaydet</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
