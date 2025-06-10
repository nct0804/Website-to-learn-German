import React, { useState, type FormEvent } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';

export default function LoginLeftPanel() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setError(null)
  setLoading(true)
  try {
    await login({ email: username, password })
    navigate(from, { replace: true })
  } catch (err: unknown) {
    setError(err instanceof Error ? err.message : 'Login failed')
  } finally {
    setLoading(false)
  }
}


  return (
    <Card className="w-4/5 max-w-md p-8 bg-white rounded-lg border-none shadow-none">
      <CardContent>
        <h1 className="text-3xl font-bold mb-2">Holla, Welcome Back</h1>
        <p className="text-sm text-muted-foreground mb-6">Hey, welcome back to your special place</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <Label htmlFor="username" className="mb-1">Email</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="stanley@gmail.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="password" className="mb-1">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={remember}
                onCheckedChange={(val: boolean) => setRemember(val)}
              />
              <Label htmlFor="remember" className="text-sm">Remember me</Label>
            </div>
            <Link to="#" className="text-sm text-primary underline">Forgot Password?</Link>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center mt-6 text-sm">
          Don’t have an account? <Link to="/register" className="text-primary underline">Sign Up</Link>
        </p>

        {/* <div className="mt-6 text-xs text-center text-gray-400 italic">
          „Wer fremde Sprachen nicht kennt, weiß nichts von seiner eigenen.“ – Goethe
        </div> */}
      </CardContent>
    </Card>
  );
}
