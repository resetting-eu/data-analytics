import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserFromDb, getUserByEmail } from "@/lib/db/user/getuser"


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
      strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (credentials === null) return null;
                
                try {
                    const user = getUserByEmail(credentials?.email as string);
                    //console.log('User fetched: ', user);
                    //console.log('CRedetials: ', credentials)
                    if (user) {
                        const isMatch = user?.password === credentials.password;

                        if (isMatch) {
                            return user;
                        } else {
                            throw new Error("Email or Password is not correct");
                        }
                    } else {
                        throw new Error("User not found");
                    }
                } catch (error) {
                    throw new Error(error as string);  // <<< change this !!!
                }
            },
        }),
    ],
});