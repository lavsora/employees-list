import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: 'Иван Иваныч', salary: 800, increase: false, id: 1, like: false },
                { name: 'Петр Петрович', salary: 3000, increase: true, id: 2, like: false },
                { name: 'Александр Саныч', salary: 5000, increase: false, id: 3, like: false },
            ],
            term: '',
            filter: 'all',
            maxId: 4
        }
    }

    deleteItem = (id) => {
        this.setState(({ data }) => ({
            data: data.filter(item => item.id !== id)
        }))
    }

    addItem = (item) => {
        const { data, maxId } = this.state

        this.setState({
            data: [...data, { ...item, increase: false, id: maxId, like: false }],
            maxId: maxId + 1
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmployees = (items, term) => {
        if(term.length === 0) {
            return items
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    filterPost = (items, filter) => {
        switch (filter) {
            case 'like': 
                return items.filter(item => item.like)
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    render() {
        const { data, term, filter } = this.state
        const visibleData = this.filterPost(this.searchEmployees(data, term), filter)

        return (
            <div className='app'>
                <AppInfo employees={data.length}
                increased={data.filter(item => item.increase).length}/>

                <div className='search-panel'>
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={this.state.filter} onFilterSelect={this.onFilterSelect}/>
                </div>

                <EmployeesList data={visibleData} 
                onDelete={this.deleteItem} 
                onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm onAdd={this.addItem} />
            </div>
        )
    }
}

export default App;