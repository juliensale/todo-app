import React, { useContext, useMemo } from 'react'
import * as subtaskActions from '../../../store/actions/subtaskActions'
import * as taskActions from '../../../store/actions/taskActions'
import { connect } from 'react-redux'

const subtaskItemContext = React.createContext()
const { Provider } = subtaskItemContext
const SubTaskItem = ({ style: userStyles = {}, task, subtask, onComplete, onUncomplete, onTaskUncomplete, shouldTaskComplete, children }) => {
    const styles = {
        ...userStyles,
        color: subtask.completed ? ('var(--button-text-color') : ('var(--item-text-color)')

    }

    const handleCompleteClick = (is_completed) => {
        if (is_completed) {
            onUncomplete(subtask.id)
            onTaskUncomplete(task.id, task.sublist, task.title)
        } else {
            onComplete(subtask.id)
            shouldTaskComplete(subtask.id)
        }

    }

    const value = useMemo(() => {
        return {
            subtask,
            handleCompleteClick
        }
    }, [subtask])

    return (
        <Provider value={value} >
            <div style={styles} className="subtask-item">
                {children}
            </div>
        </Provider>
    )
}

const SubTaskInfo = ({ style: userStyles = {} }) => {
    const styles = {
        ...userStyles
    }

    const { subtask } = useContext(subtaskItemContext)

    return (
        <div style={styles} >
            {subtask.title}
        </div>
    )
}

const SubTaskCompleter = ({ style: userStyles = {} }) => {

    const styles = {
        ...userStyles
    }

    const { subtask, handleCompleteClick } = useContext(subtaskItemContext)


    const handleChange = () => {
        handleCompleteClick(subtask.completed)
    }

    return (
        <div style={styles}>
            <label className="complete-container">
                <input type="checkbox" onChange={handleChange} checked={subtask.completed} />
                <span className="checkmark-complete" style={{ transform: "scale(.8)" }}></span>
            </label>
        </div>
    )
}

const Usage = ({ task, subtask, onComplete, onUncomplete, onTaskUncomplete, shouldTaskComplete }) => {
    return (
        <SubTaskItem task={task} subtask={subtask} onComplete={onComplete} onUncomplete={onUncomplete} onTaskUncomplete={onTaskUncomplete} shouldTaskComplete={shouldTaskComplete}>
            <SubTaskCompleter />
            <SubTaskInfo />
        </SubTaskItem>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        onComplete: (id) => dispatch(subtaskActions.completeSubTask(id)),
        onUncomplete: (id) => dispatch(subtaskActions.uncompleteSubTask(id)),
        onTaskUncomplete: (id, sublist, title) => dispatch(taskActions.changeTask(id, sublist, title, false))
    }
}

export default connect(null, mapDispatchToProps)(Usage)