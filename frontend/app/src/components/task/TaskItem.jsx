import React, { useContext, useMemo, useState } from 'react'
import * as taskActions from '../../store/actions/taskActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const taskItemContext = React.createContext()
const { Provider } = taskItemContext
const TaskItem = ({ style: userStyles = {}, task, onDelete, onEdit, children }) => {
    const styles = {
        ...userStyles
    }

    const handleDeleteClick = () => {
        onDelete(task.id)
    }

    const handleEdit = (title) => {
        onEdit(task.id, title)
    }

    const value = {
        task,
        handleDeleteClick,
        handleEdit
    }

    return (
        <Provider value={value} >
            <div className="item" style={styles}>
                {children}
            </div>
        </Provider>
    )
}

const TaskInfo = ({ styles: userStyles = {}, children }) => {
    const styles = {
        ...userStyles
    }

    const { task } = useContext(taskItemContext)

    return (
        <Link to={task.id + "/"} className="info" style={styles} >
            {children}
            {task.title}
        </Link>
    )
}

const TaskParams = ({ style: userStyles = {}, children }) => {
    const styles = {
        ...userStyles
    }

    return (
        <div className="params" style={styles}>
            {children}
        </div>
    )
}

const TaskEdit = ({ style: userStyles = {} }) => {
    const [isEditing, setIsEditing] = useState(false)
    const handleClick = () => setIsEditing(true)

    const styles = {
        ...userStyles
    }

    const editor_style = useMemo(() => {
        return isEditing ? { display: "flex" } : { display: "none" }
    }, [isEditing])

    return (
        <div style={styles}>
            <button className="edit-button" onClick={handleClick}>
                <i className="far fa-edit" />
            </button>
            <TaskEditForm style={editor_style} setIsEditing={setIsEditing} />
        </div>
    )
}

const TaskEditForm = ({ style: userStyles = {}, containerStyle: userContainerStyles = {}, setIsEditing }) => {

    const { handleEdit, task } = useContext(taskItemContext)

    const styles = {
        ...userStyles
    }

    const container_styles = {
        ...userContainerStyles
    }

    const [title, setTitle] = useState(task.title)

    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleEdit(title)
    }

    const handleClose = (e) => {
        if (e.target.getAttribute('name') === "outside") {
            setIsEditing(false)
        }
    }

    return (
        <div className="full-window-outside" style={styles} name="outside" onClick={handleClose}>
            <div className="full-window-container" style={container_styles}>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="title" value={title} onChange={handleChange} placeholder="Titre" />
                        <button>Enregistrer</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

const TaskDelete = ({ style: userStyles = {} }) => {

    const { handleDeleteClick } = useContext(taskItemContext)

    const styles = {
        ...userStyles
    }

    return (
        <button style={styles} className="delete-button" onClick={handleDeleteClick}>
            <i className="far fa-trash" />
        </button>
    )
}

const Usage = ({ task, onDelete, onEdit }) => {
    return (
        <TaskItem task={task} onDelete={onDelete} onEdit={onEdit}>
            <TaskInfo>
            </TaskInfo>
            <TaskParams>
                <TaskEdit />
                <TaskDelete />
            </TaskParams>
        </TaskItem>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (id) => dispatch(taskActions.deleteTask(id)),
        onEdit: (id, title) => dispatch(taskActions.editTask(id, title))
    }
}

export default connect(null, mapDispatchToProps)(Usage)