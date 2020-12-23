import React from 'react'
import { connect } from 'react-redux'
import ListCreate from "./ListCreate";
import ListItem from "./ListItem";

const Lists = (props) => {
    let lists = null
    if (props.lists[0] !== undefined) {
        lists = props.lists.map(list => <li><ListItem key={list.id} list={list} /></li>)
    }
    return (
        <div className="item-list">
            <h1>Listes</h1>
            <ul>{lists}</ul>
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