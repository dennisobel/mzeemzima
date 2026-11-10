import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { getServerSession } from "next-auth";
import { getDemoUser } from "./mockDb";

export const authOptions = {
  // There is no database adapter while the blog runs on mock data, so the
  // session lives in a signed JWT cookie instead of a Session table.
  session: { strategy: "jwt" },
  providers: [
    // Dummy login for the mock-data setup: anyone can sign in as the demo
    // writer, with no password. Remove it once real accounts exist.
    CredentialsProvider({
      id: "demo",
      name: "Demo account",
      credentials: {},
      authorize: async () => getDemoUser(),
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};

export const getAuthSession = () => getServerSession(authOptions);
