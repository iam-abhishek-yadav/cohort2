interface TodoType {
	title: string;
	description: string;
	done: boolean;
}

export default function Todo({ todo }: { todo: TodoType }): JSX.Element {
	return (
		<div>
			<h1>{todo.title}</h1>
			<h2>{todo.description}</h2>
			<h3>{todo.done}</h3>
		</div>
	);
}
