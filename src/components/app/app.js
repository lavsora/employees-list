import { useState } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

const App = () => {
    const [data, setData] = useState([
        { name: 'Иван Иваныч', salary: 800, increase: false, id: 1, like: false },
        { name: 'Петр Петрович', salary: 3000, increase: true, id: 2, like: false },
        { name: 'Александр Саныч', salary: 5000, increase: false, id: 3, like: false },
    ])
    const [term, setTerm] = useState('')
    const [filter, setFilter] = useState('all')
    const [maxId, setMaxId] = useState(4)

    const deleteItem = (id) => {
        setData(data.filter(item => item.id !== id))
    }

    const addItem = (item) => {
        setData([...data, { ...item, increase: false, id: maxId, like: false }])
        setMaxId(maxId + 1)
    }

    const onToggleProp = (id, prop) => {
        setData(data.map(item => {
            if (item.id === id) {
                return { ...item, [prop]: !item[prop] }
            }
            return item;
        }))
    }

    const searchEmployees = (items, term) => {
        if (term.length === 0) {
            return items
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    const onUpdateSearch = (term) => {
        setTerm(term)
    }

    const filterPost = (items, filter) => {
        switch (filter) {
            case 'like':
                return items.filter(item => item.like)
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }
    }

    const onFilterSelect = (filter) => {
        setFilter(filter)
    }

    const visibleData = filterPost(searchEmployees(data, term), filter)

    return (
        <div className='app'>
            <AppInfo employees={data.length}
                increased={data.filter(item => item.increase).length} />

            <div className='search-panel'>
                <SearchPanel onUpdateSearch={onUpdateSearch} />
                <AppFilter filter={filter} onFilterSelect={onFilterSelect} />
            </div>

            <EmployeesList data={visibleData}
                onDelete={deleteItem}
                onToggleProp={onToggleProp} />
            <EmployeesAddForm onAdd={addItem} />
        </div>
    )
}

export default App;