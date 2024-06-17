type WithGoogleConfig = { redirectPath?: string }

export default function useSignIn(): {
  withGoogle: (config: WithGoogleConfig) => Promise<void>
} {
  const supabase = useSupabaseClient()

  async function withGoogle({ redirectPath }: WithGoogleConfig): Promise<void> {
    let redirectTo =
      process.env.NODE_ENV === 'development' ? 'http://localhost:3000/dashboard' : 'https://remind5.com/dashboard'

    if (redirectPath !== undefined) {
      redirectTo += redirectPath
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    })

    if (error) {
      console.error(error)
    }
  }

  return { withGoogle }
}
