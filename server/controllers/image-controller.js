import grid from 'gridfs-stream';
import mongoose from 'mongoose';

const url = 'http://localhost:8000';

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});

export const uploadImage = (request, response) => {
    try {
        if (!request.file) {
            return response.status(404).json({ error: "File not found" });
        }

        const imageUrl = `${url}/file/${request.file.filename}`;
        response.status(200).json({ imageUrl });
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
};

export const getImage = async (request, response) => {
    try {
        const file = await gfs.files.findOne({ filename: request.params.filename });

        if (!file) {
            return response.status(404).json({ error: "File not found" });
        }

        const readStream = gridfsBucket.openDownloadStream(file._id);

        readStream.on('error', (error) => {
            console.error(error);
            response.status(500).json({ error: "Error reading file stream" });
        });

        readStream.pipe(response);
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Internal Server Error" });
    }
};
