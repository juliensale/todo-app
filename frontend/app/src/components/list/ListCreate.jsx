import React, { Component } from 'react'
import * as listActions from '../../store/actions/listActions';
import { connect } from 'react-redux'

class ListCreate extends Component {

    state = {
        title: "",
        color: ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.onCreate(
            this.state.title,
            this.state.color
        )
    }



    render() {
        return (
            <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="title" value={this.state.title} onChange={this.handleChange} placeholder="Titre" />
                    <input type="text" name="color" value={this.state.color} onChange={this.handleChange} placeholder="Couleur" />
                    <button>Créer une liste</button>
                </form>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onCreate: (title, color) => dispatch(listActions.createList(title, color))
    }
}
export default connect(null, mapDispatchToProps)(ListCreate)