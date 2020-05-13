import React from 'react'

function Team(props) {
    return (
        <div className='team-list'>
            {props.teams.map(form => (
                <div className='form' key={form.id}>
                    <h2>{form.name}</h2>
                    <p>{form.email}</p>
                    <p>{form.role}</p>
                </div>
            ))}
        </div>
    )
}

export default Team
