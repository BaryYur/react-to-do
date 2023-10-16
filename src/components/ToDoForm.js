import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { navActions } from "../store/nav-slice";
import classes from "./ToDoForm.module.css";
 
const ToDoForm = (props) => {
    const dispatch = useDispatch();
    const [enteredTitle, setEnteredTitle] = useState("");

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (enteredTitle.length === 0) return;

        const itemsData = {
            id: Math.random().toString(),
            completed: false,
            title: enteredTitle,
        }

        props.onSaveItemsData(itemsData);
        setEnteredTitle("");
        dispatch(navActions.completeItems);
        dispatch(navActions.notCompleteItems);
    }

    const checkingAll = () => {
        let items = JSON.parse(localStorage.getItem("items"));

        for (let item of items) {
            item.completed = true;
            localStorage.setItem("items", JSON.stringify(items));
            props.onUpdate();
        }
    }

    return (
        <div className={classes["form-container"]}>
            <input
                type="checkbox"
                id="select-all"
                onChange={() => checkingAll()}
            />
            <label htmlFor="select-all">
                <span>&gt;</span>
            </label>
            <form onSubmit={submitHandler}>
                <input 
                    type="text" 
                    placeholder="What needs to be done?"  
                    value={enteredTitle}
                    onChange={titleChangeHandler}
                />
            </form>
        </div>
    )
};

export default ToDoForm;