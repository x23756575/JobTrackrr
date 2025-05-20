import React, { useRef, useState, useEffect } from 'react';
import { useDropzone, type DropzoneRef } from 'react-dropzone';

interface FileWithPath extends File {
    path?: string;
}

interface fileDesc {
    file: File | null;
    jobDesc: string;
}

export default function Dropzone(): React.ReactElement {
    const dropzoneRef = useRef<DropzoneRef>(null);

    const [form, setForm] = useState<fileDesc>({
        file: null,
        jobDesc: '',
    });

    const openDialog = (): void => {
        if (dropzoneRef.current) {
            dropzoneRef.current.open();
        }
    };

    const onDrop = (acceptedFiles: File[]) => {
        // Take first file only for now
        setForm((prev) => ({
            ...prev,
            file: acceptedFiles[0] || null,
        }));
    };

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        onDrop,
        accept: {
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'application/pdf': ['.pdf'],
        },
    });

    const handleJobDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            jobDesc: e.target.value,
        }));
    };

    const submitDropzone = async () => {
        if (!form.file) {
            alert('Please select a file first');
            return;
        }

        // Example upload with FormData
        const data = new FormData();
        data.append('file', form.file);
        data.append('jobDesc', form.jobDesc);

        try {
            const response = await fetch('http://localhost:8080/compareresume', {
                method: 'POST',
                body: data,
            });
            if (response.ok) {
                alert('Upload successful');
            } else {
                alert('Upload failed');
            }
        } catch (error) {
            alert('Error uploading file');
        }
    };

    return (
        <>
        <div className="container p-4 border-4 border-dotted border-gray-900">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p className="text-gray-400">Drag 'n' drop some files here</p>
                <button type="button" onClick={openDialog} className="text-gray-400">
                    Open File Dialog
                </button>
            </div>



            <aside className="mt-4">
                <h4>Selected File</h4>
                <ul>
                    {form.file ? (
                        <li key={form.file.name} className="text-gray-400">
                            {form.file.name}
                        </li>
                    ) : (
                        <li className="text-gray-400">No file selected</li>
                    )}
                </ul>
            </aside>


        </div>
        <input
            type="text"
            placeholder="Job Description"
            value={form.jobDesc}
            onChange={handleJobDescChange}
            className="text-black mt-4 p-2 border border-gray-300 rounded w-full"
        />
            <button
                onClick={submitDropzone}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
            >
                Submit
            </button>
        </>
    );
}
