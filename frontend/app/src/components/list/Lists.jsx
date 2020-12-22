import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListCreate from "./ListCreate";
import ListItem from "./ListItem";

class Lists extends Component {
    render() {
        let lists = null
        if (this.props.lists[0] !== undefined) {
            lists = this.props.lists.map(list => <ListItem list={list} />)
        }

        return (
            <div>
                {lists}
                <ListCreate />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lists: state.lists.lists
    }
}


export default connect(mapStateToProps)(Lists)