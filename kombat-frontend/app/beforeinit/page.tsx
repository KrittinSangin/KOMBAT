"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Slider from "../../components/Slider";

export default function BeforeInitPage() {
  const router = useRouter();

  const sliderRange = {
    minionCount: { min: 1, max: 5 }
  };

  const [config, setConfig] = useState({
    minionCount: sliderRange.minionCount.max
  });

  let left = 100;
  let borderColor = "grey";
  let sliderColor = "white";

  const handleMinionCountChange = (value: number) => {
    setConfig(prev => ({
      ...prev,
      minionCount: value
    }));
  };

  const goNext = () => {
    router.push(`/gameInit?minion=${config.minionCount}`);
  };

  return (
    <>
      <Slider
        min={1}
        max={5}
        bottom={500}
        left={left}
        overlayText="Each Minions Per Team"
        borderColor={borderColor}
        sliderColor={sliderColor}
        value={config.minionCount}
        setState={handleMinionCountChange}
      />

      <button
        onClick={goNext}
        className="border-2 border-black bg-white text-black px-4 py-2 rounded-md absolute bottom-125 left-220"
      >
        Enter
      </button>
    </>
  );
}