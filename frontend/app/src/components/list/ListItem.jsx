import React, { useContext, useMemo, useState } from 'react'
import * as listActions from '../../store/actions/listActions';
import { connect } from 'react-redux'


const ListItemContext = React.createContext()
const { Provider } = ListItemContext
const ListItem = ({ onDelete, list, onEdit, children }) => {

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
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid var(--line-color)",
        borderRadius: "2em",
        padding: ".5em 1em"
    }

    return (
        <Provider value={value}>
            <div style={styles}>
                {children}
            </div>
        </Provider>
    )

}

const ListColor = ({ style: userStyles = {} }) => {
    const { list } = useContext(ListItemContext)
    const color = list.color;
    const styles = {
        height: "12px",
        width: "12px",
        borderRadius: "50%",
        backgroundColor: color,
        marginRight: "1em",
        ...userStyles
    }
    return (
        <div style={styles} />
    )
}

const ListInfo = ({ children, style: userStyles = {} }) => {
    const { list } = useContext(ListItemContext)
    const styles = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        ...userStyles
    }

    return (
        <div style={styles}>
            {children}
            <p>{list.title}</p>
        </div>
    )
}

const ListParams = ({ children, style: userStyles = {} }) => {
    const styles = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        ...userStyles
    }

    return (
        <div style={styles}>
            {children}
        </div>
    )
}

const ListEditForm = ({ style: userStyles = {}, setIsEditing }) => {

    const { list, handleEdit } = useContext(ListItemContext)

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
        <div style={styles} name="outside" onClick={handleClose}>
            <div style={container_styles}>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="title" value={state.title} onChange={handleChange} placeholder="Titre" />
                        <input type="text" name="color" value={state.color} onChange={handleChange} placeholder="Couleur" />
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
            <button onClick={handleClick}>
                <i className="far fa-edit"></i>
            </button>
            <ListEditForm style={editor_style} setIsEditing={setIsEditing} />
        </div>
    )
}

const ListDelete = ({ style: userStyles = {} }) => {
    const { handleDeleteClick } = useContext(ListItemContext)
    const styles = {
        border: "none",
        backgroundColor: " transparent",
        color: "red",
        fontSize: "1em",
        fontWeight: "500",
        ...userStyles
    }
    return (
        <button style={styles} onClick={handleDeleteClick}>
            <i className="far fa-trash" />
        </button>
    )

}

const Usage = ({ list, onDelete, onEdit }) => {
    return (
        <ListItem list={list} onDelete={onDelete} onEdit={onEdit}>
            <ListInfo>
                <ListColor style={{ border: "1px solid black" }} />
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