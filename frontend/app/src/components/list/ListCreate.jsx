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
    })


    return (
        <div>
            <button className="create-button" onClick={handleClick}>
                <i className="far fa-plus" />
            </button>
            <ListCreateForm onCreate={onCreate} style={creator_style} setIsCreating={setIsCreating} />
        </div>

    )
}

const ListCreateForm = ({ style: userStyles = {}, setIsCreating, onCreate }) => {

    const initState = {
        title: '',
        color: '#000000'
    }

    const [state, setState] = useState(initState)

    const styles = {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,.15)",
        ...userStyles
    }

    const container_styles = {
        padding: "3em 5em",
        marginBottom: "5em",
        borderRadius: "1em",
        border: "1px solid var(--line-color)",
        backgroundColor: "white"
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
        <div style={styles} name="outside" onClick={handleClose}>
            <div style={container_styles}>
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

const Usage = ({ onCreate }) => {
    return <ListCreate onCreate={onCreate} />
}


const mapDispatchToProps = (dispatch) => {
    return {
        onCreate: (title, color) => dispatch(listActions.createList(title, color))
    }
}
export default connect(null, mapDispatchToProps)(Usage)