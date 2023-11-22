import { AuthOptions, RequestInternal, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				username: { label: "Username", type: "text" },
				password: { label: "Password", type: "password" },
			},
			authorize: async function (
				credentials: Record<"username" | "password", string> | undefined,
				req: Pick<RequestInternal, "body" | "query" | "headers" | "method">,
			): Promise<User | null> {
				if (!(credentials?.username || credentials?.password)) {
					return null;
				}

				const res = await axios.post(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
					username: credentials.username,
					password: credentials.password,
				});

				return res.data;
			},
		}),
	],
	pages: {
		signIn: "/login",
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		jwt: async ({ token, user }) => {
			user && (token.user = user);
			return token;
		},
		session: async ({ session, token }) => {
			session.user = token.user as User;
			return session;
		},
	},
};

export default authOptions;
