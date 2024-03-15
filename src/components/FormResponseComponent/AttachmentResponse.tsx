import React from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
export default function AttachmentResponse() {
    // sample format
    const files = [
        { name: "example1.txt", url: "https://example.com/example1.txt" },
        { name: "example2.txt", url: "https://example.com/example2.txt" },
        { name: "example3.txt", url: "https://example.com/example3.txt" }
    ];
    return (
        <div className="my-8 grid min-h-48 w-full grid-cols-1 gap-4 bg-[#444654] p-4 shadow-md">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quasi doloremque ipsa dicta delectus quaerat praesentium possimus, obcaecati accusamus similique velit maxime ea saepe debitis architecto minus labore soluta voluptate?</p>
            <p>total response 111</p>
            <ul className="my-4 space-y-2 py-2">
                {files.map((file, index) => (
                    <li key={index} className="flex items-center">
                        {/* File icon */}
                        <InsertDriveFileIcon className="mr-2 text-blue-500" />
                        {/* Anchor tag with download attribute */}
                        <a href={file.url} download={file.name} className="text-blue-500 hover:underline">
                            {file.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
