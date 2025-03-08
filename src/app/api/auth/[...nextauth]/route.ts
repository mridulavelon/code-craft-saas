import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import Github from "next-auth/providers/github";
import axios from "axios";
import connectToDatabase from "@/lib/mongo";
import user from "@/lib/models/user";

export const authOptions : NextAuthOptions = {
  debug:true,
  session: {
    strategy: 'jwt'
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret:process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Github({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize (credentials:any) {
        try{
          const requestUrl=`http://localhost:3000/api/users/login`;
          const requestPayload = {
            "email":credentials.email,
            "password":credentials.password  
          }
         const loginCall:any = await axios.post(requestUrl,requestPayload)
         if(loginCall?.data?.success){
           return loginCall.data.response;
         }else{
          throw new Error("Invalid credentials");
         } 
        }catch(error){
          throw new Error("Invalid credentials");
        }
     }
    }),
  ],
  callbacks: {
    async signIn({ account, profile }:any) {
      if (account?.provider === "github" || account?.provider === "google") {
          await connectToDatabase();
          const existingUser = await user.findOne({ email: profile?.email });
          if (!existingUser) {
              await user.create({
                  name: account?.provider === "github" ? profile?.login : profile?.name,
                  email: profile?.email, 
                  provider: account?.provider,
                  image: account?.provider === "github" ? profile?.avatar_url : profile?.picture             
              })
          }
      }
          return true;
        },
    async jwt({token,user}) {
      if(user){
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
     if(token){
        session.user = {
            email:token.email,
            name:token.name,
            image:token.picture
        }
     }
      return session;
    }, 
  }
};

export const handler:any = NextAuth(authOptions) as never;

export { handler as GET, handler as POST };