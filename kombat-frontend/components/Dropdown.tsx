"use client"

import { useEffect, useRef, useState } from "react"
import { FaCaretDown, FaCaretUp } from "react-icons/fa6"
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Button from "./Button";


export default function Dropdown() {
  const [files, setFiles] = useState<
  { name: string; content: string }[]>([])
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [content, setContent] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showStrategy, setShowStrategy] = useState("Select Strategy")
  const [showEditor, setShowEditor] = useState(false)
  const [editorContent, setEditorContent] = useState("")
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const openFile = (file: File) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      setContent(e.target?.result as string)
    }

    reader.readAsText(file)
  }

  const HandleClickAway = () => {
    setIsDropdownVisible(false);
  }

 const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const selectedFiles = e.target.files;
  if (!selectedFiles) return;

  Array.from(selectedFiles).forEach((file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const newFile = {
        name: file.name,              // 👈 ใช้ชื่อไฟล์จริง
        content: event.target?.result as string
      };

      setFiles(prev => [...prev, newFile]);
    };

    reader.readAsText(file);
  });
}; 



const handleSave = () => {
  if (!editorContent.trim()) return;

  const newFile = {
    name: `MyStrategy-${Date.now()}.txt`,
    content: editorContent
  };

  setFiles(prev => [...prev, newFile]);

  setContent(newFile.content);
  setShowStrategy(newFile.name);

  setEditorContent("");
  setShowEditor(false);
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
    className="px-3 py-2 text-2xl cursor-pointer"
    style={{ backgroundColor:"#C4C4C4", color:"#696969" }}
  >
    {file.name}
  </div>
))}
        </div>
      )}
    </div>

    {content && (
        <div className="absolute top-[242px] left-[0px] w-[100%] h-[71%] border p-4 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-neutral-300 bg-[#696969] whitespace-pre-wrap" style={{color:"#dddddd"}}>
          {content}
        </div>
      )}
    <div>

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

    </div>

    {/* create new */}
      <div className="py-2 pl-3 text-2xl border absolute top-[201px] left-[0px] w-[100%] h-[5%]" style={{backgroundColor:"#fefefe",borderBlockColor:"#696969",color:"#696969"}}
      onClick={() => setShowEditor(true)}>
        Create New
        <div className="absolute text-4xl top-[0px] left-[700px]">+</div>
      </div>

      {showEditor && (
        <div className="absolute top-[242px] left-[0px] w-[100%] h-[71%] border p-4 overflow-y-auto bg-[#696969] whitespace-pre-wrap" style={{color:"#dddddd"}}>
          <textarea
            className="w-full h-full resize-none"
            placeholder="Enter your strategy here..."
            value={editorContent}
            onChange={(e) => setEditorContent(e.target.value)}
          />
        </div>
      )}

      {/* save button */}
  
    <Button src="/grey_btn.PNG" alt="Save" overlayText="" onClick={handleSave} bottom="0" left="716" color="purple" font_size="20" height="80" width="100"></Button>
     <Button src="/grey_btn.PNG" alt="Compile" overlayText=""  bottom="100" left="705" color="purple" font_size="20" height="80" width="150"></Button>
      <Button src="/grey_btn.PNG" alt="Edit" overlayText="" bottom="200" left="716" color="purple" font_size="20" height="80" width="100" ></Button>
      <div className="absolute text-black text-2xl flex flex-col gap-17 left-[742px] top-[500px] py-20">
        <h1>Edit</h1>
        <h1>Compile</h1>
        <h1>Save</h1>
      </div>
      </>
  )
}