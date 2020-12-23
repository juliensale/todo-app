import React, { useState, useMemo } from 'react'
import * as listActions from '../../store/actions/listActions';
import { connect } from 'react-redux'


const ListCreate = ({ onCreate }) => {

    const [isCreating, setIsCreating] = useState(false)

    const handleClick = () => {
        setIsCreating(true)
    }

    const creator_style = useMemo(() => {
        return isCreating ? { display: "flex" } : { display: "none" }
    }, [isCreating])


    return (
        <div className="create-container">
            <button className="create-button" onClick={handleClick}>
                <i className="far fa-plus" />
            </button>
            <ListCreateForm onCreate={onCreate} style={creator_style} setIsCreating={setIsCreating} />
        </div>

    )
}

const ListCreateForm = ({ style: userStyles = {}, setIsCreating, onCreate, containerStyle: userContainerStyles = {} }) => {

    const initState = {
        title: '',
        color: '#000000'
    }
    const [state, setState] = useState(initState)

    const styles = {
        ...userStyles
    }
    const container_styles = {
        ...userContainerStyles
    }

    const handleClose = (e) => {
        if (e.target.getAttribute("name") === "outside") {
            setIsCreating(false)
        }
    }
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        onCreate(
            state.title,
            state.color
        )
        setState(initState)
    }

    return (
        <div className="full-window-outside" style={styles} name="outside" onClick={handleClose}>
            <div className="full-window-container" style={container_styles}>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="title" value={state.title} onChange={handleChange} placeholder="Titre" />
                        <label>Couleur</label><input type="color" name="color" value={state.color} onChange={handleChange} />
                        <button>Créer une liste</button>
                    </form>
                </div>
            </div>
        </div>
    )

}



const mapDispatchToProps = (dispatch) => {
    return {
        onCreate: (title, color) => dispatch(listActions.createList(title, color))
    }
}
export default connect(null, mapDispatchToProps)(ListCreate)