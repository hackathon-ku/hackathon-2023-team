import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import AuthProvider from "@/provider/auth-provider";
import { MantineProvider } from "@mantine/core";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const prompt = Prompt({
	subsets: ["latin"],
	weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
	title: "Chomrom KU",
	description: "รวมทุกข่าวสารชมรมและกิจกรรมในรั้วมหาวิทยาลัยเกษตรศาสตร์ไว้ในที่เดียว",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={prompt.className}>
				<Navbar />
				<AuthProvider>
					<MantineProvider>
						<main className="min-h-[calc(100dvh-10rem)]">{children}</main>
					</MantineProvider>
				</AuthProvider>
				<Footer />
			</body>
		</html>
	);
}
