"use client"

import { useEffect, useRef, useState } from "react"
import { FaCaretDown, FaCaretUp } from "react-icons/fa6" //✅
import ClickAwayListener from '@mui/material/ClickAwayListener'; //✅
import Button from "./Button";
import Image from "next/image";
import ButtonForInitPage from "./ButtonForInitPage";
<<<<<<< HEAD

export default function Dropdown() {
  const [files, setFiles] = useState<{ name: string; content: string }[]>([]) //✅
  const [isDropdownVisible, setIsDropdownVisible] = useState(false) //✅
  const [content, setContent] = useState("") //content is showing or editing
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showStrategy, setShowStrategy] = useState("Select Strategy") //✅
  const [showContent,setShowContent] = useState(false); //open text area
=======
import Loadable from "next/dist/shared/lib/loadable.shared-runtime";
import { useMinionStore } from "./MinionProfile";
interface inyaface {
  name: string;
  content: string;
  parsePassed: boolean;
  tiedToMinion: string;
  spriteIncrement: string;
  defenseFactor: number
}
interface StrategyBoxprops {
  selectedMinion: String;
  selectedSprite: string;
}
export default function Dropdown({ selectedMinion, selectedSprite }: StrategyBoxprops) {
  const [files, setFiles] = useState<inyaface[]>([]); //✅
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); //✅
  const [content, setContent] = useState(""); //content is showing or editing
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showStrategy, setShowStrategy] = useState("Select Strategy"); //✅
  const [showContent, setShowContent] = useState(false); //open text area
>>>>>>> cee997f63637d5ef18ad0fb675b8ea4364c24a29

  const HandleClickAway = () => { //✅
    setIsDropdownVisible(false);
  }

 const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {  //✅
  const selectedFiles = e.target.files; //select file
  if (!selectedFiles) return;

  Array.from(selectedFiles).forEach((file) => {
    const reader = new FileReader();

<<<<<<< HEAD
    reader.onload = (event) => {
      const newFile = {
        name: file.name,             
        content: event.target?.result as string
      };

      setFiles(prev => [...prev, newFile]);
=======
    Array.from(selectedFiles).forEach((file) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const newFile = {
          name: file.name,
          content: event.target?.result as string,
          parsePassed: false,
          tiedToMinion: "",
          spriteIncrement: "Knight",
          defenseFactor: 0
        };
        setRenderSave("Passed");
        setFiles((prev) => [...prev, newFile]);
      };

      reader.readAsText(file);
    });
  };
  //blahd
  const handleChange = () => {
    if (currentFileSaved || showStrategy === "Select Strategy") {
      handleSave();
      return;
    }
    const foundFile = files.find((file) => file.name === showStrategy);
    if (foundFile) {
      setEditingBypass(true);
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.name === showStrategy
            ? { ...file, content: content, parsePassed: false }
            : file,
        ),
      );
      setParsable(true);
      setRenderSave("Passed");
      setsavedNoDelay(false);
      setTimeout(() => {
        setRenderSave("");
      }, 3000);
    } else {
      handleSave();
    }
  };
  const handleSave = () => {
    setParsable(true);
    if (!content.trim()) return;
    const newFileName = `MyStrategy-${files.length + 1}.txt`;
    const newFile = {
      name: newFileName,
      content: content,
      parsePassed: false,
      tiedToMinion: "",
      spriteIncrement: "Knight",
      defenseFactor: 0

>>>>>>> cee997f63637d5ef18ad0fb675b8ea4364c24a29
    };

<<<<<<< HEAD
    reader.readAsText(file);
  });
}; 



const handleSave = () => {
  if (!content.trim()) return;

  const newFileName = `MyStrategy-${files.length + 1}.txt`;
  const newFile = {
    name: newFileName,
    content: content
=======
    showElementsOfFile(newFile);
    setShowContent(true);
    setContent(newFile.content);
    setRenderSave("Passed");
    setsavedNoDelay(false);
    setTimeout(() => {
      setRenderSave("");
      setSaved(false);
    }, 3000);
  };

  const showElementsOfFile = (file: inyaface) => {
    setContent(file.content);
    setShowStrategy(file.name);
    setIsDropdownVisible(false);
    setPassed(file.parsePassed); // current file has successfully been parsed
    setOwner(file.tiedToMinion);
    // console.log("OWNER:" + owner)
  };

  const handleParse = async () => {
    const foundFile = files.find((file) => file.name === showStrategy);

    if (foundFile) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_LINK}/parse/send`, {
          method: "POST",
          body: foundFile.content,
        });
        if (response.ok) {
          const data = await response.json();
          // console.log("Here is the actual data:", data);
          if (data) {
            // console.log("Parse passed!!!");
            // if((foundFile.tiedToMinion != selectedMinion) || editingBypass ){
            const isFree = foundFile.tiedToMinion === "";
            const isSameFile =
              foundFile.tiedToMinion === selectedMinion.toString();
            const minionAlreadyOwns = files.some(
              (file) =>
                file.tiedToMinion === selectedMinion.toString() &&
                file.name !== showStrategy,
            );

            if (minionAlreadyOwns) {
              setRenderSave("Conflict"); // This minion already owns another strategy
            } else if (isFree || isSameFile || editingBypass) {
              foundFile.tiedToMinion = selectedMinion.toString();
              setOwner(foundFile.tiedToMinion);
              setEditingBypass(false);
              setErr("Passed");
              setRenderSave("");
            }
            
            setTimeout(() => setErr(""), 500);
          } else {
            setErr("Failed");
            setOwner("");
            // console.log("Parse failed");
            // console.log(renderError);
            setTimeout(() => setErr(""), 500);
            // console.log(renderError);
          }
          setPassed(data);
          foundFile.parsePassed = data;
          foundFile.spriteIncrement = useMinionStore.getState().minionName
          foundFile.defenseFactor = useMinionStore.getState().defFactor
          console.log(foundFile)
        }
      } catch (error) {
        console.error("Network error or fetch failed:", error);
      }
    } else {
      // handleSave()
      console.log("Strategy not found. Create a new one!");
    }
>>>>>>> cee997f63637d5ef18ad0fb675b8ea4364c24a29
  };
  setFiles(prev => [...prev, newFile]);
  setShowContent(false);
  setContent("");
};

  return (
    <>
    <div className="absolute top-[120px] left-[0px] w-[100%] h-[15%]">
      <ClickAwayListener onClickAway={HandleClickAway}>
      <div
        onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        className="px-3 py-2 rounded text-2xl h-10 w-full flex items-center justify-between cursor-pointer" style={{backgroundColor:"#C4C4C4", borderColor:"#696969",color:"#696969"}}
        >
        {showStrategy} 
         {isDropdownVisible ? <FaCaretUp className="w-8 h-8" style={{color:"#696969"}}/> : <FaCaretDown className="w-8 h-8" style={{color:"#696969"}}/>}
      </div>
    </ClickAwayListener>
  

      {isDropdownVisible && (
        <div className="z-30 absolute w-full" style={{backgroundColor:"#cacaca"}}>
          {files.map((file, index) => (
  <div
     key={file.name}
     onClick={() => {
      setContent(file.content);
      setShowStrategy(file.name);
      setIsDropdownVisible(false);
    }}
    className="px-3 py-2 text-2xl cursor-pointer
  bg-[#C4C4C4] text-[#696969]
  hover:bg-[#696969] hover:text-white
  transition-colors duration-200"
  >
    {file.name}
  </div>
))}
        </div>
      )}
    </div>

    {showContent ? (
        <div className="absolute top-[242px] left-[0px] w-[100%] h-[71%] border p-4 overflow-y-auto bg-[#696969] whitespace-pre-wrap" style={{color:"#dddddd"}}>
          <textarea
            className="w-full h-full resize-none"
            placeholder="Enter your strategy here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      ) : content && (<div className="z-40 absolute top-[242px] left-[0px] w-[100%] h-[71%] border p-4 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-neutral-300 bg-[#696969] whitespace-pre-wrap" style={{color:"#dddddd"}}>
          {content}
        </div>
    )}

           <label
  htmlFor="dropzone-file"
  onClick={() => fileInputRef.current?.click()}
  className="py-2 pl-3 text-2xl border absolute top-[160px] left-[0px] w-[100%] h-[5%]" style={{backgroundColor:"#fefefe",borderBlockColor:"#696969",color:"#696969"}}
>
  Upload File
</label>

<input
  id="dropzone-file"
  type="file"
  accept=".txt"
  multiple
  className="hidden"
  onChange={handleUpload}
/>

    {/* create new */}
      <div className="py-2 pl-3 text-2xl border absolute top-[205px] left-[0px] w-[100%] h-[5%]" style={{backgroundColor:"#fefefe",borderBlockColor:"#696969",color:"#696969"}}
      onClick={() => {setShowContent(true); setContent(""); }}>
        Create New
        <div className="absolute text-4xl top-[0px] left-[700px]">+</div>
      </div>

      {/* save button */} 
    <ButtonForInitPage src="/grey_btn.PNG" alt="Save" overlayText="Save" onClick={handleSave} bottom="10" left="555" color="purple" font_size="30" height="80" width="200"></ButtonForInitPage>
    {/* <div className="absolute z-50 top-[600px] left-[1000px]">
    <button>
      <Image src="/grey_btn.PNG" alt="Save" width={50} height={50}></Image>
      <p>Save</p>
    </button>
    </div> */}
      </>
  )
}