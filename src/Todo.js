// rfce for component snippet
import React, { useState } from 'react'
import { List, ListItem, ListItemText, Button, Modal } from '@material-ui/core'
import db from './Firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

function Todo(props) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState()

    const updateTodo = () => {
        // update the todo with the new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true })

        setOpen(false)
    }
    
    return (
        <>
        <Modal
        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={open}
        onClose={e => setOpen(false)}>
            <div className={classes.paper}>
                <h1>Edit Todo</h1>
                <input 
                placeholder={props.todo.todo} 
                type="text" value={input} 
                onChange={event => setInput(event.target.value)}
                />
                <Button 
                disabled={!input} 
                onClick={updateTodo}>
                    Update Todo
                </Button>
            </div>
        </Modal>
        <List>
            <ListItem disableGutters={true}>
            </ListItem>
            <ListItemText primary={props.todo.todo} secondary="Dummy Deadline Here"/>
            <EditIcon onClick={e => setOpen(true)}/>
            <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()}/>
        </List>
        </>
    )
}

export default Todo
