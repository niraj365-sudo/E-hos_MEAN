const router = require('express').Router();
const passport = require('passport');
const multer = require('../handlers/multer');
const Report = require('../models/Report');
const path = require('path')
// const cloudinary = require('../handlers/cloudinary');

const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_ID,
  api_secret: process.env.API_SECRET
})


router.post(
  '/upload_reports',
  passport.authenticate('jwt', { session: false }),
  multer.single('image'),
  async (req, res) => {
    try {
      const { title } = req.body;

      if (!title) {
        return res.status(400).json({ error: 'Please provide a title' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'Please select an image file' });
      }
      const result = await cloudinary.uploader.upload(req.file.path);
      const report = new Report({
        title,
        imageUrl: result.secure_url,
        patientId: req.user._id
      });

      await report.save();

      res.status(200).json({ message: 'Report uploaded successfully', report });
    } catch (error) {
      console.error('Failed to upload report:', error);
      res.status(500).json({ error: 'Failed to upload report' });
    }
  }
)

router.get('/view_reports', passport.authenticate('jwt', {session:false}) ,async (req, res)=>{
  const images = await Report.find({
    patientid: req.user_id
  })

  res.json({
    message:"Success listing report",
    images: images,
    user: req.user
  })
})


module.exports = router;
