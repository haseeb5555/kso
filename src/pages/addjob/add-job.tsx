import CompNav from "@/components/compNav";
import Footer from "@/components/footer";
import axios from "axios";
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import "./AddJob.css";

const AddJob = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            title: '',
            category: '',
            description: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required('Required')
                .max(10, 'Title must be 10 characters or less'),
            category: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            console.log('values:', values);
            try {
                const response = await axios.post('http://localhost:3001/job/add', values, {
                    withCredentials: true,
                });

                alert('Job added successfully.');
            } catch (error) {
                console.error('Error:', error.response ? error.response.data : error.message);
                alert('An error occurred. Please try again.');
            }
        },
    });

    useEffect(() => {
        if (formik.touched.title && formik.errors.title) {
            alert(formik.errors.title);
        }
    }, [formik.touched.title, formik.errors.title]);

    return (
        <>
            <CompNav />
            <img className="w-full mt-5" alt="header banner" src="/header-copy-2@2x.png" />
        <div className="min-h-screen  flex flex-col items-center">
            <form
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl flex flex-col "
                onSubmit={formik.handleSubmit}
            >
                <h1 className="text-2xl font-bold mb-4 text-center">İş İlanı Aç</h1>

                <div className="mb-4">
                    <label className="block text-gray-700">İş Ünvanı</label>
                    <input
                        className="mt-1 p-2 border rounded w-full"
                        type="text"
                        name="title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        placeholder="Job Title"
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div className="text-red-500 text-sm">{formik.errors.title}</div>
                    ) : null}
                </div>

                <div className="mb-4">
                    {/* <label className="block text-gray-700">Job Category</label>
                    <div className="flex flex-wrap gap-2">
                        {['Python', 'Database', 'Artificial Intelligence', 'Graphic Design'].map((category) => (
                            <label key={category} className="flex items-center">
                                <input
                                    className="mr-2 "
                                    type="radio"
                                    name="category"
                                    value={category}
                                    onChange={formik.handleChange}
                                    checked={formik.values.category === category}
                                />
                                {category}
                            </label>
                        ))}
                    </div> */}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">İş Tanımı</label>
                    <textarea
                        className="mt-1 p-2 border rounded w-full"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        placeholder="Job Description"
                    />
                </div>

                <button
                    className=" bg-[#D9D9D9] p-2 rounded mt-4 w-[100px] text-black align-middle "
                    type="submit"
                >
                    Gönder
                </button>
            </form>
        </div>
         <img className="w-full mt-5" alt="footer banner" src="/footerbanner2-copy-1@2x.png" />
           
         <Footer />
     </>
    );
};

export default AddJob;
