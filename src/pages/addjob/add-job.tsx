import CompNav from "@/components/compNav";
import axios from "axios";
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import "./AddJob.css";
import Footer from "@/components/footer";


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
            try {
              
                const response = await axios.post('https://backend.foworks.com.tr/job/add', values, {
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
        <div className="addjob">
            <CompNav/>
            <form className="add-job-parent" onSubmit={formik.handleSubmit}>
                <h1 className="add-job">Add Job</h1>
                <div className="rectangle-parent12">
                    <input
                        className="rectangle-input"
                        type="radio"
                        name="category"
                        id="option1"
                        value="Python"
                        onChange={formik.handleChange}
                        checked={formik.values.category === 'Python'}
                    />
                    <label htmlFor="option1" className="python2">Python</label>
                </div>
                <div className="rectangle-parent13">
                    <input
                        className="rectangle-input"
                        type="radio"
                        name="category"
                        id="option2"
                        value="Database"
                        onChange={formik.handleChange}
                        checked={formik.values.category === 'Database'}
                    />
                    <label htmlFor="option2" className="python2">Database</label>
                </div>
                <div className="rectangle-parent14">
                    <input
                        className="rectangle-input"
                        type="radio"
                        name="category"
                        id="option3"
                        value="Artificial Intelligence"
                        onChange={formik.handleChange}
                        checked={formik.values.category === 'Artificial Intelligence'}
                    />
                    <label htmlFor="option3" className="artificial-intelligence2">Artificial Intelligence</label>
                </div>
                <div className="rectangle-parent17">
                    <input
                        className="rectangle-input"
                        type="radio"
                        name="category"
                        id="option4"
                        value="Graphic Design"
                        onChange={formik.handleChange}
                        checked={formik.values.category === 'Graphic Design'}
                    />
                    <label htmlFor="option4" className="graphic-design4">Graphic Design</label>
                </div>
                <div className="rectangle-wrapper18">
                    <input
                        className="group-child66"
                        type="text"
                        name="title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        placeholder="Job Title"
                    />
                      {formik.touched.title && formik.errors.title ? (
                        <div className="error">{formik.errors.title}</div>
                    ) : null}
                </div>
                <div className="rectangle-wrapper19">
                    <input
                        className="group-child67"
                        type="text"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        placeholder="Job Description"
                    />
                </div>
                <div className="job-title9">Job Title</div>
                <label className="job-description">Job Description</label>
                <label className="job-cotegory">Job Category</label>
                <div className="rectangle-parent19">
                    <button className="group-child74" type="submit">Submit</button>
                </div>
            </form>
               
            <img
                className="footerbanner2-copy-13"
                alt=""
                src="/footerbanner2-copy-1@2x.png"
            />
            <img className="header-copy-23" alt="" src="/header-copy-2@2x.png" />
        </div>
        <Footer/>
        </>
    );
};

export default AddJob;
