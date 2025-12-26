export const uploadSingle = (req, res) => {
    try{
        if (!req.file) {
          return res.status(400).json({ message: "No file uploaded" });
        }
      
        res.status(200).json({
          message: "File uploaded successfully",
          file: {
            url: req.file.path,       // Cloudinary URL
            public_id: req.file.filename,
            format: req.file.format,
            size: req.file.size,
          },
        });
    }
    catch(err){
        res.status(500).json({
            err : "Internal server error",
            message : err.message
        })
    }
};

export const uploadMultiple = (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No files uploaded"
      });
    }

    const uploadedFiles = req.files.map(file => ({
      url: file.path,          // Cloudinary URL
      public_id: file.filename,
      format: file.format,
      size: file.size
    }));

    return res.status(200).json({
      message: "Files uploaded successfully",
      files: uploadedFiles
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return res.status(500).json({
      error: error.message || "Something went wrong"
    });
  }
};
