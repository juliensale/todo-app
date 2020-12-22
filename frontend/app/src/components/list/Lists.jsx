import React from 'react'
import { connect } from 'react-redux'
import ListCreate from "./ListCreate";
import ListItem from "./ListItem";

const Lists = (props) => {
    let lists = null
    if (props.lists[0] !== undefined) {
        lists = props.lists.map(list => <ListItem list={list} />)
    }
    return (
        <div>
            {lists}
            <ListCreate />
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        lists: state.lists.lists
    }
}


export default connect(mapStateToProps)(Lists)