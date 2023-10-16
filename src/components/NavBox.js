import React from "react";

import { useLocation } from "react-router-dom";

import { NavLink } from "react-router-dom";

import classes from "./NavBox.module.css";

const NavBox = (props) => {
    const location = useLocation();

    const removeCompletedItemsHandler = () => {
        localStorage.setItem("items", JSON.stringify(props.items.filter(item => item.completed !== true)));
        props.onUpdateItems();
    }

    return ( 
        <React.Fragment>
            <div className={classes["nav-container"]}>
                <div className={classes["counter-box"]}>
                    {props.counter > 1 ? <span>{props.counter} items left</span> : <span>{props.counter} item left</span>}
                </div>
                <nav>
                    <ul>
                        <li>
                            <NavLink activeClassName={location.pathname === "/" ? classes["active-nav-link"] : ""} to="/">All</NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={props.onUpdateNotCompleted}
                                activeClassName={classes["active-nav-link"]}
                                to="/active"
                            >Active</NavLink>
                        </li>
                        <li>
                            <NavLink
                                onClick={props.onUpdateCompleted}
                                activeClassName={classes["active-nav-link"]}
                                to="/completed"
                            >Completed</NavLink>
                        </li>
                    </ul>
                </nav>
                <button onClick={removeCompletedItemsHandler}>
                    Clear completed
                </button>
            </div> 
            <div className={classes["first-bottom"]}></div>
            <div className={classes["second-bottom"]}></div>
        </React.Fragment>
    );
};

export default NavBox;