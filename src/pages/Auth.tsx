
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        if (!username) {
          setError('Username is required');
          setLoading(false);
          return;
        }
        const { error } = await signUp(email, password, username);
        if (error) {
          setError(error.message);
        } else {
          navigate('/');
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-darker-bg text-foreground font-mono dark flex items-center justify-center">
      {/* Retro grid overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                 linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
               `,
               backgroundSize: '20px 20px'
             }}>
        </div>
      </div>
      
      {/* Ambient glow effects */}
      <div className="fixed top-10 left-10 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-10 right-10 w-96 h-96 bg-neon-magenta/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md p-8 bg-card/30 border border-neon-cyan/30 rounded-lg backdrop-blur-sm">
        <div className="text-center mb-8">
          <h1 className="font-retro font-bold text-2xl neon-text mb-2">
            {isSignUp ? 'Join RetroComm' : 'Enter the Matrix'}
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            {isSignUp ? 'Create your retro-future account' : 'Access your encrypted terminal'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-retro text-neon-cyan mb-2">
                Username
              </label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={cn(
                  "bg-darker-bg border-neon-cyan/30 text-foreground font-mono",
                  "focus:border-neon-cyan focus:retro-glow"
                )}
                placeholder="Enter your handle..."
                required
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-retro text-neon-cyan mb-2">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "bg-darker-bg border-neon-cyan/30 text-foreground font-mono",
                "focus:border-neon-cyan focus:retro-glow"
              )}
              placeholder="Enter your email..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-retro text-neon-cyan mb-2">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                "bg-darker-bg border-neon-cyan/30 text-foreground font-mono",
                "focus:border-neon-cyan focus:retro-glow"
              )}
              placeholder="Enter your password..."
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm font-mono bg-red-400/10 p-2 rounded border border-red-400/30">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full font-retro font-bold bg-neon-cyan text-darker-bg",
              "hover:bg-neon-cyan/80 hover:retro-glow transition-all duration-200"
            )}
          >
            {loading ? 'PROCESSING...' : (isSignUp ? 'CREATE ACCOUNT' : 'LOGIN')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-neon-magenta hover:text-neon-cyan font-mono text-sm transition-colors"
          >
            {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}
