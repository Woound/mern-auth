import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import axios from 'axios'

const OAuth = () => {
  const dispatch = useDispatch()
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)

      const newUser = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      }
      await axios
        .post('/api/auth/google', newUser)
        .then((data) => {
          dispatch(signInSuccess(data))
        })
        .catch((error) => {
          console.log('Error occured with creating new user with google', error)
        })
    } catch (error) {
      console.log('Could not login with google', error)
    }
  }
  return (
    <button
      type='button'
      onClick={handleGoogleClick}
      className=' bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95'
    >
      Continue with google
    </button>
  )
}

export default OAuth
