import React, {useRef, useState} from 'react';
import './App.css';

type BoxType = {
  id: number;
  corX: number;
  corY: number;
  bottom: number;
}

const Block = ({corX, corY, bottom}: BoxType) => {
  return <div 
      style={{
        "--corX": `${corX}px`,
        "--corY": `${corY}px`,
        "--bottom": `${bottom}px`
      } as {}} 
      className="block"
    >
    </div>
}


function App() {
  const page = useRef(null);
  const [blocks, setBlocks] = useState<BoxType[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setBlocks((prev) => {
      let bottomHeight = prev.filter((item) => {
        return  50 > Math.abs(e.clientX - item.corX);
      })
      const blockStyle = {
        id: Date.now(),
        corX: e.clientX,
        corY: e.clientY,
        bottom: document.documentElement.clientHeight - (52 * bottomHeight.length) - 52,
      }
      return [
        ...prev,
        blockStyle
      ]
    });
  }

  return (
    <div ref={page} onClick={ handleClick} style={{height: "100vh", width: "100vw", position: "relative"}}>
      {!!blocks.length && blocks.map((item) => {
        return <Block {...item} key={item.id}/>
      })}
    </div>
  );
}

export default App;
