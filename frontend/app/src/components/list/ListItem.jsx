import React, { useContext, useMemo, useState } from 'react'
import * as listActions from '../../store/actions/listActions';
import { connect } from 'react-redux'
import { Link } from "react-router-dom"

const ListItemContext = React.createContext()
const { Provider } = ListItemContext
const ListItem = ({ onDelete, list, onEdit, children, style: userStyles = {} }) => {

    const handleDeleteClick = () => {
        onDelete(list.id)
    }

    const handleEdit = (title, color) => {
        onEdit(list.id, title, color)
    }

    const value = {
        handleDeleteClick,
        handleEdit,
        list
    }

    const styles = {
        ...userStyles
    }

    return (
        <Provider value={value}>
            <div className="item" style={styles}>
                {children}
            </div>
        </Provider>
    )

}

const ListColor = ({ style: userStyles = {} }) => {
    const { list } = useContext(ListItemContext)
    const color = list.color;
    const styles = {
        backgroundColor: color,
        ...userStyles
    }
    return (
        <div className="color" style={styles} />
    )
}

const ListInfo = ({ children, style: userStyles = {} }) => {
    const { list } = useContext(ListItemContext)
    const styles = {
        ...userStyles
    }

    return (
        <Link to={"/list/" + list.id + '/'} style={styles} className="info">
            {children}
            <p>{list.title}</p>
        </Link>
    )
}

const ListParams = ({ children, style: userStyles = {} }) => {
    const styles = {
        ...userStyles
    }

    return (
        <div style={styles} className="params">
            {children}
        </div>
    )
}

const ListEditForm = ({ style: userStyles = {}, setIsEditing, containerStyles: userContainerStyles = {} }) => {

    const { list, handleEdit } = useContext(ListItemContext)

    const styles = {
        ...userStyles
    }

    const container_styles = {
        ...userContainerStyles
    }

    const [state, setState] = useState({
        title: list.title,
        color: list.color
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleEdit(state.title, state.color)
    }

    const handleClose = (e) => {
        if (e.target.getAttribute('name') === "outside") {
            setIsEditing(false)
        }
    }

    return (
        <div className="full-window-outside" style={styles} name="outside" onClick={handleClose}>
            <div className="full-window-container" style={container_styles}>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="title" value={state.title} onChange={handleChange} placeholder="Titre" />
                        <label>Couleur</label><input type="color" name="color" value={state.color} onChange={handleChange} />
                        <button>Enregistrer</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

const ListEdit = ({ style: userStyles = {} }) => {
    const [isEditing, setIsEditing] = useState(false)
    const handleClick = () => {
        setIsEditing(true)
    }

    const styles = {
        ...userStyles
    }

    const editor_style = useMemo(() => {
        return isEditing ? { display: "flex" } : { display: "none" }
    }, [isEditing])

    return (
        <div style={styles}>
            <button className="edit-button" onClick={handleClick}>
                <i className="far fa-edit"></i>
            </button>
            <ListEditForm style={editor_style} setIsEditing={setIsEditing} />
        </div>
    )
}

const ListDelete = ({ style: userStyles = {} }) => {
    const { handleDeleteClick } = useContext(ListItemContext)
    const styles = {
        ...userStyles
    }
    return (
        <button style={styles} className="delete-button" onClick={handleDeleteClick}>
            <i className="far fa-trash" />
        </button>
    )

}

const Usage = ({ list, onDelete, onEdit }) => {
    return (
        <ListItem list={list} onDelete={onDelete} onEdit={onEdit}>
            <ListInfo>
                <ListColor />
            </ListInfo>
            <ListParams>
                <ListEdit />
                <ListDelete />
            </ListParams>
        </ListItem>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (id) => dispatch(listActions.deleteList(id)),
        onEdit: (id, title, color) => dispatch(listActions.editList(id, title, color))
    }
}

export default connect(null, mapDispatchToProps)(Usage)