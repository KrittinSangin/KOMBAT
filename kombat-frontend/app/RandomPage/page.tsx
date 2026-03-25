"use client"

import Loader from "../../components/Loader"
import { useRouter } from "next/navigation";

export default function RandomPage() {
  const router = useRouter();

  const moveToPreviewPage = () => {
        router.push("/Preview");
  };

  return(<>
      <button onClick={moveToPreviewPage}
          className="border-2 border-black bg-pink text-black px-4 py-2 rounded-md">Preview
    </button>
    <div>
        <Loader/>
    </div>
    <h1 className="flex items-center justify-center min-h-screen mt-25 text-4xl">Random...</h1>
    <div>
    </div>        
  </>)
}