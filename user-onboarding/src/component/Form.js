import React, { useState, useEffect } from 'react'
import * as yup from "yup";
import axios from "axios";

//Yup Schema
const formSchema =yup.object().shape({
    name: yup.string().required ("Name is required before submitting the form"),
    email: yup.string().email("must be a valid email address").required("must include a valid email"),
    password: yup.string().required('Password is required'),
    passwordConfirmation: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords must match'),
    terms: yup.boolean().oneOf([true], "please agree to terms of use"),
});

//Form Function
function Form() {

    //set state for form
    const [formState, setFormState] = useState({
        name: '', 
        email: '',
        password: '',
        terms: "checked"
    });
    // set state for errors
    const [errors, setErrors] = useState({
        name: '', 
        email: '',
        password: '',
        terms: ""
    });

     // new state to set our post request too. So we can console.log and see it.
  const [post, setPost] = useState([]);

  const formSubmit = e => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then(res => {
        setPost(res.data); // get just the form data from the REST api
        console.log("success", post);
        // reset form if successful
        setFormState({
            name: '', 
            email: '',
            password: '',
            terms: ""
        });
      })
      .catch(err => console.log(err.response));
  };

  const validateChange = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };

  const inputChange = e => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };

    validateChange(e);
    setFormState(newFormData);
  };

    // return the form
    return (
        <div class="user-form">
          <form onSubmit={formSubmit}>
            <label htmlFor='name'>Name:</label>
            <input
                value={formState.name}
                type='text'
                name='name'
                onChange={inputChange}
            />
            {errors.name.length > 0 ? <p className='error'>{errors.name}</p> : null}
            <br /><br />
            <label htmlFor='email'>Email:</label>
            <input 
                value={formState.email}
                type='text'
                name='email'
                onChange={inputChange}
            />
            {errors.email.length > 0 ? (<p className='error'>{errors.email}</p>) : null}
            <br /><br />
            <label htmlFor='password'>Password:</label>
            <input 
                value={formState.password}
                type='password'
                name='password'
                onChange={inputChange}
            />
            {errors.password.length > 0 ? (<p className='error'>{errors.password}</p>) : null}
            <br /><br />
            <label className="terms" htmlFor='terms'>
            <input 
                type='checkbox'
                checked={formState.terms}
                name='terms'
                nChange={inputChange}
            />
            Terms of Service:
            </label>
            <br /><br />
            <pre>{JSON.stringify(post, null, 2)}</pre>
            <button>Submit</button>
        </form>  
        </div>
    )
};

export default Form;
