import React, { useState } from 'react'
import { fileExplorerData } from './data'
import Folder from './Folder';

const FileExplorer = () => {
    const [explorer,setExplorer]=useState(fileExplorerData);
  return (
    <div>
        <Folder explorer={explorer}/>
    </div>
  )
}

export default FileExplorer