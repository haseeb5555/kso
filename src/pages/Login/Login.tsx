import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import "./Login.css"

const Login = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .max(8, 'Password must not be more than 8 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:3001/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
          credentials: 'include',
        });
        if (!response.ok) {
          const errorData = await response.json();
          alert("Invalid email and password");
        } else {
          const userData = await response.json();
          alert('Login successful');

          if (userData.role === 'company') {
            navigate('/CompanyProfile');
          } else if (userData.role === 'student') {
            navigate('/StudentProfile');
          } else if (userData.role === 'teacher') {
            navigate('/TeacherProfile');
          } else {
            navigate('/');
          }
        }
      } catch (error:any) {
        console.error('Error:', error.message);
        alert('An error occurred. Please try again.');
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors:any = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      alert(errors[Object.keys(errors)[0]]);
      return;
    }
    formik.handleSubmit(e);
  };

  return (
    <div className="l_login">
      <div className="l_login-child" />
      {/* <label className="l_logo">Logo</label> */}
      <img className="l_logo w-20 -ml-4" src="/image18.png"></img>
      <form className="l_login-parent" onSubmit={handleSubmit}>
        <label className="l_login1">Giriş</label>
        <div className="l_frame-child" />
        <div className="l_frame-item" />
        <div className="l_frame-inner" />
        <div className="l_rectangle-wrapper3">
          <input
            className="l_group-child9"
            name="email"
            id="email"
            placeholder="Email"
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="l_rectangle-wrapper4">
          <input
            className="l_group-child9"
            name="password"
            id="password"
            placeholder="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="l_rectangle-wrapper5">
          <button className="l_group-child11" type="button" onClick={handleSignupClick}>Kayıt ol</button>
        </div>
        <div className="l_rectangle-wrapper6">
          <button className="l_group-child11" type="submit">Giriş</button>
        </div>
      </form>
    </div>
  );
};

export default Login;