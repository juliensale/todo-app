import React, { useContext, useMemo, useState } from 'react'
import * as sublistActions from '../../store/actions/sublistActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const subListItemContext = React.createContext()
const { Provider } = subListItemContext
const SubListItem = ({ children, sublist, onDelete, onEdit, style: userStyles = {} }) => {
    const styles = {
        ...userStyles
    }

    const handleDeleteClick = () => {
        onDelete(sublist.id)
    }

    const handleEdit = (title) => {
        onEdit(sublist.id, title)
    }

    const value = {
        sublist,
        handleDeleteClick,
        handleEdit
    }

    return (
        <Provider value={value}>
            <div className="item" style={styles}>
                {children}
            </div>
        </Provider>
    )
}

const SubListInfo = ({ style: userStyles = {} }) => {
    const styles = {
        ...userStyles
    }

    const { sublist } = useContext(subListItemContext)

    return (
        <Link to={sublist.id + '/'} className="info" style={styles}>
            {sublist.title}
        </Link>
    )
}

const SubListParams = ({ children, style: userStyles = {} }) => {
    const styles = {
        ...userStyles
    }

    return (
        <div className="params" style={styles} >
            {children}
        </div>
    )
}

const SubListEdit = ({ style: userStyles = {} }) => {

    const [isEditing, setIsEditing] = useState(false)
    const handleClick = () => setIsEditing(true)

    const styles = {
        ...userStyles
    }

    const editor_style = useMemo(() => {
        return isEditing ? { display: "flex" } : { display: "none" }
    }, [isEditing])


    return (
        <div style={styles}>
            <button className="edit-button" onClick={handleClick}>
                <i className="far fa-edit" />
            </button>
            <SubListEditForm style={editor_style} setIsEditing={setIsEditing} />
        </div>
    )

}

const SubListEditForm = ({ style: userStyles = {}, containerStyle: userContainerStyles = {}, setIsEditing }) => {

    const { handleEdit, sublist } = useContext(subListItemContext)

    const styles = {

        ...userStyles
    }

    const container_styles = {
        ...userContainerStyles
    }

    const [title, setTitle] = useState(sublist.title)

    const handleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleEdit(title)
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
                        <input type="text" name="title" value={title} onChange={handleChange} placeholder="Titre" />
                        <button>Enregistrer</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

const SubListDelete = ({ style: userStyles = {} }) => {

    const { handleDeleteClick } = useContext(subListItemContext)

    const styles = {
        ...userStyles
    }

    return (
        <button style={styles} className="delete-button" onClick={handleDeleteClick}>
            <i className="far fa-trash" />
        </button>
    )
}

const Usage = ({ sublist, onDelete, onEdit }) => {
    return (
        <SubListItem sublist={sublist} onDelete={onDelete} onEdit={onEdit}>
            <SubListInfo />
            <SubListParams >
                <SubListEdit />
                <SubListDelete />
            </SubListParams>
        </SubListItem>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (id) => dispatch(sublistActions.deleteSubList(id)),
        onEdit: (id, title) => dispatch(sublistActions.editSubList(id, title))
    }
}
export default connect(null, mapDispatchToProps)(Usage)