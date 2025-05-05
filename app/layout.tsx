import { get } from "http";
import "./globals.css";
import { getLocale } from "next-intl/server";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale()

	return (
		<html lang={locale}>
			<body>
				{children}
			</body>
		</html>
	);
}
