import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import DiscordProvider from "next-auth/providers/discord"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "err",
      clientSecret: process.env.GITHUB_SECRET || "err",
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)