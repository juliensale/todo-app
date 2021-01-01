import React, { useCallback, useContext, useMemo, useState } from 'react'
import * as taskActions from '../../store/actions/taskActions'
import * as subtaskActions from '../../store/actions/subtaskActions'
import { connect } from 'react-redux'
import SubTasks from "./subtask/Subtasks"
import SubTaskForm from "./subtask/SubtaskForm"
import SubTaskCreateForm from "./subtask/SubtaskCreateForm"

const taskItemContext = React.createContext()
const { Provider } = taskItemContext
const TaskItem = ({ style: userStyles = {}, task, subtasks, onDelete, onEdit, onComplete, onSetComplete, onSubtaskComplete, onUncomplete, onSubtaskUncomplete, children }) => {
    const styles = {
        ...userStyles,
        background: task.completed ? ('var(--button-color') : ('var(--item-background-color)'),
        color: task.completed ? ('var(--button-text-color') : ('var(--item-text-color)'),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end"

    }

    const handleDeleteClick = () => {
        onDelete(task.id)
    }

    const handleEdit = (title) => {
        onEdit(task.id, title)
    }

    const handleCompleteClick = (is_completed) => {
        if (is_completed) {
            onUncomplete(task.id);
            let attached_subtasks = [];
            if (subtasks[0] !== undefined) {
                attached_subtasks = subtasks.filter(subtask => subtask.task === task.id)
            }
            attached_subtasks.forEach(subtask => onSubtaskUncomplete(subtask.id, subtask.task, subtask.title))

        } else {
            onComplete(task.id)
            let attached_subtasks = [];
            if (subtasks[0] !== undefined) {
                attached_subtasks = subtasks.filter(subtask => subtask.task === task.id)
            }
            attached_subtasks.forEach(subtask => onSubtaskComplete(subtask.id, subtask.task, subtask.title))
        }
    }


    const shouldTaskComplete = (id) => {
        let bool = true


        let attached_subtasks = [];
        if (subtasks[0] !== undefined) {
            attached_subtasks = subtasks.filter(subtask => subtask.task === task.id)
        }
        attached_subtasks.forEach(subtask => {
            bool = bool && subtask.completed || subtask.id === id

        })


        bool && onSetComplete(task.id, task.sublist, task.title)

    }



    const value = useMemo(() => {
        return {
            task,
            handleDeleteClick,
            handleEdit,
            handleCompleteClick,
            subtasks
        }
    }, [task, handleDeleteClick, handleEdit, subtasks])

    const divStyle = {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between"
    }

    return (
        <Provider value={value} >
            <div className="item" style={styles}>
                <div style={divStyle}>{children}</div>
                <SubTasks task_id={task.id} task={task} shouldTaskComplete={shouldTaskComplete} />
            </div>
        </Provider>
    )
}

const TaskInfo = ({ style: userStyles = {} }) => {
    const styles = {
        ...userStyles
    }

    const { task } = useContext(taskItemContext)

    return (
        <div className="info" style={styles} >
            {task.title}
        </div>
    )
}

const TaskCompleter = ({ style: userStyles = {} }) => {

    const styles = {
        ...userStyles
    }

    const { task, handleCompleteClick } = useContext(taskItemContext)

    const handleChange = () => {
        handleCompleteClick(task.completed)
    }

    return (
        <div style={styles}>
            <label className="complete-container">
                <input type="checkbox" onChange={handleChange} checked={task.completed} />
                <span className="checkmark-complete"></span>
            </label>
        </div>
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

    const { handleEdit, task, subtasks } = useContext(taskItemContext)

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
        var forms = document.getElementsByClassName('subtask-form')
        for (let i = 0; i < forms.length; i++) {
            forms[i].requestSubmit()
        }
    }

    const handleClose = (e) => {
        if (e.target.getAttribute('name') === "outside") {
            setIsEditing(false)
        }
    }

    var subtasks_form = null
    if (subtasks[0] !== undefined) {
        subtasks_form = subtasks.filter(subtask => subtask.task === task.id).map(subtask => <SubTaskForm key={"subtaskform" + subtask.key} subtask={subtask} />)
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
                <div>
                    {subtasks_form}
                    <SubTaskCreateForm task_id={task.id} />
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

const Usage = ({ task, subtasks, onDelete, onEdit, onComplete, onSetComplete, onSubtaskComplete, onUncomplete, onSubtaskUncomplete }) => {
    return (
        <TaskItem task={task} subtasks={subtasks} onDelete={onDelete} onEdit={onEdit} onComplete={onComplete} onSetComplete={onSetComplete} onSubtaskComplete={onSubtaskComplete} onUncomplete={onUncomplete} onSubtaskUncomplete={onSubtaskUncomplete}>
            <TaskCompleter />
            <TaskInfo />
            <TaskParams>
                <TaskEdit />
                <TaskDelete />
            </TaskParams>
        </TaskItem>
    )
}

const mapStateToProps = (state) => {
    return {
        subtasks: state.subtasks.subtasks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (id) => dispatch(taskActions.deleteTask(id)),
        onEdit: (id, title) => dispatch(taskActions.editTask(id, title)),
        onComplete: (id) => dispatch(taskActions.completeTask(id)),
        onSetComplete: (id, sublist, title) => dispatch(taskActions.changeTask(id, sublist, title, true)),
        onSubtaskComplete: (id, task, title) => dispatch(subtaskActions.changeSubTask(id, task, title, true)),
        onUncomplete: (id) => dispatch(taskActions.uncompleteTask(id)),
        onSubtaskUncomplete: (id, task, title) => dispatch(subtaskActions.changeSubTask(id, task, title, false))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Usage)