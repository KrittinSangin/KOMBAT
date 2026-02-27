"use client"

import { useEffect, useRef, useState } from "react"
import { FaCaretDown, FaCaretUp } from "react-icons/fa6"
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Button from "./Button";


export default function Dropdown() {
  const [files, setFiles] = useState<File[]>([])
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const [content, setContent] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showStrategy, setShowStrategy] = useState("Select Strategy")
  const [showEditor, setShowEditor] = useState(false)
  const [editorContent, setEditorContent] = useState("")
  const [editingIndex, setEditingIndex] = useState<number | null>(null);


  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || [])

    const txtFiles = selected.filter(file =>
      file.name.endsWith(".txt")
    )

    setFiles(prev => [...prev, ...txtFiles])
  }

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

  const HandleEdit = async (index: number) => {
  const text = await files[index].text();
  setEditorContent(text);
  setEditingIndex(index);
  setShowEditor(true);
}

  const handleSave = () => {
  if (!editorContent.trim()) return;

  const newFile = new File(
  [editorContent],
  `MyStrategy-${Date.now()}.txt`,
  { type: "text/plain" }
);

  setFiles(prev => [...prev, newFile]);
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
          {files.map((file,index)=>(
            <div
              key={index}>
                <div
              onClick={() => {openFile(file); setShowStrategy(file.name); setIsDropdownVisible(false)}}
              className="px-3 py-2 text-2xl cursor-pointer" style={{backgroundColor:"#C4C4C4", color:"#696969"}}>
                {file.name}
              </div>
              </div>
          ))}
        </div>
      )}
    </div>

    {content && (
        <div className="absolute top-[242px] left-[0px] w-[100%] h-[71%] border p-4 overflow-y-auto bg-black whitespace-pre-wrap" style={{color:"#dddddd"}}>
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
      </div>

      {showEditor && (
        <div className="absolute top-[242px] left-[0px] w-[100%] h-[71%] border p-4 overflow-y-auto bg-black whitespace-pre-wrap" style={{color:"#dddddd"}}>
          <textarea
            className="w-full h-full resize-none"
            placeholder="Enter your strategy here..."
            value={editorContent}
            onChange={(e) => setEditorContent(e.target.value)}
          />
        </div>
      )}

      {/* save button */}
  
    <Button src="" alt="Save" overlayText="Save" onClick={handleSave} bottom="0" left="734" color="purple" font_size="20" height="80" width="100"></Button>
     <Button src="" alt="Compile" overlayText="Compile"  bottom="100" left="734" color="purple" font_size="20" height="80" width="100"></Button>
      <Button src="" alt="Edit" overlayText="Edit" bottom="500" left="734" color="purple" font_size="20" height="80" width="100" ></Button>
      </>
  )
}