import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import OktaProvider from "next-auth/providers/okta"

const options = {
  providers: [
    OktaProvider({
      clientId: 'process.env.OKTA_CLIENT_ID',
      clientSecret: 'process.env.OKTA_CLIENT_SECRET',
      issuer: process.env.OKTA_ISSUER
    }),
  ]
}

const authHandler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)

export default authHandler