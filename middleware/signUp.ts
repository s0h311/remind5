export default defineNuxtRouteMiddleware(async (to, _) => {
  const code = to.query.code

  if (code) {
    return
  }

  const user = useSupabaseUser()

  if (!user.value) {
    return navigateTo('/')
  }
})
