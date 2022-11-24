import { useState } from 'react';

import './employees-add-form.css'

const EmployeesAddForm = (props) => {
    const [inputValueName, setInputValueName] = useState({ name: '' })
    const [inputValueSalary, setInputValueSalary] = useState({ salary: '' })

    const submitValue = (e) => {
        e.preventDefault()

        const item = Object.assign(inputValueName, inputValueSalary)  

        props.onAdd(item)

        setInputValueName({ name: '' })
        setInputValueSalary({ salary: '' })
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
                    value={inputValueName.name}
                    onChange={(e) => setInputValueName({ [e.target.name]: e.target.value })} />
                <input type="number"
                    className="form-control new-post-label"
                    placeholder="З/П в $?"
                    name='salary'
                    value={inputValueSalary.salary}
                    onChange={(e) => setInputValueSalary({ [e.target.name]: e.target.value })} />

                <button type="submit"
                    className="btn btn-outline-light">Добавить</button>
            </form>
        </div>
    )
}

export default EmployeesAddForm;