import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useLocation } from "react-router-dom";
import LoginBg from "../assets/1445.jpg";
import PSMSlogo from "../assets/PSMSlogo2.jpg";
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
  Building2,
  ArrowRight,
} from "lucide-react";

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
    {
      role: "Worker",
      email: "worker@example.com",
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      role: "Supervisor",
      email: "supervisor@example.com",
      icon: UserCheck,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      role: "Factory Manager",
      email: "manager@example.com",
      icon: UserCog,
      color: "from-purple-500 to-purple-600",
    },
    {
      role: "Accountant",
      email: "accountant@example.com",
      icon: Calculator,
      color: "from-amber-500 to-amber-600",
    },
    {
      role: "Admin",
      email: "admin@example.com",
      icon: ShieldCheck,
      color: "from-red-500 to-red-600",
    },
  ];

  const handleDemoLogin = (email: string) => {
    setValue("email", email);
    setValue("password", "password");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Top Navigation */}
      <nav className="absolute top-0 right-0 p-6 flex items-center gap-4 z-10">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg">
          <Globe className="w-4 h-4 text-gray-600" />
          <select
            className="text-sm bg-transparent border-none focus:ring-0 text-gray-600"
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
          className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-gray-600" />
          ) : (
            <Moon className="w-4 h-4 text-gray-600" />
          )}
        </button>
        <button className="p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all">
          <HelpCircle className="w-4 h-4 text-gray-600" />
        </button>
      </nav>

      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Section - Hero Area */}
        <div
          className="relative lg:w-[60%] p-8 lg:p-20 flex flex-col justify-center"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(10, 80, 138, 0.8), rgba(30, 70, 138, 0.9)), url('${LoginBg}')`,
            backgroundSize: "cover",
            backgroundPosition: "left",
            // ('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070')
          }}
        >
          <img
            src={PSMSlogo}
            alt="PSMS Logo"
            className="w-[300px] md:w-[300px] mb-32  rounded-xl"
          />
          {/* Animated Shapes */}
          {/* <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
          </div> */}

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-3 mb-8"></div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              People Supplier Management System
            </h2>

            <p className="text-xl text-blue-100 mb-12">
              Streamline your workforce management with our comprehensive
              solution for personnel and supplier coordination.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Workforce Management
                </h3>
                <p className="text-blue-100">
                  Efficiently manage your entire workforce from a single
                  dashboard
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Enterprise Security
                </h3>
                <p className="text-blue-100">
                  Bank-grade security with role-based access control
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="lg:w-[40%] flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome back
              </h2>
              <p className="text-gray-600 mb-8">
                Please enter your credentials to continue
              </p>

              {error && (
                <div className="mb-6 bg-red-50 border border-red-100 rounded-xl p-4 flex items-center text-red-700">
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
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register("email")}
                      type="email"
                      className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      {...register("password")}
                      type="password"
                      className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <div className="flex items-center">
                      Sign in
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
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
                        className="group relative flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600 transition-all duration-300"
                      >
                        <div className="p-3 bg-white rounded-lg shadow-sm mb-2 group-hover:bg-blue-400 transition-all">
                          <Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                        </div>
                        <p className="font-medium text-gray-900 text-sm group-hover:text-white transition-colors">
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
