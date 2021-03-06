import NextAuth from "next-auth";
import Providers from "next-auth/providers/facebook";

export default NextAuth({
  session: {
    jwt: true,
  },
  // Configure one or more authentication providers
  providers: [
    Providers({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
});
