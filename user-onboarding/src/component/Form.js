import React, { useState } from 'react'
import './Form.css';

function Form(props) {

    const [team, setTeam] = useState({
        name: '', 
        email: '',
         role:''
    });

    const changeHandler = e => {
        setTeam({...team, 
            [e.target.name]: e.target.value});
    };

    const submitForm = e => {
        e.preventDefault();
        props.addNewForm(team);
        setTeam({name: '', email: '', role:''});
    };

    return (
        <div class="user-form">
          <form onSubmit={submitForm}>
            <label htmlFor='name'>Name:</label>
            <input
                id='name'
                type='text'
                name='name'
                onChange={changeHandler}
                value={team.name}
            />
            <br /><br />
            <label htmlFor='email'>Email:</label>
            <input 
                id='email'
                type='text'
                name='email'
                onChange={changeHandler}
                value={team.email}
            />
            <br /><br />
            <label htmlFor='password'>Password:</label>
            <input 
                id='password'
                type='password'
                name='password'
                onChange={changeHandler}
                value={team.role}
            />
            <br /><br />
            <label class="tos" htmlFor='tos'>Terms of Service:</label>
            <input 
                id='tos'
                type='checkbox'
                name='role'
                // onChange={changeHandler}
                // value={team.role}
            />
            <br /><br />
            <button type='submit'>Add Team Member</button>
        </form>  
        </div>
    )
};

export default Form
