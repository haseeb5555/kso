import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [role, setRole] = useState("");

  const handleRoleChange = (event) => {
    const { value } = event.target;
    setRole(value);
    formik.setFieldValue("role", value);
    formik.setErrors({}); // Clear form errors when role changes
  };

  const getValidationSchema = (role) => {
    switch (role) {
      case "student":
        return Yup.object({
          role: Yup.string().required("Rolünüzü seçin"),
          name: Yup.string()
            .max(15, "En fazla 15 karakter olmalı")
            .required("Bu alan zorunludur"),
          surname: Yup.string()
            .max(15, "En fazla 15 karakter olmalı")
            .required("Bu alan zorunludur"),
          idNumber: Yup.string().required("Bu alan zorunludur"),
          gender: Yup.string().required("Bu alan zorunludur"),
          dateOfBirth: Yup.date()
            .min(
              new Date(1989, 0, 1),
              "Doğum tarihi 1 Ocak 1989'dan sonra olmalı"
            )
            .max(
              new Date(2008, 0, 1),
              "Doğum tarihi 1 Ocak 2008'den önce olmalı"
            )
            .required("Bu alan zorunludur"),
          email: Yup.string()
            .email("Geçersiz email formatı")
            .required("Bu alan zorunludur"),
          password: Yup.string()
            .max(8, "Şifre en fazla 8 karakter olmalı")
            .required("Bu alan zorunludur"),
          educationLevel: Yup.string().required("Bu alan zorunludur"),
          jobSeekingStatus: Yup.string().required("Bu alan zorunludur"),
          resume: Yup.mixed().required("Bu alan zorunludur"),
          disability: Yup.string().required("Bu alan zorunludur"),
          consent: Yup.boolean()
            .oneOf([true], "Bu alan zorunludur")
            .required("Bu alan zorunludur"),
        });
      case "teacher":
        return Yup.object({
          role: Yup.string().required("Rolünüzü seçin"),
          name: Yup.string().required("Bu alan zorunludur"),
          surname: Yup.string().required("Bu alan zorunludur"),
          subject: Yup.string().required("Bu alan zorunludur"),
          email: Yup.string()
            .email("Geçersiz email formatı")
            .required("Bu alan zorunludur"),
          password: Yup.string()
            .max(8, "Şifre en fazla 8 karakter olmalı")
            .required("Bu alan zorunludur"),
          consent: Yup.boolean()
            .oneOf([true], "Bu alan zorunludur")
            .required("Bu alan zorunludur"),
        });
      case "company":
        return Yup.object({
          role: Yup.string().required("Rolünüzü seçin"),
          name: Yup.string().required("Bu alan zorunludur"),
          surname: Yup.string().required("Bu alan zorunludur"),
          companyName: Yup.string().required("Bu alan zorunludur"),
          email: Yup.string()
            .email("Geçersiz email formatı")
            .required("Bu alan zorunludur"),
          password: Yup.string()
            .max(8, "Şifre en fazla 8 karakter olmalı")
            .required("Bu alan zorunludur"),
          consent: Yup.boolean()
            .oneOf([true], "Bu alan zorunludur")
            .required("Bu alan zorunludur"),
        });
      default:
        return Yup.object({
          role: Yup.string().required("Rolünüzü seçin"),
        });
    }
  };

  const formik = useFormik({
    initialValues: {
      role: "",
      name: "",
      surname: "",
      idNumber: "",
      gender: "",
      dateOfBirth: "",
      email: "",
      password: "",
      educationLevel: "",
      jobSeekingStatus: "",
      resume: null, // Initialize resume as null for file input
      disability: "",
      consent: false,
      subject: "",
      companyName: "",
    },
    validationSchema: getValidationSchema(role),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (key === "resume") {
            formData.append(key, values[key]); // Append file directly
          } else {
            formData.append(key, values[key]);
          }
        });

        const response = await fetch(" https://backend.foworks.com.tr/auth/register", {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (response.status === 402) {
            setAlertMessage(
              "SignUp Failed! A user with this email already exists."
            );
            alert("SignUp Failed! A user with this email already exists.");
          } else {
            setAlertMessage("SignUp Failed! Please try again.");
            alert("SignUp Failed! Please try again.");
          }
        } else {
          alert("SignUp Successful.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error:", error.message);
        alert("SignUp Failed! An error occurred. Please try again.");
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
            <label className="block text-gray-700 font-semibold mb-2">
              Rolünüzü seçin
            </label>
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

          {role === "student" && (
            <>
              <h2 className="text-xl font-semibold mb-4">Öğrenci Bilgisi</h2>
              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ad"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
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
                  onBlur={formik.handleBlur}
                />
                {formik.touched.surname && formik.errors.surname ? (
                  <div>{formik.errors.surname}</div>
                ) : null}
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
                  onBlur={formik.handleBlur}
                />
                {formik.touched.idNumber && formik.errors.idNumber ? (
                  <div>{formik.errors.idNumber}</div>
                ) : null}
              </div>

              <div className="mb-4">
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" label="Cinsiyet" />
                  <option value="male" label="Erkek" />
                  <option value="female" label="Kadın" />
                </select>
                {formik.touched.gender && formik.errors.gender ? (
                  <div>{formik.errors.gender}</div>
                ) : null}
              </div>

              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  placeholder="Doğum Tarihi"
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                  <div>{formik.errors.dateOfBirth}</div>
                ) : null}
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
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
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
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </div>

              <div className="mb-4">
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  id="educationLevel"
                  name="educationLevel"
                  value={formik.values.educationLevel}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" label="Öğrenim durumu" />
                  <option
                    value="primarySchoolGraduate"
                    label="İlkokul mezunu"
                  />
                  <option
                    value="middleSchoolGraduate"
                    label="Ortaokul mezunu"
                  />
                  <option
                    value="vocationalSchoolStudent"
                    label="Meslek lisesi öğrencisi"
                  />
                  <option value="highSchoolGraduate" label="Lise mezunu" />
                  <option value="associate" label="Ön Lisans" />
                  <option
                    value="universityStudent"
                    label="Üniversite öğrencisi"
                  />
                  <option
                    value="universityGraduate"
                    label="Üniversite mezunu"
                  />
                </select>
                {formik.touched.educationLevel &&
                formik.errors.educationLevel ? (
                  <div>{formik.errors.educationLevel}</div>
                ) : null}
              </div>

              <div className="mb-4">
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  id="jobSeekingStatus"
                  name="jobSeekingStatus"
                  value={formik.values.jobSeekingStatus}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" label="Aktif iş arayışınız mevcut mu?" />
                  <option value="yes" label="Evet, iş arıyorum." />
                  <option
                    value="yes"
                    label="Evet, staj arıyorum."
                  />
                  <option value="no" label="Hayır" />
                </select>
                {formik.touched.jobSeekingStatus &&
                formik.errors.jobSeekingStatus ? (
                  <div>{formik.errors.jobSeekingStatus}</div>
                ) : null}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="resume"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  CV yükle
                </label>
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={(event) => {
                    formik.setFieldValue(
                      "resume",
                      event.currentTarget.files[0]
                    );
                  }}
                />
                {formik.touched.resume && formik.errors.resume ? (
                  <div>{formik.errors.resume}</div>
                ) : null}
              </div>

              <div className="mb-4">
                <select
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  id="disability"
                  name="disability"
                  value={formik.values.disability}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" label="Bir engel durumunuz var mı?" />
                  <option value="yes" label="Evet" />
                  <option value="no" label="Hayır" />
                </select>
                {formik.touched.disability && formik.errors.disability ? (
                  <div>{formik.errors.disability}</div>
                ) : null}
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
                    onBlur={formik.handleBlur}
                  />
                  <span>Verilerimin işlenmesini onaylıyorum</span>
                </label>
                {formik.touched.consent && formik.errors.consent ? (
                  <div>{formik.errors.consent}</div>
                ) : null}
              </div>
              {/* <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    className="mr-2"
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formik.values.consent}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span>Mail ile bilgilendirilmek istiyorum. </span>
                </label>
                {formik.touched.consent && formik.errors.consent ? (
                  <div>{formik.errors.consent}</div>
                ) : null}
              </div> */}
            </>
          )}

          {role === "teacher" && (
            <>
              <h2 className="text-xl font-semibold mb-4">
              Öğretmen Bilgisi
              </h2>
              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ad"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
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
                  onBlur={formik.handleBlur}
                />
                {formik.touched.surname && formik.errors.surname ? (
                  <div>{formik.errors.surname}</div>
                ) : null}
              </div>

              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Konu"
                  value={formik.values.subject}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.subject && formik.errors.subject ? (
                  <div>{formik.errors.subject}</div>
                ) : null}
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
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
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
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
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
                    onBlur={formik.handleBlur}
                  />
                  <span>Verilerimin işlenmesini onaylıyorum</span>
                </label>
                {formik.touched.consent && formik.errors.consent ? (
                  <div>{formik.errors.consent}</div>
                ) : null}
              </div>
            </>
          )}

          {role === "company" && (
            <>
              <h2 className="text-xl font-semibold mb-4">
              Şirket Bilgisi
              </h2>
              <div className="mb-4">
                <input
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ad"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div>{formik.errors.name}</div>
                ) : null}
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
                  id="companyName"
                  name="companyName"
                  placeholder="Şirket İsmi"
                  value={formik.values.companyName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur} />
                {formik.touched.companyName && formik.errors.companyName ? <div>{formik.errors.companyName}</div> : null}
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
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
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
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </div>

              {/* <div className="mb-4">
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
              </div> */}

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

