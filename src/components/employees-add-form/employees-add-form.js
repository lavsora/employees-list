import { useState } from 'react';

import './employees-add-form.css'

const EmployeesAddForm = (props) => {
    const [inputValue, setInputValue] = useState({
        name: '',
        salary: ''
    })

    const onValueChange = (e) => {
        if(e.currentTarget.name === 'name') {
            setInputValue({
                name: e.target.value,
                salary: inputValue.salary
            })
        }

        if(e.currentTarget.name === 'salary') {
            setInputValue({
                name: inputValue.name,
                salary: e.target.value
            })
        }
        
    }

    const submitValue = (e) => {
        e.preventDefault()

        props.onAdd(inputValue)

        setInputValue({
            name: '',
            salary: ''
        })
    }

    return (
        <div className="app-add-form">
            <h3>Добавьте нового сотрудника</h3>
            <form className="add-form d-flex"
                onSubmit={submitValue}>
                <input type="text"
                    className="form-control new-post-label"
                    placeholder="Как его зовут?"
                    name='name'
                    value={inputValue.name}
                    onChange={onValueChange} />
                <input type="number"
                    className="form-control new-post-label"
                    placeholder="З/П в $?"
                    name='salary'
                    value={inputValue.salary}
                    onChange={onValueChange} />

                <button type="submit"
                    className="btn btn-outline-light">Добавить</button>
            </form>
        </div>
    )
}

export default EmployeesAddForm;