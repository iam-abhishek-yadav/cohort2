import { useState } from "react";

let GlobalId = 1;

function App() {
	const [todos, setTodos] = useState([]);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	const addTodo = () => {
		if (title.trim() === "" || description.trim() === "") {
			alert("Please enter a title and description");
			return;
		}
		const newTodo = {
			title: title,
			description: description,
			id: GlobalId++,
		};
		setTodos([...todos, newTodo]);
		setTitle("");
		setDescription("");
	};

	const removeTodo = (id) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	return (
		<div>
			<input
				type='text'
				placeholder='Todo title'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<br />
			<br />
			<input
				type='text'
				placeholder='Todo description'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<br />
			<br />
			<button onClick={addTodo}>Add todo</button>
			<br />
			<br />
			<div id='todos'>
				{todos.map((todo) => (
					<div key={todo.id}>
						<h3>{todo.title}</h3>
						<p>{todo.description}</p>
						<button onClick={() => removeTodo(todo.id)}>Remove</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
