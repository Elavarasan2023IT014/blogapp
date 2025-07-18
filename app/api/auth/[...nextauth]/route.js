import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

const handeler =  NextAuth({
  providers: [
    GitHubProvider({
        clientId : process.env.GITHUB_ID,
        clientSecret : process.env.GITHUB_SECRET,
    })
  ]
})

export {handeler as POST , handeler as GET}