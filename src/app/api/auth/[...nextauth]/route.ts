import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connect } from "@/libs/helpers"; // MongoDB connection helper
import User from "@/models/User";
import bcrypt from "bcrypt"; // For secure password validation

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        await connect(); // Connect to MongoDB

        // Find the user by email
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        // Validate the password
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValidPassword) {
          throw new Error("Invalid email or password");
        }

        // Return user details
        return {
          id: user._id,
          name: user.name || "Anonymous",
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    // Sign-in callback
    async signIn({ user, account, profile }: { user: any; account: any; profile?: any }) {
      if (account.provider === "google") {
        await connect(); // Connect to MongoDB

        // Check if the user already exists
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // Create a new user for Google login if not found
          await User.create({
            name: profile?.name, // Get the user's name from Google profile
            email: profile?.email, // Get the user's email
            password: null, // No password for Google users
          });
        }
      }

      return true; // Allow the sign-in
    },
    // Session callback
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user = {
          id: token.sub,
          email: token.email,
          name: token.name,
          userRole: token.userRole,
        };
      }
      return session;
    },
    // JWT callback
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.sub = user.id;
        token.email = user.email;
        token.name = user.name;
        token.userRole = user.userRole;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
