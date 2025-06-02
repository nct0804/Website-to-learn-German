import { useState } from 'react'
import { LoginModal } from './LoginModal'

export default function HeaderPanel() {
  const [showModal, setShowModal] = useState(false)
  const [isSignup, setIsSignup] = useState(false)

  return (
    <div className="w-full bg-white rounded-lg p-4 shadow space-y-4">
      <h2 className="text-center text-sm font-semibold text-gray-700">
        Create a profile to save your progress!
      </h2>

      <button
        onClick={() => {
          setIsSignup(true)
          setShowModal(true)
        }}
        className="w-full px-4 py-2 rounded-full bg-yellow-400 text-white font-semibold hover:bg-yellow-500"
      >
        REGISTER
      </button>

      <button
        onClick={() => {
          setIsSignup(false)
          setShowModal(true)
        }}
        className="w-full px-4 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600"
      >
        LOGIN
      </button>

      {showModal && (
        <LoginModal isSignup={isSignup} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}
