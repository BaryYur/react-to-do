import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { navActions } from "../store/nav-slice";

import { Route, Switch } from "react-router-dom";

import NavBox from "./NavBox";
import ToDoItem from "./ToDoItem";
import NewItem from "./NewItem";
import classes from "./ToDoList.module.css";

const ToDoList = (props) => {
    const dispatch = useDispatch();
    const show = useSelector(state => state.visibility.visibility);
    const completedItems = useSelector(state => state.visibility.completedItems);
    const activeItems = useSelector(state => state.visibility.activeItems);
    const [items, setItems] = useState(
        JSON.parse(localStorage.getItem("items")) || []
    );

    const counter = items.length;

    const addItemHandler = (items) => {
        setItems((prevItems) => {
          return [items, ...prevItems];
        });
    };

    if (items.length > 0) {
        dispatch(navActions.visible());
    } else {
        dispatch(navActions.inVisible());
    }

    const deleteItemHandler = (id) => {
        setItems(items.filter(item => item.id !== id));
    }

    const checkItemHandler = (id) => {
        for (let item of items) {
            if (item.id === id) {
                item.completed = !item.completed;
                localStorage.setItem("items", JSON.stringify(items));
                setItems(JSON.parse(localStorage.getItem("items")));
            }
        }

        dispatch(navActions.completeItems());
        dispatch(navActions.notCompleteItems());
    }

    const completedHandler = (id) => {
        for (let item of items) {
            if (item.id === id) {
                return item.completed
            }
        }

        dispatch(navActions.completeItems());
        dispatch(navActions.notCompleteItems());
    }

    const completeHandler = () => {
        dispatch(navActions.completeItems());
    }

    const notCompleteHandler = () => {
        dispatch(navActions.notCompleteItems());
    }

    const updatingItems = () => {
        setItems(JSON.parse(localStorage.getItem("items")));
    }

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);

    return (
        <div className={classes["to-do-container"]}>
            <div className={classes["to-do__title"]}>
                <h1>todos</h1>
            </div>
            <NewItem onAddItems={addItemHandler} onUpdateItems={updatingItems} />
            <Switch>
                <Route path="/" exact >
                    <ul>
                        {items.map(item => 
                            <ToDoItem
                                key={item.id}
                                id={item.id}
                                completed={completedHandler(item.id)}
                                title={item.title}
                                onDelete={() => deleteItemHandler(item.id)}
                                onCheck={() => checkItemHandler(item.id)}
                            />  
                        )}
                    </ul>
                </Route>
                <Route path="/active" >
                    <ul>
                        {activeItems.map(item =>
                            <ToDoItem
                                key={item.id}
                                id={item.id}
                                // completed={completedHandler(item.id)}
                                title={item.title}
                                onDelete={() => deleteItemHandler(item.id)}
                                onCheck={() => checkItemHandler(item.id)}
                            />
                        )}
                    </ul>
                </Route>
                <Route path="/completed" >
                    <ul>
                        {completedItems.map(item =>
                            <ToDoItem
                                key={item.id}
                                id={item.id}
                                completed={completedHandler(item.id)}
                                title={item.title}
                                onDelete={() => deleteItemHandler(item.id)}
                                onCheck={() => checkItemHandler(item.id)}
                            />
                        )}
                    </ul>
                </Route>
            </Switch>
            {show &&
                <NavBox
                    counter={counter}
                    onUpdateNotCompleted={notCompleteHandler}
                    onUpdateCompleted={completeHandler}
                    onUpdateItems={updatingItems}
                    items={items}
                />
            }
        </div>
    )
}

export default ToDoList;