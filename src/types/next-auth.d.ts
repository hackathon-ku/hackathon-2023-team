import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
	interface User {
		id: number;
		stdId: string;
		titleTh: string;
		titleEn: string;
		firstNameTh: string;
		lastNameTh: string;
		firstNameEn: string;
		lastNameEn: string;
		campusNameTh: string;
		campusNameEn: string;
	}

	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session extends DefaultSession {
		user: User;
	}
}
