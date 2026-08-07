import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import Logo from "../../components/common/Logo";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { login } from "../../api/auth";
import { useAuthStore } from "../../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();

  const loginStore = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (): Promise<void> => {
    try {
      setLoading(true);

      const response = await login({
        email,
        password,
      });

      if (response.success) {
        loginStore(response.user);

        navigate("/dashboard");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card className="max-w-md">
        <Logo />

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-slate-800">
            Welcome Back
          </h2>

          <p className="mt-2 text-slate-500">
            Sign in to continue to AgriVision AI
          </p>
        </div>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" />
              Remember Me
            </label>

            <button
              type="button"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Forgot Password?
            </button>
          </div>

          <Button
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <div className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Register
            </Link>
          </div>
        </div>
      </Card>
    </AuthLayout>
  );
}