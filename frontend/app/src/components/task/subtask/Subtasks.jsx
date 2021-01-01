import React from "react"
import { connect } from "react-redux"
import SubtaskItem from "./SubtaskItem"


const SubTasks = (props) => {
    var subtasks = null;
    const task_id = props.task_id;
    if (props.subtasks[0] !== undefined) {
        subtasks = props.subtasks.filter(subtask => subtask.task === parseInt(task_id)).map(subtask => <li key={subtask.id}><SubtaskItem task={props.task} subtask={subtask} shouldTaskComplete={props.shouldTaskComplete} /></li>)
    }


    return (
        <ul className="subtask-list">
            {subtasks}
        </ul>

    )
}

const mapStateToProps = (state) => {
    return {

        subtasks: state.subtasks.subtasks
    }
}

export default connect(mapStateToProps)(SubTasks)