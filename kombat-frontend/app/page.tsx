import Image from "next/image";

export default function Homepage() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">

      <Image
        src="/homepage_bg.jpeg"
        alt="homepage_bg"
        fill
        priority
        className="object-cover"
      />

    </div>
  );
}