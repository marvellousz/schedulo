import NextAuth from "next-auth";
import { authConfig } from "./auth-config";

// Export the auth helper functions
export const { 
  handlers, 
  signIn, 
  signOut, 
  auth 
} = NextAuth(authConfig);