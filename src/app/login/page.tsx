"use client";

export default function LoginPage() {
  const loginWithGitHub = () => {
    // Backend endpoint for GitHub OAuth (no /api/v1 prefix for auth routes)
    window.location.href =
      "/auth/github";
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={loginWithGitHub}
        className="px-6 py-3 bg-black text-white rounded-lg"
      >
        Login with GitHub
      </button>
    </div>
  );
}