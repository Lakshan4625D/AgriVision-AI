import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Logo from "../../components/common/Logo";

import { register } from "../../api/auth";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      const response = await register({
        full_name: fullName,
        email,
        password,
        role_id: 4,
      });

      if (response.success) {
        alert("Registration Successful");

        navigate("/login");
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

          <h2 className="text-3xl font-bold">
            Create Account
          </h2>

          <p className="mt-2 text-slate-500">
            Join AgriVision AI
          </p>

        </div>

        <div className="mt-8 space-y-5">

          <div>

            <label className="mb-2 block">
              Full Name
            </label>

            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />

          </div>

          <div>

            <label className="mb-2 block">
              Email
            </label>

            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />

          </div>

          <div>

            <label className="mb-2 block">
              Password
            </label>

            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />

          </div>

          <Button
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </Button>

          <div className="text-center text-sm">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-blue-600"
            >
              Login
            </Link>

          </div>

        </div>

      </Card>
    </AuthLayout>
  );
}