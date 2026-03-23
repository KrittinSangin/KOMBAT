interface Props
{
    hidden: boolean
    text: string
}

export default function NoticeWindow({hidden, text}: Props)
{
    return ( !hidden && <div className="absolute top-36 left-1/2 -translate-x-1/2 ">
        <div
            className="bg-yellow-100 w-128 h-16 flex flex-col justify-center items-center drop-shadow-2xl
                    text-2xl"
        >
            {text}
        </div>
    </div>
    )
}