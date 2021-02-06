import React, { useState } from 'react'
import axios from 'axios'
import { observer, inject } from 'mobx-react'

const UploadFile = (props) => {

    const [selectedFile, setSelectedFile] = useState(null)

    const onFileChange = event => {
        setSelectedFile(event.target.files[0])
    }

    const onFileUpload = async () => {
        if (selectedFile && selectedFile.name.includes('.csv')) {
            const formData = new FormData()
            formData.append(
                "myFile",
                selectedFile,
                selectedFile.name
            )
            await axios.post("/upload", formData)
            props.restaurants.getRestaurants()
        } else {
            alert('make sure you selected a CSV file')
        }
    }

    return (
        <div className='upload'>
            <p>Upload CSV file</p>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>
                Upload
            </button>
        </div>
    );
}

export default inject("restaurants")(observer(UploadFile))