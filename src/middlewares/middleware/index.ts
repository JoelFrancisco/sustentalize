import multer from 'multer';

const handleUpload = multer({ dest: '../../images' });

export { handleUpload };