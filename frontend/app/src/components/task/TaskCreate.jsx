import React, { useState, useMemo } from 'react';
import * as taskActions from '../../store/actions/taskActions';
import { connect } from 'react-redux';

const TaskCreate = ({ onCreate, sublist_id }) => {


    const [isCreating, setIsCreating] = useState(false)

    const handleCreate = (title) => {
        onCreate(sublist_id, title)
    }

    const handleClick = () => setIsCreating(true)

    const creator_style = useMemo(() => {
        return isCreating ? { display: "flex" } : { display: "none" }
    }, [isCreating])

    return (
        <div className="create-container">
            <button className="create-button" onClick={handleClick}>
                <i className="far fa-plus" />
            </button>
            <TaskCreateForm handleCreate={handleCreate} style={creator_style} setIsCreating={setIsCreating} />
        </div>
    )
}

const TaskCreateForm = ({ handleCreate, style: userStyles = {}, containerStyle: userContainerStyles = {}, setIsCreating }) => {

    const [title, setTitle] = useState('')

    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreate(title)
        setTitle('')
    }

    const handleClose = (e) => {
        if (e.target.getAttribute('name') === "outside") {
            setIsCreating(false)
        }
    }

    const styles = {
        ...userStyles
    }

    const container_styles = {
        ...userContainerStyles
    }


    return (
        <div className="full-window-outside" style={styles} name="outside" onClick={handleClose}>
            <div className="full-window-container" style={container_styles}>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="title" value={title} onChange={handleChange} placeholder="Titre" />
                        <button>Créer une tâche</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        onCreate: (sublist, title) => dispatch(taskActions.createTask(sublist, title))
    }
}
export default connect(null, mapDispatchToProps)(TaskCreate)