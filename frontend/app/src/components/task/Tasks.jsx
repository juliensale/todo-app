import React from "react"
import { connect } from "react-redux"
import TaskCreate from "./TaskCreate"
import TaskItem from "./TaskItem"


const Tasks = (props) => {
    var tasks = null;
    const sublist_id = props.match.params.id;
    if (props.tasks[0] !== undefined) {
        tasks = props.tasks.filter(task => task.sublist === parseInt(sublist_id)).map(task => <li key={task.id}><TaskItem task={task} /></li>)
    }

    return (
        <div className="item-list">
            <ul>{tasks}</ul>
            <TaskCreate sublist_id={sublist_id} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks.tasks
    }
}

export default connect(mapStateToProps)(Tasks)