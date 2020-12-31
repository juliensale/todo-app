import React, { useContext, useState } from 'react'
import * as subtaskActions from '../../../store/actions/subtaskActions'
import { connect } from 'react-redux'

const subtaskItemContext = React.createContext()
const { Provider } = subtaskItemContext
const SubTaskItem = ({ style: userStyles = {}, subtask, onComplete, onUncomplete, children }) => {
    const styles = {
        ...userStyles,
        color: subtask.completed ? ('var(--button-text-color') : ('var(--item-text-color)')

    }

    const handleCompleteClick = (is_completed) => {
        is_completed ? onUncomplete(subtask.id) : onComplete(subtask.id)
    }

    const value = {
        subtask,
        handleCompleteClick
    }

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

    const [isCompleted, setIsCompleted] = useState(subtask.completed)

    const handleChange = () => {
        setIsCompleted(!isCompleted)
        handleCompleteClick(isCompleted)
    }

    return (
        <div style={styles}>
            <label className="complete-container">
                <input type="checkbox" onChange={handleChange} checked={isCompleted} />
                <span className="checkmark-complete" style={{ transform: "scale(.8)" }}></span>
            </label>
        </div>
    )
}

const Usage = ({ subtask, onComplete, onUncomplete }) => {
    return (
        <SubTaskItem subtask={subtask} onComplete={onComplete} onUncomplete={onUncomplete}>
            <SubTaskCompleter />
            <SubTaskInfo />
        </SubTaskItem>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onComplete: (id) => dispatch(subtaskActions.completeSubTask(id)),
        onUncomplete: (id) => dispatch(subtaskActions.uncompleteSubTask(id))
    }
}

export default connect(null, mapDispatchToProps)(Usage)