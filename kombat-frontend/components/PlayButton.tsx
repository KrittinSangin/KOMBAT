import Image from 'next/image';

interface PlayButtonProps {
  src: string;
  alt: string;
  overlayText:String;
}

export default function PlayButton({src,alt,overlayText}:PlayButtonProps){
    return (
    <div className="absolute bottom-80 left-160 h-20 w-60 bg-linear-65 from-purple-500 to-pink-500">
      <Image
        src={src}
        alt={alt} 
        fill
        unoptimized
      />

      <div className="absolute bottom-2 left-15 inset-0 flex w-[100px] h-[300px] group">
        <p className="font-jersey25 text-white text-7xl">
          {overlayText}
        </p>
      </div>
    </div>);
}