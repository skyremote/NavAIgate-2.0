async function signUp(email, password) {
  throw new Error("Supabase client not initialized");
}
async function signUpWithOAuth(provider) {
  throw new Error("Supabase client not initialized");
}
async function signIn(email, password) {
  throw new Error("Supabase client not initialized");
}
async function signOut() {
  throw new Error("Supabase client not initialized");
}
async function getUser() {
  throw new Error("Supabase client not initialized");
}
function onAuthStateChange(callback) {
  throw new Error("Supabase client not initialized");
}

export { getUser, onAuthStateChange, signIn, signOut, signUp, signUpWithOAuth };
