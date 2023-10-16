import React, { useState } from "react";

import classes from "./ToDoItem.module.css";

const ToDoItem = (props) => {
    const [itemToDo, setItemToDo] = useState(true);
    const [enteredInputValue, setEnteredInputValue] = useState(props.title || "");
    const [toggle, setToggle] = useState(true);

    const removeItemHandler = () => {
        props.onDelete();
        setItemToDo(false);
    }

    const changeInputHandler = (event) => {
        setEnteredInputValue(event.target.value);
    }

    let labels = document.getElementById(props.id);

    let ENTER_KEY = 13;
    const onKeyHandler = (event) => {
        if (event.which === ENTER_KEY) {
            setToggle(true);
        }

        let items = JSON.parse(localStorage.getItem("items"));

        for (let item of items) {
            if (item.id === labels.id) {
                item.title = labels.value;
            }
        }

        localStorage.setItem("items", JSON.stringify(items));
    }

    const onBlurHandler = () => {
        setToggle(true);

        let items = JSON.parse(localStorage.getItem("items"));

        for (let item of items) {
            if (item.id === labels.id) {
                item.title = labels.value;
            }
        }

        localStorage.setItem("items", JSON.stringify(items));
    }
    
    const doubleHandler = () => {
        setToggle(false);
    }

    return (
        <div>
            {itemToDo && 
                <li className={classes["item-container"]}>
                    <input
                        className={toggle ? classes["active-checkbox"] : classes["not-active-checkbox"]}
                        type="checkbox"
                        checked={props.completed}
                        onChange={props.onCheck}
                    />
                    <div className={classes["title-container"]}>
                        {toggle ? (
                        <label
                            onDoubleClick={doubleHandler}
                            htmlFor={props.id}
                            id={props.id}
                        >{enteredInputValue}</label>
                        ) : (
                        <input
                            type="text"
                            onBlur={onBlurHandler}
                            value={enteredInputValue}
                            onChange={changeInputHandler}
                            onKeyDown={onKeyHandler}
                            id={props.id}
                        />
                        )}
                    </div>
                    <button
                        className={toggle ? classes["active-button"] : classes["not-active-button"]}
                        onClick={removeItemHandler}
                    >
                        <span></span>
                        <span></span>
                    </button>
                </li>
            }
        </div>
    )
};

export default ToDoItem;