import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faApple, faGoogle } from '@fortawesome/free-brands-svg-icons'

interface LoginModalProps {
  onClose: () => void
  isSignup: boolean
}

export function LoginModal({ onClose, isSignup }: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(isSignup ? 'signup' : 'login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted:', { email, password, mode })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <Card className="relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <X size={24} />
        </button>

        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {mode === 'signup' ? 'Create your account' : 'Welcome back'}
          </CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button variant="outline" className="w-full cursor-pointer">
                <FontAwesomeIcon icon={faApple} size='2x' />Login with Apple
              </Button>
              <Button variant="outline" className="w-full cursor-pointer">
                <FontAwesomeIcon icon={faGoogle} size='2x' /> Login with Google
              </Button>
            </div>

            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-card text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full cursor-pointer">
                {mode === 'signup' ? 'Sign Up' : 'Login'}
              </Button>
            </div>

            <div className="text-center text-sm">
              {mode === 'signup' ? (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="underline underline-offset-4 text-blue-500 cursor-pointer"
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  Don’t have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="underline underline-offset-4 text-blue-500 cursor-pointer"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </form>
        </CardContent>

        <div className="text-muted-foreground text-center text-xs mb-4 px-4">
          By clicking continue, you agree to our{' '}
          <a href="#" className="underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          .
        </div>
      </Card>
    </div>
  )
}
