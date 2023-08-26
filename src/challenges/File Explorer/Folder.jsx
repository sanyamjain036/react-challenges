import React, { useState } from 'react'

const Folder = ({ explorer }) => {
    const [expand, setExpand] = useState(false);
    if (explorer.isFolder) {
        return (
            <div className='flex flex-col'>
                <span className="cursor-pointer" onClick={() => { setExpand(prev => !prev) }}>  { expand===true?"📂" :"📁"} {explorer.name}</span>
                {expand === true ? <div className='ml-4'>
                    {
                        explorer.nodes.map(node => {
                            return (<Folder explorer={node} />)
                        })
                    }
                </div> : null}
            </div>
        )
    }
    else {
        return (
            <div className='flex flex-col cursor-pointer'>
                <span> 📃 {explorer.name}</span>
            </div>
        )
    }
}

export default Folder