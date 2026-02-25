"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Slider from "../../components/Slider";

export default function BeforeInitPage() {
    const router = useRouter();
    const [MinionCount, setMinionCount] = useState(1);

    const goNext = () => {
    router.push(`/gameInit?Minions=${MinionCount}`);
    }

    return(<>
            <Slider min={1} max={5} bottom={500} left={100} onChange={(value) => setMinionCount(Number(value))} overlayText="Minions count" borderColor="pink" sliderColor="white"></Slider>
            <button onClick={goNext} className="border-2 border-black bg-white text-black px-4 py-2 rounded-md absolute bottom-125 left-220">Enter</button>
    </>)
}

