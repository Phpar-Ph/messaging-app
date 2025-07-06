import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Link } from "react-router";

const SignUp = () => {
  const { signup, isSignUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="w-full max-w-md bg-base-200 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-5 flex flex-col items-center"
        >
          {/* Username */}
          <div className="w-full">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                type="text"
                required
                placeholder="Username"
                className="grow bg-transparent outline-none"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                title="Only letters, numbers or dash"
                minLength={3}
                maxLength={30}
                pattern="^[\w-]+$"
              />
            </label>
            <p className="validator-hint hidden text-xs text-error mt-1">
              Must be 3 to 30 characters, only letters, numbers or dash
            </p>
          </div>
          {/* email input */}
          <div className="w-full">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                placeholder="mail@site.com"
                required
                className="grow bg-transparent outline-none"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </label>
            <div className="validator-hint hidden text-xs text-error mt-1">
              Enter valid email address
            </div>
          </div>
          {/* password */}
          <div className="w-full">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                className="grow bg-transparent outline-none"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-base-content/70 hover:text-base-content"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </label>
            <p className="validator-hint hidden text-xs text-error mt-1">
              Must be more than 8 characters, including
              <br />
              At least one number <br />
              At least one lowercase letter <br />
              At least one uppercase letter
            </p>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSignUp}
          >
            {isSignUp ? (
              <>
                <Loader className="size-5 animate-spin mr-2" />
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        {/* already have an account link */}
        <div className="mt-6 text-center">
          <span className="text-sm text-base-content/70">
            Already have an account?{" "}
          </span>
          <Link
            to="/login"
            className="text-primary font-medium hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
