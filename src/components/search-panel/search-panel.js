import { useState } from 'react';

import './search-panel.css'

const SearchPanel = (props) => {
    const [term, setTerm] = useState('')

    const onUpdateSearch = (event) => {
        setTerm(event.target.value)
        props.onUpdateSearch(event.target.value)
    }

    return (
        <input
            type="text"
            className="form-control search-input"
            placeholder="Найти сотрудника"
            value={term}
            onChange={onUpdateSearch} />
    )

}

export default SearchPanel;