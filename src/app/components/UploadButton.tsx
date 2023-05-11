'use client';
import { ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';


const UploadButton = () => {
  const router = useRouter();

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        sessionStorage.setItem('uploadedImage', base64Image);
        router.push('/rotate');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleUpload}
      style={{ display: 'block' }}
    />
  );
};

export default UploadButton;