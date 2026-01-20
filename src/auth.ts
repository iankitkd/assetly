import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

import { getUserByEmail } from "@/services/user";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import { loginSchema } from "@/lib/validators";
 
export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  adapter: PrismaAdapter(prisma),
  session: {strategy: "jwt"},
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials);

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const isValid = await verifyPassword(password, user.password);
          if (!isValid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial login only
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      if (trigger === "update" && session?.user?.role) {
        token.role = session.user.role;
      }

      return token;
    },

    async session({ session, token }) {
      // Runs on EVERY request
      if (session.user && token?.id) {
        session.user.id = token.id as string;
        session.user.role = token.role as "USER" | "SELLER" | undefined;
      }
      return session;
    },
  }
})