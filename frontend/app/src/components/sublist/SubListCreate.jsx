import React, { useState } from 'react';
import * as sublistActions from '../../store/actions/sublistActions';
import { connect } from 'react-redux';

const SubListCreate = ({ onCreate, list_id }) => {

    const [title, setTitle] = useState('')

    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(list_id, title)
    }

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={title} onChange={handleChange} placeholder="Titre" />
                <button>Créer une sous-liste</button>
            </form>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        onCreate: (list, title) => dispatch(sublistActions.createSubList(list, title))
    }
}
export default connect(null, mapDispatchToProps)(SubListCreate)