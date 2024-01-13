import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const storage = new GridFsStorage({
     url:'mongodb+srv://ritikasinghal2101:vu0OHclM76j0traN@whatsapp.9zpftw8.mongodb.net/?retryWrites=true&w=majority',
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpg"];

        if(match.indexOf(file.mimetype) === -1) 
            return`${Date.now()}-blog-${file.originalname}`;

        return {
            bucketName: "fs",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});
const upload=multer({storage});

export default upload;