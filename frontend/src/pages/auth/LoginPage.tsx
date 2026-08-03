import AuthLayout from "../../layouts/AuthLayout";
import Logo from "../../components/common/Logo";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function LoginPage() {
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
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <Input
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" />
              Remember Me
            </label>

            <button className="font-medium text-blue-600 hover:text-blue-700">
              Forgot Password?
            </button>
          </div>

          <Button>
            Sign In
          </Button>

          <div className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <button className="font-semibold text-blue-600 hover:text-blue-700">
              Register
            </button>
          </div>
        </div>
      </Card>
    </AuthLayout>
  );
}