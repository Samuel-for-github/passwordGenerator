import { useState, useCallback, useEffect, useRef } from "react"
function App() {

const [length, setLength] = useState(8);
const [numAllow, setNumAllow] = useState(false);
const [charAllow, setCharAllow] = useState(false);
const [password, setPassword] = useState("")

const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllow) {
      str += "1234567890"
    }
    else if(charAllow){
      str += "!@#$%^&*(){}:,./?~|"
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random()* str.length + 1);
      pass += str.charAt(char) 
    }
   
    setPassword(pass)


  }, [length, numAllow, charAllow, setPassword])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 15)
    window.navigator.clipboard.writeText(password)
  }, [password])

useEffect(()=>{
  passwordGenerator()
}, [length, numAllow, charAllow, setPassword])

  return (
    <>
  
  <div className="flex justify-center mt-7">
  <div className="flex w-full items-center space-x-2 md:w-1/3">
  <input
   className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
    type="text"
    placeholder="Password"
    value={password}
    readOnly
    ref={passwordRef}
  />
  <button
    type="button"
    onClick={copyPasswordToClipboard}
   className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
  >
    Copy
  </button>
</div>
  </div>
  <div className="flex justify-center">
      <input type="range" min={8} max={50} value={length} className="cursor-pointer mx-3" onChange={(e)=>{
        setLength(e.target.value)
      }}/>
      <label>Length: {length}</label>
      <input type="checkbox" defaultChecked={numAllow} id="numInput" className="mx-3" onChange={()=>{
        setNumAllow((prevValue)=> !prevValue)
      }} />
      <label htmlFor="numInput">Numbers</label>
      <input type="checkbox" defaultChecked={charAllow} id="charInput" className="mx-3" onChange={()=>{
        setCharAllow((prevValue)=> !prevValue)
      }} />
      <label htmlFor="charInput">Characters</label>
    </div>

    
    </>
  )
}

export default App
