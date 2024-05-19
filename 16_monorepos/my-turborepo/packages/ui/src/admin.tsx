import { ReactNode } from "react";

export const Admin = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<h1>Admin Component</h1>
			{children}
		</div>
	);
};
