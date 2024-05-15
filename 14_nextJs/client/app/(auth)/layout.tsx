export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<div className='p-4 border-b'>SignIn now to get 20% off</div>
			{children}
		</div>
	);
}
