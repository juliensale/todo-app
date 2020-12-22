import React, { Component } from 'react'
import * as listActions from '../../store/actions/listActions';
import { connect } from 'react-redux'

class ListItem extends Component {

    handleDeleteClick = () => {
        this.props.onDelete(this.props.list.id)
    }

    render() {
        const list = this.props.list
        return (
            <div key={list.id}>
                <div style={{ backgroundColor: list.color }, { borderRadius: "50%" }, { width: "50px" }, { height: "50px" }}>

                </div>
                {list.title}
                <button onClick={this.handleDeleteClick}>Supprimer</button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (id) => dispatch(listActions.deleteList(id))
    }
}

export default connect(null, mapDispatchToProps)(ListItem)