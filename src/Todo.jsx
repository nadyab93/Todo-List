import React, { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { BiEdit } from 'react-icons/bi'; 
import { updateDoc, doc } from 'firebase/firestore';
import { db } from './firebase'; 

const style = {
    li: `flex justify-between bg-sky-400 p-4 my-2 capitalize`,
    liComplete: `flex justify-between bg-sky-300 p-4 my-2 capitalize`,
    row: `flex`,
    text: `ml-2 cursor-pointer`,
    textComplete: `ml-2 cursor-pointer line-through`,
    buttonContainer: `flex items-center space-x-2`, 
    button: `cursor-pointer flex items-center`, 
};

function Todo({ todo, toggleComplete, deleteTodo }) {
    const [editMode, setEditMode] = useState(false);
    const [editedText, setEditedText] = useState(todo.text);

    const handleEdit = () => {
        setEditMode(!editMode);
        if (!editMode) {
            setEditedText(todo.text);
        }
    };

    const handleSave = async () => {
        if (editedText.trim() === '') {
            alert('Todo text cannot be empty');
            return;
        }

        // Update the todo in Firestore
        const todoRef = doc(db, 'todos', todo.id);
        await updateDoc(todoRef, { text: editedText });

        setEditMode(false);
    };

    const handleInputChange = (e) => {
        setEditedText(e.target.value);
    };

    return (
        <li className={todo.completed ? style.liComplete : style.li}>
            <div className={style.row}>
                {!editMode ? (
                    <>
                        <input
                            onChange={() => toggleComplete(todo)}
                            type="checkbox"
                            checked={todo.completed}
                        />
                        <p
                            onClick={() => toggleComplete(todo)}
                            className={todo.completed ? style.textComplete : style.text}
                        >
                            {todo.text}
                        </p>
                    </>
                ) : (
                    <>
                        <input
                            type="text"
                            value={editedText}
                            onChange={handleInputChange}
                            className="border p-2 w-full text-xl"
                        />
                    </>
                )}
            </div>
            <div className={style.buttonContainer}>
                {!editMode ? (
                    <button onClick={handleEdit} className={style.button}>
                        <BiEdit size={20} /> 
                    </button>
                ) : (
                    <button onClick={handleSave} className={style.button}>
                        Save
                    </button>
                )}
                <button onClick={() => deleteTodo(todo.id)} className={style.button}>
                    <FaRegTrashAlt size={20} /> 
                </button>
            </div>
        </li>
    );
}

export default Todo;

