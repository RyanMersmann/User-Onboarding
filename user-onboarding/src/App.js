import React, { useState } from 'react';
import './App.css';
import Form from './component/Form'
import Team from './component/Team'

function App() {

  const [teams, setTeams] = useState([{
    name: '',
    email: '',
    role: ''
  }
]);

const addNewForm = form => {
  const newForm = {
    id: Date.now(),
    name: form.name,
    email: form.email,
    role: form.role
  };
  setTeams([...teams, newForm]);
};

  return (
    <div className="App">
      <h1>User Onboarding</h1>
      <Form addNewForm={addNewForm} />
      <Team teams={teams} /> 
    </div>
  );
}

export default App;
