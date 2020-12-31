import React, { useState } from 'react'
import * as subtaskActions from '../../../store/actions/subtaskActions'
import { connect } from 'react-redux'


const SubTaskForm = ({ style: userStyles = {}, subtask, onEdit, onDelete }) => {

    const [title, setTitle] = useState(subtask.title)

    const styles = {
        ...userStyles,
    }

    const handleDeleteClick = () => {
        onDelete(subtask.id)
    }

    const handleEdit = (title) => {
        onEdit(subtask.id, title)
    }

    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleEdit(title)
    }


    return (
        <form className="subtask-form" style={styles} onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={handleChange} />
            <button className="delete-button" onClick={handleDeleteClick}>
                <i className="far fa-trash" />
            </button>
        </form>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        onEdit: (id, title) => dispatch(subtaskActions.editSubTask(id, title)),
        onDelete: id => dispatch(subtaskActions.deleteSubTask(id))
    }
}
export default connect(null, mapDispatchToProps)(SubTaskForm)