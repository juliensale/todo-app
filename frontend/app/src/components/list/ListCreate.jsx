import React, { useState } from 'react'
import * as listActions from '../../store/actions/listActions';
import { connect } from 'react-redux'

const ListCreate = ({ onCreate }) => {

    const [state, setState] = useState({
        title: '',
        color: ''
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onCreate(
            state.title,
            state.color
        )
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={state.title} onChange={handleChange} placeholder="Titre" />
                <input type="text" name="color" value={state.color} onChange={handleChange} placeholder="Couleur" />
                <button>Créer une liste</button>
            </form>
        </div>
    )

}


const mapDispatchToProps = (dispatch) => {
    return {
        onCreate: (title, color) => dispatch(listActions.createList(title, color))
    }
}
export default connect(null, mapDispatchToProps)(ListCreate)