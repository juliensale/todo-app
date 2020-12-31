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
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={handleChange} />
            <button>+</button>
        </form>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreate: (task, title) => dispatch(subtaskActions.createSubTask(task, title))
    }
}
export default connect(null, mapDispatchToProps)(SubTaskCreateForm)