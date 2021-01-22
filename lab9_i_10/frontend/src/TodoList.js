import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    FormControlLabel,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
    fab: {
        position: "absolute",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const validationSchema = yup.object({
    title: yup.string("enter title"),
    description: yup.string("enter description"),
    completed: yup.boolean("enter confirmed"),
});

function TodoEditModal({
    open,
    closeDialog,
    todo = { title: "", description: "", completed: false },
    handleSubmit,
}) {
    const formik = useFormik({
        initialValues: todo,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
        enableReinitialize: true,
    });
    return (
        <Dialog
            open={open}
            onClose={closeDialog}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                {todo.id ? "edit todo" : "add todo"}
            </DialogTitle>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                    <TextField
                        margin="dense"
                        label="title"
                        id="title"
                        fullWidth
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.title && Boolean(formik.errors.title)
                        }
                    />
                    <TextField
                        margin="dense"
                        label="description"
                        id="description"
                        fullWidth
                        multiline
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={
                            formik.touched.description &&
                            Boolean(formik.errors.description)
                        }
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                id="completed"
                                color="primary"
                                checked={formik.values.completed}
                                onChange={formik.handleChange}
                            />
                        }
                        label="completed"
                    />
                </DialogContent>
                <DialogActions>
                    <Button type="submit" color="primary">
                        save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

function TodoList() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        showCompleted: false,
        modalOpen: false,
        SelectedId: null,
        todos: [],
    });
    const refreshData = () => {
        axios.get("http://localhost:8000/api/todos").then((res) => {
            setState((prevState) => ({ ...prevState, todos: res.data }));
        });
    };
    const handleCompletedToggle = () => {
        setState((prevState) => ({
            ...prevState,
            showCompleted: !prevState.showCompleted,
        }));
    };
    const handleDelete = (id) => () => {
        axios
            .delete(`http://localhost:8000/api/todos/${id}`)
            .then(() => refreshData());
    };
    const handleModalToggle = (open) => () => {
        setState((prevState) => ({
            ...prevState,
            modalOpen: open,
        }));
    };
    const closeDialog = handleModalToggle(false);
    const addItem = () =>
        setState((prevState) => ({
            ...prevState,
            modalOpen: true,
            SelectedId: null,
        }));

    const editItem = (todoId) => () =>
        setState((prevState) => ({
            ...prevState,
            modalOpen: true,
            SelectedId: todoId,
        }));
    React.useEffect(() => refreshData(), []);
    return (
        <React.Fragment>
            <Button onClick={handleCompletedToggle}>
                {state.showCompleted ? "show unfinished" : "show completed"}
            </Button>
            <List>
                {state.todos
                    .filter((todo) => todo.completed === state.showCompleted)
                    .map((todo) => (
                        <ListItem>
                            <ListItemText primary={todo.title} />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={editItem(todo.id)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={handleDelete(todo.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
            </List>
            <Fab color="primary" className={classes.fab} onClick={addItem}>
                <AddIcon />
            </Fab>
            <TodoEditModal
                closeDialog={closeDialog}
                open={state.modalOpen}
                handleSubmit={(todo) => {
                    closeDialog();
                    if (todo.id) {
                        axios
                            .put(
                                `http://localhost:8000/api/todos/${todo.id}`,
                                todo
                            )
                            .then(() => refreshData());
                    } else {
                        axios
                            .post("http://localhost:8000/api/todos", todo)
                            .then(() => refreshData());
                    }
                }}
                todo={state.todos.find((todo) => todo.id === state.SelectedId)}
            />
        </React.Fragment>
    );
}

export default TodoList;
