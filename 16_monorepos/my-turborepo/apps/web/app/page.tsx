import styles from "./page.module.css";
import { Button } from "@repo/ui/button";
import { Admin } from "@repo/ui/admin";

export default function Page(): JSX.Element {
	return (
		<div>
			<Button
				appName='web'
				className={styles.button}>
				Click me!
			</Button>
			<Admin>Hi there from admin</Admin>;
		</div>
	);
}
