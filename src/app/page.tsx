// import { redirect } from "next/navigation";

// /**
//  * Home page redirects to dashboard
//  * Protected by middleware/backend auth checks
//  */
// export default function Home() {
//   redirect("/dashboard");
// }
// //             Deploy Now
// //           </a>
// //           <a
// //             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
// //             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             Documentation
// //           </a>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }






































"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Root route redirects user based on auth state
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Simple redirect to login (backend will validate auth later)
    router.push("/login");
  }, [router]);

  return null;
}