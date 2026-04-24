import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../authContext';

export default function Login() {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  // State for form and loading
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error on new attempt
    setLoading(true);

    try {
      // Logic from your second snippet
      const res = await axios.post("https://backend-szu2.onrender.com/login", {
        email: email,
        password: password,
      });

      // Storing credentials
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      // Updating context
      setCurrentUser(res.data.userId);

      // Navigate to dashboard/home
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError("Login Failed! Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo Icon */}
        <div className="w-12 h-12 bg-ink text-paper flex items-center justify-center text-xl font-bold rounded-sm mx-auto mb-4">
          B
        </div>
        <h2 className="text-3xl font-medium tracking-tight text-ink">
          Log in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-ink/10 sm:rounded-sm sm:px-10">

          {/* Error Alert */}
          {error && (
            <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink/80">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-ink/20 rounded-sm shadow-sm placeholder-ink/40 focus:outline-none focus:ring-ink focus:border-ink sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-ink/80">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-ink/20 rounded-sm shadow-sm placeholder-ink/40 focus:outline-none focus:ring-ink focus:border-ink sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium text-paper bg-ink hover:bg-ink/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ink disabled:opacity-70"
              >
                {loading ? "Signing in..." : "Log in"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/signup"
              className="text-sm text-ink/60 hover:text-ink font-medium"
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}