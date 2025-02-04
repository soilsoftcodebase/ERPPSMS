import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../lib/auth";
import {
  Lock,
  Mail,
  AlertCircle,
  Loader2,
  UserCog,
  Users,
  UserCheck,
  Calculator,
  ShieldCheck,
  Globe,
  HelpCircle,
  Moon,
  Sun,
} from "lucide-react";
import PSMSLogo from "../assets/PSMSlogo.png";
import LSMSbg from "../assets/LSMSbg.jpg";
import LoginBg from "../assets/1445.jpg";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState("English");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError("");
      setIsLoading(true);
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { role: "Worker", email: "worker@example.com", icon: Users },
    { role: "Supervisor", email: "supervisor@example.com", icon: UserCheck },
    { role: "Factory Manager", email: "manager@example.com", icon: UserCog },
    { role: "Accountant", email: "accountant@example.com", icon: Calculator },
    { role: "Admin", email: "admin@example.com", icon: ShieldCheck },
  ];

  const handleDemoLogin = (email: string) => {
    setValue("email", email);
    setValue("password", "password");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // Add actual dark mode implementation here
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? "bg-gray-900" : ""
      }`}
    >
      {/* Top Navigation */}
      <nav className="absolute top-0 right-0 p-4 flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm shadow-sm">
          <Globe className="w-4 h-4 text-gray-600" />
          <select
            className="text-sm bg-transparent border-none focus:ring-0"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Español</option>
            <option>Filipino</option>
          </select>
        </div>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-white/90 shadow-sm  hover:bg-gray-50"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-gray-600" />
          ) : (
            <Moon className="w-4 h-4 text-gray-600" />
          )}
        </button>
        <button className="p-2 rounded-full bg-white/90 shadow-sm hover:bg-gray-50">
          <HelpCircle className="w-4 h-4 text-gray-600" />
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Section - Background and Logo */}
        <div
          className="relative w-full md:w-1/2 min-h-[300px] md:min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-blue-500 to-purple-600"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${LoginBg})`,
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        >
          <div className="text-center">
            <img
              src={PSMSLogo}
              alt="PSMS Logo"
              className="w-[300px] md:w-[450px] mx-auto mb-8"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Welcome to PSMS
            </h1>
            <p className="text-lg text-gray-200 max-w-md mx-auto">
              People Supplier Management System
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-white">
                <h3 className="font-semibold mb-1">24/7 Support</h3>
                <p className="text-sm">Round-the-clock assistance</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg text-white">
                <h3 className="font-semibold mb-1">Secure Access</h3>
                <p className="text-sm">Enterprise-grade security</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
                Sign in to your account
              </h2>

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-700">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  {error}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register("email")}
                      type="email"
                      className="block w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register("password")}
                      type="password"
                      className="block w-full pl-10 px-3 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your password"
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>

              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Demo Accounts
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-4">
                  {demoAccounts.map((account) => {
                    const Icon = account.icon;
                    return (
                      <button
                        key={account.email}
                        onClick={() => handleDemoLogin(account.email)}
                        className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all hover:scale-[1.05] group"
                      >
                        <div className="p-3 bg-white rounded-lg shadow-sm mb-2">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="font-medium text-gray-900 text-sm">
                          {account.role}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-sm text-gray-500">
              All demo accounts use "password" as the password
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
