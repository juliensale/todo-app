import React, { Component, useContext } from 'react'
import * as listActions from '../../store/actions/listActions';
import { connect } from 'react-redux'


const ListItemContext = React.createContext()
const { Provider } = ListItemContext
const ListItem = ({ onDelete, list, children }) => {

    const handleDeleteClick = () => {
        onDelete(list.id)
    }

    const value = {
        handleDeleteClick,
        list
    }

    return (
        <Provider value={value}>
            <div key={list.id}>
                {children}
            </div>
        </Provider>
    )

}

const mapDispatchToProps = (dispatch) => {
    return {
        onDelete: (id) => dispatch(listActions.deleteList(id))
    }
}

const ListColor = ({ styles: userStyles = {} }) => {
    const { list } = useContext(ListItemContext)
    const color = list.color;
    const styles = {
        height: "12px",
        width: "12px",
        borderRadius: "50%",
        backgroundColor: color,
        ...userStyles
    }
    return (
        <div style={styles} />
    )
}

const ListInfo = () => {
    const { list } = useContext(ListItemContext)
    return (
        <p>{list.title}</p>
    )
}

const ListDelete = ({ styles: userStyles = {} }) => {
    const { handleDeleteClick } = useContext(ListItemContext)
    const styles = {
        ...userStyles
    }
    return (
        <button style={styles} onClick={handleDeleteClick}>
            supprimer
        </button>
    )

}

const Usage = ({ list, onDelete }) => {
    return (
        <ListItem list={list} onDelete={onDelete}>
            <ListColor />
            <ListInfo />
            <ListDelete />
        </ListItem>
    )
}

export default connect(null, mapDispatchToProps)(Usage)