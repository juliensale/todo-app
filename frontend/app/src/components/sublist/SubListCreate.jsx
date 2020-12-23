import React, { useState, useMemo } from 'react';
import * as sublistActions from '../../store/actions/sublistActions';
import { connect } from 'react-redux';

const SubListCreate = ({ onCreate, list_id }) => {


    const [isCreating, setIsCreating] = useState(false)

    const handleCreate = (title) => {
        onCreate(list_id, title)
    }

    const handleClick = () => setIsCreating(true)

    const creator_style = useMemo(() => {
        return isCreating ? { display: "flex" } : { display: "none" }
    }, [isCreating])

    return (
        <div>
            <button className="create-button" onClick={handleClick}>
                <i className="far fa-plus" />
            </button>
            <SubListCreateForm handleCreate={handleCreate} style={creator_style} setIsCreating={setIsCreating} />
        </div>
    )
}

const SubListCreateForm = ({ handleCreate, style: userStyles = {}, setIsCreating }) => {

    const [title, setTitle] = useState('')

    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreate(title)
        setTitle('')
    }

    const handleClose = (e) => {
        if (e.target.getAttribute('name') === "outside") {
            setIsCreating(false)
        }
    }

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


    return (
        <div style={styles} name="outside" onClick={handleClose}>
            <div style={container_styles}>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="title" value={title} onChange={handleChange} placeholder="Titre" />
                        <button>Créer une sous-liste</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {
    return {
        onCreate: (list, title) => dispatch(sublistActions.createSubList(list, title))
    }
}
export default connect(null, mapDispatchToProps)(SubListCreate)