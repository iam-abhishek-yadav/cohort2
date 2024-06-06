import React from "react";
import UserComponent from "./UserComponent";

interface AppProps {
	userId: string;
}

const App: React.FC<AppProps> = ({ userId }) => {
	return (
		<div className='App'>
			<UserComponent userId={userId} />
		</div>
	);
};

export default App;
