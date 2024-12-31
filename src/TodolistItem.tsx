import {Tasks} from "./App.tsx";
import {Button} from "./Button.tsx";

type TodolistItemPropsType = {
    title: string;
    tasks: Tasks[];
};

export const TodolistItem = ({title, tasks}: TodolistItemPropsType) => {

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {tasks.length
                ? <ul>
                    {tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                            </li>
                        )
                    })}
                </ul>
                : <span>Tasks list is empty</span>}
            <div>
                <Button title='All'/>
                <Button title='Active'/>
                <Button title='Complete'/>
            </div>
        </div>
    );
};