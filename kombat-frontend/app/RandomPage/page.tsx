"use client"

import Loader from "../../components/Loader"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function RandomPage() {
  const router = useRouter();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push('/Preview');
    }, 4000);
    return () => clearTimeout(timeoutId);
  }, [router]);

  return(<>
    <div>
        <Loader/>
    </div>
    <h1 className="flex items-center justify-center min-h-screen mt-25 text-4xl">Randomizing...</h1>
    <div>
    </div>        
  </>)
}