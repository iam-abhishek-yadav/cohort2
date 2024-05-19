import { Button } from "@repo/ui/button";
import { Admin } from "@repo/ui/admin";

export default function App(): JSX.Element {
	return (
		<div>
			<Button
				appName='web'
				className={""}>
				Click me!
			</Button>
			<Admin>Hi there from admin</Admin>;
		</div>
	);
}
