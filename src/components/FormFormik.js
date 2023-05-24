import React, { useState } from 'react';
import { useFormik, FieldArray, FormikProvider, Field } from 'formik';
import * as Yup from 'yup';
const FormFormik = () => {
  const REQUIRED_FIELD = 'This field is required';
  const WRONG_EMAIL = 'Please enter valid email address';
  const countryArr = ['USA', 'Canada', 'India'];
  const hobbies = ['Painting', 'Reading Books', 'Swiming'];
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      zip: '',
      age: '0',
      gender: '',
      hobby: [],
      dob: '',
      description: '',
      agree: false,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('This field is required'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('This field is required'),
      email: Yup.string().email(WRONG_EMAIL).required('This field is required'),
      country: Yup.string().required('This field is required'),
      zip: Yup.string()
        .min(6, 'Please enter 6 digit valid zip number')
        .max(6, 'Please enter 6 digit valid zip number')
        .required('This field is required'),
      age: Yup.number().min(18, 'Age must be  above 18'),
      gender: Yup.string().required('This field is required'),
      hobby: Yup.array().min(1, 'Select at least 1 hobby'),
      dob: Yup.date().required('This field is required'),
      description: Yup.string().required('This field is required'),
      agree: Yup.boolean().oneOf(
        [true],
        'The terms and conditions must be accepted'
      ),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const countryOption = countryArr.map((country, key) => (
    <option value={country} key={key}>
      {country}
    </option>
  ));
  const hobbyOption = hobbies.map((val, index) => (
    <div key={index} className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        name="hobby"
        value={val}
      />
      <label className="form-check-label">{val}</label>
    </div>
  ));
  return (
    <>
      <div className="container">
        <FormikProvider value={formik}>
          <form className="row g-3" onSubmit={formik.handleSubmit}>
            <div className="col-md-4">
              <label htmlFor="firstName" className="form-label">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                id="firstName"
                {...formik.getFieldProps('firstName')}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="text-danger">{formik.errors.firstName}</div>
              ) : null}
            </div>
            <div className="col-md-4">
              <label htmlFor="lastName" className="form-label">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                name="lastName"
                id="lastName"
                {...formik.getFieldProps('lastName')}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="text-danger">{formik.errors.lastName}</div>
              ) : null}
            </div>
            <div className="col-md-4">
              <label htmlFor="email" className="form-label">
                email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="lastName"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="col-md-4">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <select
                className="form-select"
                name="country"
                id="country"
                {...formik.getFieldProps('country')}
              >
                <option value={''}>Select Country</option>
                {countryOption}
              </select>
              {formik.touched.country && formik.errors.country ? (
                <div className="text-danger">{formik.errors.country}</div>
              ) : null}
            </div>
            <div className="col-md-4">
              <label htmlFor="zip" className="form-label">
                Zip
              </label>
              <input
                {...formik.getFieldProps('zip')}
                type="number"
                className="form-control"
                id="zip"
                name="zip"
              />
              {formik.touched.zip && formik.errors.zip ? (
                <div className="text-danger">{formik.errors.zip}</div>
              ) : null}
            </div>
            <div className="col-md-4">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="range"
                {...formik.getFieldProps('age')}
                className="form-range"
                name="age"
                id="age"
              />
              {formik.values.age}
              {formik.touched.age && formik.errors.age ? (
                <div className="text-danger">{formik.errors.age}</div>
              ) : null}
            </div>
            <div className="col-md-4">
              <label className="form-label">Gender</label>
              <div className="form-check">
                <Field
                  type="radio"
                  className="form-check-input"
                  name="gender"
                  value="male"
                />
                <label className="form-check-label">Male</label>
              </div>
              <div className="form-check">
                <Field
                  type="radio"
                  className="form-check-input"
                  name="gender"
                  value="female"
                />
                <label className="form-check-label">Female </label>
              </div>
              {formik.touched.gender && formik.errors.gender ? (
                <div className="text-danger">{formik.errors.gender}</div>
              ) : null}
            </div>
            <div className="col-md-4">
              <label className="form-label">Select Hobbies</label>
              <FieldArray
                name="hobby"
                render={(arrayHelpers) =>
                  hobbies.map((val, index) => {
                    return (
                      <div key={index} className="form-check">
                        <Field type="checkbox" name="hobby" value={val} />
                        {''} {''}
                        <label className="form-check-label">{val}</label>
                      </div>
                    );
                  })
                }
              />
              {formik.touched.hobby && formik.errors.hobby ? (
                <div className="text-danger">{formik.errors.hobby}</div>
              ) : null}
            </div>
            <div className="col-md-4">
              <label htmlFor="dob" className="form-label">
                DOB
              </label>
              <input
                type="date"
                className="form-control"
                id="dob"
                name="dob"
                {...formik.getFieldProps('dob')}
              />
              {formik.touched.dob && formik.errors.dob ? (
                <div className="text-danger">{formik.errors.dob}</div>
              ) : null}
            </div>
            <div className="col-md-4">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                name="description"
                {...formik.getFieldProps('description')}
              ></textarea>
              {formik.touched.description && formik.errors.description ? (
                <div className="text-danger">{formik.errors.description}</div>
              ) : null}
            </div>
            <div className="col-12">
              <div className="form-check">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="agree"
                    name="agree"
                    {...formik.getFieldProps('agree')}
                  />
                  <label className="form-check-label" htmlFor="agree">
                    {' '}
                    Agree to terms and conditions
                  </label>
                </div>
                {formik.touched.agree && formik.errors.agree ? (
                  <div className="text-danger">{formik.errors.agree}</div>
                ) : null}
              </div>
            </div>
            <div className="col-12">
              <button className="btn btn-primary" type="submit">
                Submit form
              </button>
            </div>
          </form>
        </FormikProvider>
      </div>
    </>
  );
};
export default FormFormik;
