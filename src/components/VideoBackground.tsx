import Image from 'next/image';

export default function VideoBackground() {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-50 overflow-hidden pointer-events-none bg-[#111]">
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />
            <Image
                src="/bg-lounge.png"
                fill
                quality={100}
                priority
                className="object-cover object-center w-full h-full opacity-80 scale-100"
                alt="Background"
            />
        </div>
    );
}
