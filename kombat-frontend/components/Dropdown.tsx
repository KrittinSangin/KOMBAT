import { FaCaretDown } from "react-icons/fa6";

const Dropdown= () => {
    return(
        <>
    <div className="w-[50%] h-[10%] flex justify-center pt-10 z-10 absolute top-[200px] left-[100px] bg-black">
    <div className="z-10 border border-neutral-100 px-3 py-2 rounded h-8 w-60 flexitems-center text-neutral-100 shadow-xl justify-between">
        SelectDropdown <FaCaretDown/></div>
    </div>
      </>
    )
}

export default Dropdown;

