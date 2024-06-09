import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [role, setRole] = useState('');

  const handleRoleChange = (event) => {
    const { value } = event.target;
    setRole(value);
    formik.setFieldValue('role', value);
  };

  const getValidationSchema = (role) => {
    switch (role) {
      case 'student':
        return Yup.object({
          role: Yup.string().required('Role is required'),
          name: Yup.string().max(15, 'Must be 15 characters or less').required('Name is required'),
          surname: Yup.string().max(15, 'Must be 15 characters or less').required('Surname is required'),
          idNumber: Yup.string().required('ID Number is required'),
          gender: Yup.string().required('Gender is required'),
          dateOfBirth: Yup.date()
            .min(new Date(1989, 0, 1), 'Date of birth must be after January 1, 1989')
            .max(new Date(2008, 0, 1), 'Date of birth must be before January 1, 2008')
            .required('Date of Birth is required'),
          email: Yup.string().email('Invalid email format').required('Email is required'),
          password: Yup.string().max(8, 'Password must not be more than 8 characters').required('Password is required'),
          educationLevel: Yup.string().required('Education level is required'),
          jobSeekingStatus: Yup.string().required('Job seeking status is required'),
          resume: Yup.mixed().required('Resume is required'),
          disability: Yup.string().required('Disability status is required'),
          consent: Yup.boolean().oneOf([true], 'You must consent to data processing').required('Consent is required'),
          mailconsent: Yup.boolean().oneOf([true], 'You must consent to data processing').required('Consent is required'),
        });
      case 'teacher':
        return Yup.object({
          role: Yup.string().required('Role is required'),
          name: Yup.string().required('Name is required'),
          surname: Yup.string().required('Surname is required'),
          subject: Yup.string().required('Subject is required'),
          email: Yup.string().email('Invalid email format').required('Email is required'),
          password: Yup.string().max(8, 'Password must not be more than 8 characters').required('Password is required'),
          consent: Yup.boolean().oneOf([true], 'You must consent to data processing').required('Consent is required'),
        });
      case 'company':
        return Yup.object({
          role: Yup.string().required('Role is required'),
          name: Yup.string().required('Name is required'),
          surname: Yup.string().required('Surname is required'),
          companyName: Yup.string().required('Company name is required'),
          email: Yup.string().email('Invalid email format').required('Email is required'),
          password: Yup.string().max(8, 'Password must not be more than 8 characters').required('Password is required'),
          consent: Yup.boolean().oneOf([true], 'You must consent to data processing').required('Consent is required'),
        });
      default:
        return Yup.object({
          role: Yup.string().required('Role is required'),
        });
    }
  };

  const formik = useFormik({
    initialValues: {
      role: '',
      name: '',
      surname: '',
      idNumber: '',
      gender: '',
      dateOfBirth: '',
      email: '',
      password: '',
      educationLevel: '',
      jobSeekingStatus: '',
      resume: null,
      disability: '',
      consent: false,
      subject: '',
      companyName: '',
    },
    validationSchema: getValidationSchema(role),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        for (const key in values) {
          formData.append(key, values[key as keyof typeof values]);
        }

        const response = await fetch('https://backend.foworks.com.tr/auth/register', {
          method: 'POST',
          body: formData,
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
                  checked={role === "student"}
                  onChange={handleRoleChange}
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
                  checked={role === "company"}
                  onChange={handleRoleChange}
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
                  checked={role === "teacher"}
                  onChange={handleRoleChange}
                />
                <label htmlFor="teacher">Öğretmen</label>
              </div>
            </div>
          </div>

          {role === 'student' && (
            <>
              <h2 className="text-xl font-semibold mb-4">Student Information</h2>
              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ad"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
                {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
              </div>

              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  type="text"
                  id="surname"
                  name="surname"
                  placeholder="Soyad"
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
                {formik.touched.surname && formik.errors.surname ? <div>{formik.errors.surname}</div> : null}
              </div>

              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  placeholder="T.C. kimlik veya yabancı uyruklu kimlik numarası"
                  value={formik.values.idNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
                {formik.touched.idNumber && formik.errors.idNumber ? <div>{formik.errors.idNumber}</div> : null}
              </div>

              <div className="mb-4">
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}>
                  <option value="" label="Cinsiyet" />
                  <option value="male" label="Erkek" />
                  <option value="female" label="Kadın" />
                </select>
                {formik.touched.gender && formik.errors.gender ? <div>{formik.errors.gender}</div> : null}
              </div>

              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? <div>{formik.errors.dateOfBirth}</div> : null}
              </div>

              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
                {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
              </div>

              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Şifre"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
                {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
              </div>

              <div className="mb-4">
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  id="educationLevel"
                  name="educationLevel"
                  value={formik.values.educationLevel}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}>
                  <option value="" label="Öğrenim durumu" />
                  <option value="highSchool" label="Lise mezunu" />
                  <option value="associate" label="Ön Lisans" />
                  <option value="bachelor" label="Bachelor's Degree" />
                  <option value="master" label="Master's Degree" />
                  <option value="phd" label="PhD" />
                </select>
                {formik.touched.educationLevel && formik.errors.educationLevel ? <div>{formik.errors.educationLevel}</div> : null}
              </div>

              <div className="mb-4">
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  id="jobSeekingStatus"
                  name="jobSeekingStatus"
                  value={formik.values.jobSeekingStatus}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}>
                  <option value="" label="Aktif iş arayışınız mevcut mu?" />
                  <option value="yes" label="Evet, iş arıyorum." />
                  <option value="no" label="Hayır" />
                </select>
                {formik.touched.jobSeekingStatus && formik.errors.jobSeekingStatus ? <div>{formik.errors.jobSeekingStatus}</div> : null}
              </div>

              <div className="mb-4">
                <label htmlFor="resume" className="block text-gray-700 font-semibold mb-2">Upload Resume</label>
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={(event) => {
                    formik.setFieldValue("resume", event.currentTarget.files[0]);
                  }}
                />
                {formik.touched.resume && formik.errors.resume ? <div>{formik.errors.resume}</div> : null}
              </div>

              <div className="mb-4">
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  id="disability"
                  name="disability"
                  value={formik.values.disability}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}>
                  <option value="" label="Do you have a disability?" />
                  <option value="yes" label="Yes" />
                  <option value="no" label="No" />
                </select>
                {formik.touched.disability && formik.errors.disability ? <div>{formik.errors.disability}</div> : null}
              </div>

              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    className="mr-2"
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formik.values.consent}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                  <span>Verilerimin işlenmesini onaylıyorum</span>
                </label>
                {formik.touched.consent && formik.errors.consent ? <div>{formik.errors.consent}</div> : null}
              </div>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    className="mr-2"
                    type="checkbox"
                    id="mailconsent"
                    name="mailconsent"
                    checked={formik.values.consent}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                  <span>- Mail ile bilgilendirilmek istiyorum. </span>
                </label>
                {formik.touched.consent && formik.errors.consent ? <div>{formik.errors.consent}</div> : null}
              </div>
            </>
          )}

          {role === 'teacher' && (
            <>
              <h2 className="text-xl font-semibold mb-4">Teacher Information</h2>
              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ad"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
                {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
              </div>

              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  type="text"
                  id="surname"
                  name="surname"
                  placeholder="Soyad"
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
                {formik.touched.surname && formik.errors.surname ? <div>{formik.errors.surname}</div> : null}
              </div>

              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Branş/Alan"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
                {formik.touched.subject && formik.errors.subject ? <div>{formik.errors.subject}</div> : null}
              </div>

              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
                {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
              </div>

              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Şifre"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
                {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
              </div>

              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    className="mr-2"
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formik.values.consent}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                  <span>Verilerimin işlenmesini onaylıyorum</span>
                </label>
                {formik.touched.consent && formik.errors.consent ? <div>{formik.errors.consent}</div> : null}
              </div>
            </>
          )}

          {role === 'company' && (
            <>
              <h2 className="text-xl font-semibold mb-4">Company Information</h2>
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
                {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
              </div>

              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  type="text"
                  id="industry"
                  name="industry"
                  placeholder="Firma adı"
                  value={formik.values.industry}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
                {formik.touched.industry && formik.errors.industry ? <div>{formik.errors.industry}</div> : null}
              </div>

              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
                {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
              </div>

              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Şifre"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
                {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
              </div>

              <div className="mb-4">
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  id="companySize"
                  name="companySize"
                  value={formik.values.companySize}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}>
                  <option value="" label="İş ilanı kategorisi" />
                  <option value="1-10" label="1-10 employees" />
                  <option value="11-50" label="11-50 employees" />
                  <option value="51-200" label="51-200 employees" />
                  <option value="201-500" label="201-500 employees" />
                  <option value="501-1000" label="501-1000 employees" />
                  <option value="1001+" label="1001+ employees" />
                </select>
                {formik.touched.companySize && formik.errors.companySize ? <div>{formik.errors.companySize}</div> : null}
              </div>

              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    className="mr-2"
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formik.values.consent}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} />
                  <span>Verilerimin işlenmesini onaylıyorum</span>
                </label>
                {formik.touched.consent && formik.errors.consent ? <div>{formik.errors.consent}</div> : null}
              </div>
            </>
          )}

          <div className="text-center">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// const Signup = () => {
//   const navigate = useNavigate();
//   const [alertMessage, setAlertMessage] = useState('');

//   const formik = useFormik({
//     initialValues: {
//       role: '',
//       name: '',
//       address: '',
//       phone: '',
//       dateOfBirth: '',
//       parentName: '',
//       parentAddress: '',
//       parentPhone: '',
//       parentDateOfBirth: '',
//       email: '',
//       password: '',
//     },
//     validationSchema: Yup.object({
//       role: Yup.string().required('Role is required'),
//       name: Yup.string().required('Name is required'),
//       address: Yup.string().required('Address is required'),
//       phone: Yup.string().required('Phone is required'),
//       dateOfBirth: Yup.string().required('Date of Birth is required'),
//       parentName: Yup.string().required('Parent Name is required'),
//       parentAddress: Yup.string().required('Parent Address is required'),
//       parentPhone: Yup.string().required('Parent Phone is required'),
//       parentDateOfBirth: Yup.string().required('Parent Date of Birth is required'),
//       email: Yup.string()
//         .email('Invalid email format')
//         .required('Email is required'),
//       password: Yup.string()
//         .max(8, 'Password must not be more than 8 characters')
//         .required('Password is required'),
//     }),
//     onSubmit: async (values) => {
//         console.log(values);
//       try {
//         const response = await fetch('https://backend.foworks.com.tr/auth/register', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(values),
//           credentials: 'include',
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           if (response.status === 402) {
//             setAlertMessage('SignUp Failed! A user with this email already exists.');
//             alert('SignUp Failed! A user with this email already exists.');
//           } else {
//             setAlertMessage('SignUp Failed! Please try again.');
//             alert('SignUp Failed! Please try again.');
//           }
//         } else {
//           alert('SignUp Successful.');
//           navigate('/login');
//         }
//       } catch (error) {
//         console.error('Error:', error.message);
//         alert('SignUp Failed! An error occurred. Please try again.');
//       }
//     },
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errors = await formik.validateForm();
//     if (Object.keys(errors).length > 0) {
//       const firstErrorField = Object.keys(errors)[0];
//       alert(errors[firstErrorField]);
//       return;
//     }
//     formik.handleSubmit();
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
//         <form onSubmit={handleSubmit}>
//           <h1 className="text-2xl font-bold mb-6 text-center">Kayıt ol</h1>

//           <div className="mb-4">
//             <label className="block text-gray-700 font-semibold mb-2">Define your role</label>
//             <div className="flex justify-between">
//               <div>
//                 <input
//                   className="mr-2"
//                   type="radio"
//                   id="student"
//                   name="role"
//                   value="student"
//                   checked={formik.values.role === "student"}
//                   onChange={formik.handleChange}
//                 />
//                 <label htmlFor="student">Öğrenci</label>
//               </div>
//               <div>
//                 <input
//                   className="mr-2"
//                   type="radio"
//                   id="company"
//                   name="role"
//                   value="company"
//                   checked={formik.values.role === "company"}
//                   onChange={formik.handleChange}
//                 />
//                 <label htmlFor="company">Şirket</label>
//               </div>
//               <div>
//                 <input
//                   className="mr-2"
//                   type="radio"
//                   id="teacher"
//                   name="role"
//                   value="teacher"
//                   checked={formik.values.role === "teacher"}
//                   onChange={formik.handleChange}
//                 />
//                 <label htmlFor="teacher">Öğretmen</label>
//               </div>
//             </div>
//           </div>
//           <div className='w-full flex justify-between '>

//           <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
//           <h2 className="text-xl font-semibold mb-4">Parent Information</h2>
//           </div>
//           <div className='flex gap-4'>
//             <div className='w-full flex flex-col '>
//             <div className="mb-4">
//             <input
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//               type="text"
//               id="name"
//               name="name"
//               placeholder="Name"
//               value={formik.values.name}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur} />
//           </div>

//           <div className="mb-4">
//             <input
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//               name="address"
//               id="address"
//               placeholder="Address"
//               type="text"
//               value={formik.values.address}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//           </div>

//           <div className="mb-4">
//             <input
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//               type="text"
//               id="phone"
//               name="phone"
//               placeholder="Phone"
//               value={formik.values.phone}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur} />
//           </div>

//           <div className="mb-4">
//             <input
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//               type="text"
//               id="dateOfBirth"
//               name="dateOfBirth"
//               placeholder="Date of Birth"
//               value={formik.values.dateOfBirth}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur} />
//           </div>
//             </div>
          
//           <div className='w-full flex flex-col'>

          

//           <div className="mb-4">
//             <input
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//               type="text"
//               id="parentName"
//               name="parentName"
//               placeholder="Parent Name"
//               value={formik.values.parentName}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur} />
//           </div>

//           <div className="mb-4">
//             <input
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//               name="parentAddress"
//               id="parentAddress"
//               placeholder="Parent Address"
//               type="text"
//               value={formik.values.parentAddress}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//           </div>
        
//           <div className="mb-4">
//             <input
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//               type="text"
//               id="parentPhone"
//               name="parentPhone"
//               placeholder="Parent Phone"
//               value={formik.values.parentPhone}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur} />
//           </div>

//           <div className="mb-4">
//             <input
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//               type="text"
//               id="parentDateOfBirth"
//               name="parentDateOfBirth"
//               placeholder="Parent Date of Birth"
//               value={formik.values.parentDateOfBirth}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur} />
//           </div>
//           </div>
//           </div>
//           <h2 className="text-xl font-semibold mb-4">Email & Password</h2>
        
//           <div className="mb-4">
//             <input
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//               type="text"
//               id="email"
//               name="email"
//               placeholder="Email"
//               value={formik.values.email}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur} />
//           </div>

//           <div className="mb-4">
//             <input
//               className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Password"
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur} />
//           </div>
//           <div className="flex justify-center">
//             <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300" type="submit">Kaydet</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;
