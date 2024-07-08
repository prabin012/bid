

// export const fileUploads = upload.single('image');


export const store = multer({
    storage:diskStorage(
        {
            destination:function(req, file, cb)
            {
                cb(null, 'public/upload')
            },
            filename:function(req, file, cb)
            {
                cb(null, file.filename+ Date.now())
            }
        }
    )
})