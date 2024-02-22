import NextAuth from "next-auth";
import { redirect } from 'next/navigation';

import userData from '@/app/dummy.json';

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import RedditProvider from "next-auth/providers/reddit";
import GitHubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";

// export const authOptions = {

const handler = NextAuth({

  session: {
    strategy: 'jwt',
  },

  // Configure one or more authentication providers
  providers: [

    CredentialsProvider({
    credentials: {
      username: {},
      password: {}
    },
    async authorize(credentials, req) {

      console.log(userData);
      console.log(credentials); 

      const username = credentials.username;
      const password = credentials.password;

      console.log(username);
      console.log(password);

      userData.users.map((user) => {
        if(user.username==username) {
          if(user.password==password) {
            console.log("Found!");
            return {
              id: user.id,
              username: user.username,
            };
          }
        }
      })

      return null;

    }
  }),



    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),

    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET
    }),
  ],
})

// export default NextAuth(authOptions)

export { handler as GET, handler as POST }