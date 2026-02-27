"use client"

import { useEffect, useState } from "react"
import { FaCaretDown, FaCaretUp } from "react-icons/fa6"
import ClickAwayListener from '@mui/material/ClickAwayListener';



interface DropdownProps {
  options: string[]
}

const Dropdown = ({ options }: DropdownProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [strategySelected, setStrategySelected] = useState("Select File")
  const [isStrategySelected, setIsStrategySelected] = useState(false)
  const [showStrategy, setShowStrategy] = useState(strategySelected)

  const HandleClickAway = () => {
    setIsDropdownVisible(false);
  }

  const SelectStrategy = (option: string) => {
    setStrategySelected(option);
    setIsStrategySelected(true);
    setIsDropdownVisible(false);
  }

  useEffect(() => {
    setIsStrategySelected(true);
    setShowStrategy(strategySelected);
  }, [strategySelected])

  return (
    <div className="absolute top-[120px] left-[0px] w-[100%] h-[15%]">
      <ClickAwayListener onClickAway={HandleClickAway}>
      <div
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        className="px-3 py-2 rounded text-2xl h-10 w-full flex items-center justify-between cursor-pointer" style={{backgroundColor:"#C4C4C4", color:"#696969"}}
      >
        {showStrategy} 
         {isDropdownVisible ? <FaCaretUp className="w-8 h-8" style={{color:"#696969"}}/> : <FaCaretDown className="w-8 h-8" style={{color:"#696969"}}/>}
      </div>
    </ClickAwayListener>
  

      {isDropdownVisible && (
        <div className="absolute w-full" style={{backgroundColor:"#cacaca"}}>
          {options.map((option) => (
            <div
              key={option}
              onClick={() => SelectStrategy(option)}
              className="border px-3 py-2 cursor-pointer hover:bg-neutral-200 text-[#696969] border-[#b1b1ab]"
            >
              {option}
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default Dropdown