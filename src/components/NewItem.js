import React from "react";

import ToDoForm from "./ToDoForm";

const NewItem = (props) => {
    const saveItemsDataHandler = (enteredItemsData) => {
        const itemsData = {
          ...enteredItemsData,
          id: Math.random().toString(),
        }

        props.onAddItems(itemsData);
    }

    return (
        <div className="new-item">
            <ToDoForm
                onUpdate={props.onUpdateItems}
                onSaveItemsData={saveItemsDataHandler} 
            />
        </div>
    )
}

export default NewItem;