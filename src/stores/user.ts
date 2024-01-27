import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../router'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

interface ErrorCode extends Error {
  code: string
}

export interface User {
  email?: string | null
  password?: string | null
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const login = async (details: User) => {
    const { email, password } = details
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password)
        user.value = auth.currentUser
        router.push('/profile')
      } catch (err) {
        switch ((err as ErrorCode).code) {
          case 'auth/user-not-found':
            alert('user not found')
            break
          case 'auth/wrong-password':
            alert('Wrong Password')
            break
          default:
            alert('something went wrong')
        }
      }
    }
  }
  const register = async (details: User) => {
    console.log(details, details.password)
    const { email, password } = details
    if (email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password)
        user.value = auth.currentUser
        router.push('/profile')
      } catch (err) {
        switch ((err as ErrorCode).code) {
          case 'auth/email-already-in-use':
            alert('email already in use')
            break
          case 'auth/invalid-email':
            alert('invald email')
            break
          case 'auth/operation-not-allowed':
            alert('Operation not allowed')
            break
          case 'auth/weak-password':
            alert('weak password')
            break
          default:
            alert('something went wrong')
        }
      }
    }
  }

  const logout = async () => {
    await signOut(auth)
    router.push('/register')
  }

  const fetchUser = () => {
    auth.onAuthStateChanged(async (value) => {
      if (value === null) {
        user.value = null
      } else {
        user.value = value
        const pm = router.isReady()
        let cond
        pm.then(() => true)
        if (cond && router.currentRoute.value.path === '/register') {
          router.push('/profile')
        }
      }
    })
  }

  return { user, login, register, logout, fetchUser }
})
