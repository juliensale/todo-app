import React from "react";
import { connect } from "react-redux";
import SubListItem from "./SubListItem";
import SubListCreate from "./SubListCreate";

const SubLists = (props) => {
    var sublists = null;
    const list_id = props.match.params.id;
    if (props.sublists[0] !== undefined) {
        sublists = props.sublists.filter(sublist => parseInt(sublist.list) === parseInt(list_id)).map(sublist => <li><SubListItem key={sublist.id} sublist={sublist} /></li>)
    }

    return (
        <div>
            <ul>{sublists}</ul>
            <SubListCreate list_id={list_id} />
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        sublists: state.sublists.sublists
    }
}

export default connect(mapStateToProps)(SubLists)