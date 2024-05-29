import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const SignIn = () => {
  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault()
  //   const res = await fetch('/api/auth/signup', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //   const data = await res.json()
  // }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    dispatch(signInStart())
    axios
      .post('/api/auth/signin', formData)
      .then((result) => {
        dispatch(signInSuccess(result))
        navigate('/')
      })
      .catch((error) => {
        dispatch(signInFailure(error))
      })
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className=' text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleFormSubmit} className=' flex flex-col gap-4'>
        <input
          type='email'
          placeholder='Email'
          id='email'
          className=' bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className=' bg-slate-100 p-3 rounded-lg'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign in'}
        </button>
      </form>
      <div className=' flex gap-2 mt-5'>
        <p>
          Don&apos;t have an account?{' '}
          <Link to='/sign-up'>
            <span className=' text-blue-500'>Sign Up</span>
          </Link>
        </p>
      </div>
      <p className=' text-red-700 mt-5'>
        {error ? error.response.data.error || 'Something went wrong.' : ''}
      </p>
    </div>
  )
}

export default SignIn
