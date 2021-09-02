import React, { useState } from 'react'
import * as subtaskActions from '../../../store/actions/subtaskActions'
import { connect } from 'react-redux'

const SubTaskCreateForm = ({ task_id, onCreate }) => {

    const [title, setTitle] = useState('')

    const handleCreate = (title) => {
        onCreate(task_id, title)
    }

    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleCreate(title)
        setTitle('')
    }

    return (
        <form onSubmit={handleSubmit} className="subtask-create-form">
            <input type="text" value={title} onChange={handleChange} placeholder="Créer une sous-tâche" />
            <div className="button-container">
                <button className="create-button">
                    <i className="far fa-plus" />
                </button>
            </div>
        </form>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreate: (task, title) => dispatch(subtaskActions.createSubTask(task, title))
    }
}
export default connect(null, mapDispatchToProps)(SubTaskCreateForm)