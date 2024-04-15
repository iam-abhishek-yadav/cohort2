import "./App.css";
import Todo from "./components/Todo";

function App() {
	return (
		<>
			<Todo
				todo={{ title: "title", description: "description", done: false }}
			/>
		</>
	);
}

export default App;
