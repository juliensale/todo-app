import React, { useMemo } from "react";
import { connect } from "react-redux";
import SubListItem from "./SubListItem";
import SubListCreate from "./SubListCreate";
import { Link } from "react-router-dom";

const SubLists = (props) => {
    var sublists = null;
    const list_id = props.match.params.id;
    if (props.sublists[0] !== undefined) {
        sublists = props.sublists.filter(sublist => parseInt(sublist.list) === parseInt(list_id)).map(sublist => <li key={sublist.id}><SubListItem sublist={sublist} /></li>)
    }

    const list = useMemo(() => {
        return props.lists.find(list => list.id === parseInt(list_id)) || { title: '' }
    }, [props.lists, list_id])

    return (
        <div className="item-list">
            <h1 className="back">
                <Link to="/" > {"<"} </Link>
                {list.title}
            </h1>
            <ul>{sublists}</ul>
            <SubListCreate list_id={list_id} />
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        lists: state.lists.lists,
        sublists: state.sublists.sublists
    }
}

export default connect(mapStateToProps)(SubLists)