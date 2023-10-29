import React, { useEffect, useState } from 'react';
import MyAPI, { Item } from './MyAPI';
import { toast } from 'react-toastify';

function UploadProfile() {
  const [username, setUsername] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    let user = Item.getItem('username');
    setUsername(user);
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file.', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('sendimage', file);

    try {
      const response = await MyAPI.post('/dummy.php', formData);
      const { data } = response;

      if (data.status) {
        toast.success(data.message, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      } else {
        toast.error(data.message, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('An error occurred while uploading the file.', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  return (
    <div>
      <div class="mb-3 d-flex">
        <input type="file" className='form-control form-control-sm' name="sendimage" onChange={handleFileChange} />
        <button className='btn btn-primary button' onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

export default UploadProfile;
