// Initializes the `watermark` service on path `/watermark`
const { Watermark } = require('./watermark.class');
const hooks = require('./watermark.hooks');
const path = require('path');
const fs = require('fs');
module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/watermark',(req,_res,next)=>{
    var filename=req.query["filename"];
    if(Watermark.checkExtension(filename,"Photo"))
    {
      var sourcePath=path.join(__dirname,'../../../public/uploads/'+filename);
      var logoPath =path.join(__dirname,'../../../images/logo/logo.jpg');
      var watermarkPath =path.join(__dirname,"../../../images/watermark/water_"+filename);
      console.log(sourcePath);
      console.log(logoPath);
      console.log(watermarkPath);
      if(!fs.existsSync(sourcePath))
      {
        console.log("Path not found :"+sourcePath);
        _res.send({message:"Path not found :"+sourcePath});
      }
      if(!fs.existsSync(logoPath))
      {
        console.log("Path not found :"+logoPath);
        _res.send({message:"Path not found :"+logoPath});
      }
      if(fs.existsSync(sourcePath) && fs.existsSync(logoPath))
      {
       Watermark.genWatermark(sourcePath,
        logoPath,
        watermarkPath)
        ;
        _res.send({message:"Watermark Completed"});
       }
    }
   
    else {
      console.log("File extension is not valid");
      _res.send({message:"File extension is not valid"});
    }

  }, new Watermark(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('watermark');

  service.hooks(hooks);
};
