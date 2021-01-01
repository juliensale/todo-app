import React from "react"
import { connect } from "react-redux"
import TaskCreate from "./TaskCreate"
import TaskItem from "./TaskItem"
import { Link } from "react-router-dom";


const Tasks = (props) => {
    var tasks = null;
    const sublist_id = props.match.params.id;
    if (props.tasks[0] !== undefined) {
        tasks = props.tasks.filter(task => task.sublist === parseInt(sublist_id)).map(task => <li key={task.id}><TaskItem task={task} /></li>)
    }

    var sublist = { title: "" };
    if (props.sublists[0] !== undefined) {
        sublist = props.sublists.find(sublist => sublist.id === parseInt(sublist_id)) || sublist
    }

    return (
        <div className="item-list">
            <h1 className="back">
                <Link to={"/list/" + sublist.list + "/"}> {"<"} </Link>
                {sublist.title}
            </h1>
            <ul>{tasks}</ul>
            <TaskCreate sublist_id={sublist_id} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks.tasks,
        sublists: state.sublists.sublists
    }
}

export default connect(mapStateToProps)(Tasks)