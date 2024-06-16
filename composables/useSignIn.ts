export default function useSignIn(): {
  withGoogle: () => Promise<void>
} {
  const supabase = useSupabaseClient()

  async function withGoogle(): Promise<void> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://remind5.vercel.app',
      },
    })

    if (error) {
      console.error(error)
    }
  }

  return { withGoogle }
}
