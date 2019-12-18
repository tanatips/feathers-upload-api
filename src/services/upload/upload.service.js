// Initializes the `upload` service on path `/upload`
const multer = require('multer');
const { Upload } = require('./upload.class');
const hooks = require('./upload.hooks');
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, 'public/uploads'), // where the files are being stored
  filename: (_req, file, cb) => cb(null, `${file.originalname}`) // getting the file name
});
const upload = multer({
  storage,
  limits: {
    fieldSize: 1e+16, // Max field value size in bytes
    fileSize: 1e+16 //  The max file size in bytes
  }
});
module.exports = function (app) {
  const options = {
    paginate: app.get('paginate'),
    multi: true
  };
  app.use('/upload',upload.array('filename'),(req,_res,next)=>{
    const {method}=req;
    if(method ==='POST' || method ==='PATCH'){
      req.feathers.files = req.files;
      console.log(req.files);
      _res.send({message:"Upload Completed"});
    }
  },new Upload(options,app));
  
  const service = app.service('upload');

  service.hooks(hooks);
};
