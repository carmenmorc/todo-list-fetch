import React, { useState, useEffect } from "react";
import {
    createUser,
    deleteUser,
    readUser,
    readUserList,
    createUserTodo,
    updateTodo,
    deleteTodo
} from '../../services/api';

//create your first component
const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    const fetchUserTodos = async () => {
        try {
            const userTodos = await readUser('usuario1');
            setTodos(userTodos);  
        } catch (error) {
            console.error('Error fetching user todos:', error);
            setTodos([]); 
        }
    };

    const handleDeleteTodo = async (todoId) => {
        try {
            await deleteTodo(todoId);
            setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== todoId));
        } catch (error) {
            console.error('Error deleting to-do:', error);
        }
    };

    useEffect(() => {
        fetchUserTodos();
    }, []);

    console.log(todos);

    return (
        <div className="container">
            <h1>THINGS TO DO TODAY !</h1>
            <ul>
                <li>
                    <input
                        type="text"
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        onKeyDown={async (e) => { 
                            if (e.key === "Enter") { 
                                await createUserTodo('usuario1', inputValue, false);
                                await fetchUserTodos();
                                setInputValue("");
                            }
                        }}
                        placeholder="What do you need to do?"
                    ></input>
                </li>
                {todos.map((todo, index) => (
                    <li key={index}>{todo.label}
                         <button onClick={() => handleDeleteTodo(todo.id)}>✖️</button>
                    </li>
                ))}
            </ul>
            <div>{todos.length} tasks left</div>
        </div>
    );
};

export default Home;