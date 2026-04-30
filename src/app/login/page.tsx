// "use client";

// /**
//  * Login page using GitHub OAuth
//  * Backend handles authentication + JWT cookies
//  */
// export default function LoginPage() {
//   const loginWithGitHub = () => {
//     // Redirect to backend OAuth flow
//     window.location.href =
//       "http://localhost:5000/api/v1/auth/github/callback";
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <button
//         onClick={loginWithGitHub}
//         className="px-6 py-3 bg-black text-white rounded-lg"
//       >
//         Login with GitHub
//       </button>
//     </div>
//   );
// }

























// "use client";

// /**
//  * Login page using GitHub OAuth
//  */
// export default function LoginPage() {
//   const loginWithGitHub = () => {
//     // STEP 1: Redirect to GitHub OAuth (NOT backend callback)
//     window.location.href =
//       "https://github.com/login/oauth/authorize?client_id=YOUR_GITHUB_CLIENT_ID";
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <button
//         onClick={loginWithGitHub}
//         className="px-6 py-3 bg-blue-900 text-white cursor-pointer rounded-lg"
//       >
//         Login with GitHub
//       </button>
//     </div>
//   );
// }






























//  WORKING LOGIN PAGE - REDIRECTS TO GITHUB OAUTH


// "use client";

// /**
//  * Login page using GitHub OAuth
//  */
// export default function LoginPage() {
//   const loginWithGitHub = () => {
//     // STEP 1: Redirect to GitHub OAuth (NOT backend callback)
//     const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;

//     window.location.href =
//       `https://github.com/login/oauth/authorize?client_id=${clientId}`;
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <button
//         onClick={loginWithGitHub}
//         className="px-6 py-3 bg-blue-900 text-white cursor-pointer rounded-lg"
//       >
//         Login with GitHub
//       </button>
//     </div>
//   );
// }


















































// WORKING LOGIN PAGE - REDIRECTS TO GITHUB OAUTH

// "use client";

// import { useState } from "react";

// export default function LoginPage() {
//   const [loading, setLoading] = useState(false);

//   const loginWithGitHub = () => {
//     setLoading(true);

//     const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;

//     window.location.href =
//       `https://github.com/login/oauth/authorize?client_id=${clientId}`;
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <button
//         onClick={loginWithGitHub}
//         className="px-6 py-3 bg-blue-900 text-white rounded-lg"
//       >
//         {loading ? "Redirecting..." : "Login with GitHub"}
//       </button>
//     </div>
//   );
// }














































// "use client";

// export default function LoginPage() {
//   const login = () => {
//     window.location.href =
//       "http://localhost:5000/api/v1/auth/github/start";
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded shadow w-full max-w-sm text-center">
//         <h1 className="text-xl font-bold mb-4">Welcome Back</h1>

//         <button
//           onClick={login}
//           className="bg-black text-white px-4 py-2 rounded w-full"
//         >
//           Login with GitHub
//         </button>
//       </div>
//     </div>
//   );
// }








































// "use client";

// export default function LoginPage() {
//   const login = () => {
//     window.location.href =
//       "http://localhost:5000/api/v1/auth/github/start";
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded shadow w-full max-w-sm text-center">
//         <h1 className="text-xl font-bold mb-4">Welcome Back</h1>

//         <button
//           onClick={login}
//           className="bg-black text-white px-4 py-2 rounded w-full"
//         >
//           Login with GitHub
//         </button>
//       </div>
//     </div>
//   );
// }





































"use client";

export default function LoginPage() {
  const loginWithGitHub = () => {
    // Backend endpoint for GitHub OAuth (no /api/v1 prefix for auth routes)
    window.location.href =
      "http://localhost:5000/auth/github";
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