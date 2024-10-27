const express = require("express")
const adminRouter = express.Router()
const adminModel = require('../models/admin')
const axios = require("axios")
const logger = require("../utiles/logger")
const { v2  } = require('cloudinary');
const cloudinary = v2
const {cloud_api_key, cloud_api_secrete} = require("../utiles/config")

// cloudinary Configuration

cloudinary.config({
    cloud_name: 'djpjeqz2x',
    api_key: cloud_api_key,
    api_secret: cloud_api_secrete // Click 'View API Keys' above to copy your API secret
});

// Async function to handle Cloudinary upload
const uploadToCloudinary = async (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      folder,
      // transformation: { width: width, height: height, crop: 'fit' } 
    }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }).end(fileBuffer);  // Make sure the file buffer is passed to Cloudinary
  });
};

// Helper function to delete an image from Cloudinary by public_id
const deleteFromCloudinary = async (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
// file reciver endpoint
const path = require('path');
const multer = require('multer');
const fs = require('fs')


const { PassThrough } = require('stream');
const FormData = require('form-data')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Ensure uploads directory exists
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

adminRouter.get("/", async(req, res)=>{
  // const insertData = {
  //   email: "olatunjiJm@modanmic.com",
  //   password: "nsxk644michael123"
  // }
  // const setNewData = new adminModel(insertData)
  // await setNewData.save()

  res.status(200).send({message: "thank you!"})
})

adminRouter.get("/account/:email", async(req, res)=>{

  const email = req.params.email

  const mainUser = await adminModel.findOne({ email })
  console.log(mainUser)

  if (!mainUser?.email) {
    return res.status(500).send({error: "INVALIDE USER EMAIL"})
  }

  return res.status(200).send({account: mainUser})

})

adminRouter.get("/Login/:email/:password", async(req, res)=>{

  const {email, password} = req.params

  const mainUser = await adminModel.findOne({ email })
  console.log(mainUser)

  if (!mainUser?.email) {
    return res.status(500).send({error: "INVALIDE USER EMAIL"})
  }
  else if (mainUser?.password !== password) {
    return res.status(500).send({error: "INVALIDE PASSWORD"})
  }

  return res.status(200).send({account: mainUser})

})

adminRouter.post("/update", upload.fields([{ name: 'updateImg' }]), async(req, res)=>{

  const { email, pageType, updateImgName, productId} = req.body;
  const mainUser = await adminModel.findOne({email: email})
  if (!mainUser?.email) {
    return res.status(500).send({error: "Invalide User Email"})
  }

  if (pageType === "equpmentRental") {
    try {

      const file = req.files;
      // console.log(file[0], req.file)
      // const storeAllFiles = [files.fCoverGDP[0], files.bCoverGDP[0]]

      const singleFile = file.updateImg[0]
      filePathSingleCover = singleFile.path // path.join(__dirname, frontFile.path);
      const fileBufferSingleCover = fs.createReadStream(filePathSingleCover) // filePathFrontCover // fs.createReadStream(filePathFrontCover);
      const singleCover = {
          data: fileBufferSingleCover, // path.join(__dirname, fileBufferFrontCover), // `${frontFile.path}`, // path.join(__dirname, fileBufferFrontCover).replace("/controllers", ""),
          name: singleFile.originalname,
          type: 'application/octet-stream' // frontFile.mimetype,
      }

      // cloudedinery upload informations & set Database
      // productId
      const newEqupmentRental = [...mainUser.equipmentRental]?.map(async (val)=>{

        if (val._id.toString() === productId) {

          // console.log(typeof productId, typeof val._id.toString(), updateImgName)

          // delete old image & get new iamge
          const fileBuffer = await fs.promises.readFile(filePathSingleCover)
          const updateResult = await uploadToCloudinary(fileBuffer, "equpmentRental")

          await deleteFromCloudinary(val.public_id);

          return {
            image_url: updateResult.secure_url,
            image_name: updateImgName,
            public_id: updateResult.public_id
          }

        } else {
          return val
        }
      })
      // const newEqupmentRental = {
      //   image_url: "",
      //   image_name: "",
      // }

      const result = await Promise.all(newEqupmentRental)
      // console.log(result, {})
      // const getResult = mainUser.equipmentRental?.filter(val=>val._id.toString() !== productId)
      // const setResult = [...getResult, result]

      // console.log(newEqupmentRental, result, setResult)

      mainUser.equipmentRental = result
      await mainUser.save()

      fs.unlinkSync(filePathSingleCover)
      return res.status(200).send({message: "update Success-full"})


    } catch (e) {
      console.log(e)
      return res.status(500).send({error: e})
    }
  } else if (pageType === "concreteProduct") {
    try {
      const file = req.files;
      // console.log(file[0], req.file)
      // const storeAllFiles = [files.fCoverGDP[0], files.bCoverGDP[0]]

      const singleFile = file.updateImg[0]
      filePathSingleCover = singleFile.path // path.join(__dirname, frontFile.path);
      const fileBufferSingleCover = fs.createReadStream(filePathSingleCover) // filePathFrontCover // fs.createReadStream(filePathFrontCover);
      const singleCover = {
          data: fileBufferSingleCover, // path.join(__dirname, fileBufferFrontCover), // `${frontFile.path}`, // path.join(__dirname, fileBufferFrontCover).replace("/controllers", ""),
          name: singleFile.originalname,
          type: 'application/octet-stream' // frontFile.mimetype,
      }

      // cloudedinery upload informations & set Database

      const newConcreteProducts = [...mainUser.concreteProducts]?.map(async (val)=>{
        if (val._id.toString() === productId) {
          // delete old image & get new iamge
          const fileBuffer = await fs.promises.readFile(filePathSingleCover)
          const updateResult = await uploadToCloudinary(fileBuffer, "concreteProduct")

          await deleteFromCloudinary(val.public_id);
          return {
            image_url: updateResult.secure_url,
            image_name: updateImgName,
            public_id: updateResult.public_id,
          }

        } else {
          return val
        }
      })

      // const newConcreteProducts = {
      //   image_url: "",
      //   image_name: "",
      // }

      const result = await Promise.all(newConcreteProducts)
      // console.log(result, {})
      // const getResult = mainUser.concreteProducts?.filter(val=>val._id.toString() !== productId)
      // const setResult = [...getResult, result]

      mainUser.concreteProducts = result
      await mainUser.save()

      fs.unlinkSync(filePathSingleCover)
      return res.status(200).send({message: "update Success-full"})

    } catch (e) {
      return res.status(500).send({error: e})
    }
  }else if (pageType === "gallary") {
    try {
      const file = req.files;
      // console.log(file[0], req.file)
      // const storeAllFiles = [files.fCoverGDP[0], files.bCoverGDP[0]]

      const singleFile = file.updateImg[0]
      filePathSingleCover = singleFile.path // path.join(__dirname, frontFile.path);
      const fileBufferSingleCover = fs.createReadStream(filePathSingleCover) // filePathFrontCover // fs.createReadStream(filePathFrontCover);
      const singleCover = {
          data: fileBufferSingleCover, // path.join(__dirname, fileBufferFrontCover), // `${frontFile.path}`, // path.join(__dirname, fileBufferFrontCover).replace("/controllers", ""),
          name: singleFile.originalname,
          type: 'application/octet-stream' // frontFile.mimetype,
      }

      // cloudedinery upload informations & set Database
      const newGallary = [...mainUser.gallary]?.map(async (val)=>{
        if (val._id.toString() === productId) {
          // delete old image & get new iamge
          const fileBuffer = await fs.promises.readFile(filePathSingleCover)
          const updateResult = await uploadToCloudinary(fileBuffer, "gallary")

          await deleteFromCloudinary(val.public_id);
          return {
            image_url: updateResult.secure_url,
            image_name: updateImgName,
            public_id: updateResult.public_id
          }

        } else {
          return val
        }
      })
      // const newGallary = {
      //   image_url: "",
      //   image_name: "",
      // }
      const result = await Promise.all(newGallary)
      // console.log(result, {})
      // const getResult = mainUser.gallary?.filter(val=>val._id.toString() !== productId)
      // const setResult = [...getResult, result]

      mainUser.gallary = result
      await mainUser.save()

      fs.unlinkSync(filePathSingleCover)
      return res.status(200).send({message: "upload Success-full"})

    } catch (e) {
      return res.status(500).send({error: e})
    }
  }else{
    try {
      const file = req.files;
      // console.log(file[0], req.file)
      // const storeAllFiles = [files.fCoverGDP[0], files.bCoverGDP[0]]

      const singleFile = file.updateImg[0]
      filePathSingleCover = singleFile.path // path.join(__dirname, frontFile.path);
      const fileBufferSingleCover = fs.createReadStream(filePathSingleCover) // filePathFrontCover // fs.createReadStream(filePathFrontCover);
      const singleCover = {
          data: fileBufferSingleCover, // path.join(__dirname, fileBufferFrontCover), // `${frontFile.path}`, // path.join(__dirname, fileBufferFrontCover).replace("/controllers", ""),
          name: singleFile.originalname,
          type: 'application/octet-stream' // frontFile.mimetype,
      }
      // salesSupply
      // cloudedinery upload informations & set Database
      const newSalesSupply = [...mainUser.salesSupply]?.map(async (val)=>{
        if (val._id.toString() === productId) {
          // delete old image & get new iamge
          const fileBuffer = await fs.promises.readFile(filePathSingleCover)
          const updateResult = await uploadToCloudinary(fileBuffer, "salesSupply")

          await deleteFromCloudinary(val.public_id);
          return {
            image_url: updateResult.secure_url,
            image_name: updateImgName,
            public_id: updateResult.public_id
          }

        } else {
          return val
        }
      })
      // const newSalesSupply = {
      //   image_url: "",
      //   image_name: "",
      // }
      const result = await Promise.all(newSalesSupply)
      // console.log(result, {})
      // const getResult = mainUser.salesSupply?.filter(val=>val._id.toString() !== productId)
      // const setResult = [...getResult, result]

      mainUser.salesSupply = result
      await mainUser.save()

      fs.unlinkSync(filePathSingleCover)
      return res.status(200).send({message: "upload Success-full"})

    } catch (e) {
      return res.status(500).send({error: e})
    }
  }

})

adminRouter.post("/upload", upload.fields([{ name: 'uploadImg' }]), async(req, res)=>{

  const { email, pageType, uploadImgName} = req.body;
  const mainUser = await adminModel.findOne({email: email})

  console.log(email)

  if (!mainUser?.email) {
    return res.status(500).send({error: "Invalide User Email"})
  }

  if (pageType === "equpmentRental") {
    try {

      const file = req.files;
      // console.log(file[0], req.file)
      // const storeAllFiles = [files.fCoverGDP[0], files.bCoverGDP[0]]

      const singleFile = file.uploadImg[0]
      filePathSingleCover = singleFile.path // path.join(__dirname, frontFile.path);
      const fileBufferSingleCover = fs.createReadStream(filePathSingleCover) // filePathFrontCover // fs.createReadStream(filePathFrontCover);
      const singleCover = {
          data: fileBufferSingleCover, // path.join(__dirname, fileBufferFrontCover), // `${frontFile.path}`, // path.join(__dirname, fileBufferFrontCover).replace("/controllers", ""),
          name: singleFile.originalname,
          type: 'application/octet-stream' // frontFile.mimetype,
      }

      // cloudedinery upload informations & set Database
      // Upload an image
     // const uploadResult = await cloudinary.uploader
     //   .upload(
     //       URL.createObjectURL(singleCover), {
     //           public_id: `equpmentRental/${uploadImgName.replaceAll(" ", "-")}`,
     //       }
     //   )
     //   .catch((error) => {
     //      console.log(error);
     //      return res.status(500).send({error: error})
     //   });
     const fileBuffer = await fs.promises.readFile(filePathSingleCover)

    // console.log(file.uploadImg[0].buffer, file.uploadImg[0], fileBuffer)

    const uploadResult = await uploadToCloudinary(fileBuffer, "equpmentRental")
    // console.log(uploadResult);

    const newEqupmentRental = {
      image_url: uploadResult.secure_url,
      image_name: uploadImgName,
      public_id: uploadResult.public_id,
    }
    // console.log(mainUser)
    // const setEqupmentRental =
    mainUser.equipmentRental = mainUser.equipmentRental? [...mainUser?.equipmentRental, newEqupmentRental] : [newEqupmentRental]
    await mainUser.save()

    fs.unlinkSync(filePathSingleCover)
    return res.status(200).send({message: "upload Success-full"})


    } catch (e) {
      console.log(e)
      return res.status(500).send({error: e})
    }
  } else if (pageType === "concreteProduct") {
    try {
      const file = req.files;
      // console.log(file[0], req.file)
      // const storeAllFiles = [files.fCoverGDP[0], files.bCoverGDP[0]]

      const singleFile = file.uploadImg[0]
      filePathSingleCover = singleFile.path // path.join(__dirname, frontFile.path);
      const fileBufferSingleCover = fs.createReadStream(filePathSingleCover) // filePathFrontCover // fs.createReadStream(filePathFrontCover);
      const singleCover = {
          data: fileBufferSingleCover, // path.join(__dirname, fileBufferFrontCover), // `${frontFile.path}`, // path.join(__dirname, fileBufferFrontCover).replace("/controllers", ""),
          name: singleFile.originalname,
          type: 'application/octet-stream' // frontFile.mimetype,
      }

      // cloudedinery upload informations & set Database
      const fileBuffer = await fs.promises.readFile(filePathSingleCover)
      const uploadResult = await uploadToCloudinary(fileBuffer, "concreteProduct")
      // console.log(uploadResult);

      const newConcreteProducts = {
        image_url: uploadResult.secure_url,
        image_name: uploadImgName,
        public_id: uploadResult.public_id
      }
      mainUser.concreteProducts = mainUser.concreteProducts? [...mainUser.concreteProducts, newConcreteProducts]: [newConcreteProducts]
      await mainUser.save()

      fs.unlinkSync(filePathSingleCover)
      return res.status(200).send({message: "upload Success-full"})

    } catch (e) {
      return res.status(500).send({error: e})
    }
  }else if (pageType === "gallary") {
    try {
      const file = req.files;
      // console.log(file[0], req.file)
      // const storeAllFiles = [files.fCoverGDP[0], files.bCoverGDP[0]]

      const singleFile = file.uploadImg[0]
      filePathSingleCover = singleFile.path // path.join(__dirname, frontFile.path);
      const fileBufferSingleCover = fs.createReadStream(filePathSingleCover) // filePathFrontCover // fs.createReadStream(filePathFrontCover);
      const singleCover = {
          data: fileBufferSingleCover, // path.join(__dirname, fileBufferFrontCover), // `${frontFile.path}`, // path.join(__dirname, fileBufferFrontCover).replace("/controllers", ""),
          name: singleFile.originalname,
          type: 'application/octet-stream' // frontFile.mimetype,
      }

      // cloudedinery upload informations & set Database
      const fileBuffer = await fs.promises.readFile(filePathSingleCover)

      const uploadResult = await uploadToCloudinary(fileBuffer, "gallary")

      const newGallary = {
        image_url: uploadResult.secure_url,
        image_name: uploadImgName,
        public_id: uploadResult.public_id
      }
      mainUser.gallary = mainUser.gallary? [...mainUser.gallary, newGallary] : [newGallary]
      await mainUser.save()

      fs.unlinkSync(filePathSingleCover)
      return res.status(200).send({message: "upload Success-full"})

    } catch (e) {
      return res.status(500).send({error: e})
    }
  }else{
    try {
      const file = req.files;
      // console.log(file[0], req.file)
      // const storeAllFiles = [files.fCoverGDP[0], files.bCoverGDP[0]]

      const singleFile = file.uploadImg[0]
      filePathSingleCover = singleFile.path // path.join(__dirname, frontFile.path);
      const fileBufferSingleCover = fs.createReadStream(filePathSingleCover) // filePathFrontCover // fs.createReadStream(filePathFrontCover);
      const singleCover = {
          data: fileBufferSingleCover, // path.join(__dirname, fileBufferFrontCover), // `${frontFile.path}`, // path.join(__dirname, fileBufferFrontCover).replace("/controllers", ""),
          name: singleFile.originalname,
          type: 'application/octet-stream' // frontFile.mimetype,
      }

      // cloudedinery upload informations & set Database

      // salesSupply
      const fileBuffer = await fs.promises.readFile(filePathSingleCover)

      const uploadResult = await uploadToCloudinary(fileBuffer, "salesSupply")

      const newSalesSupply = {
        image_url: uploadResult.secure_url,
        image_name: uploadImgName,
        public_id: uploadResult.public_id,
      }
      mainUser.salesSupply = mainUser.salesSupply? [...mainUser.salesSupply, newSalesSupply]:[newSalesSupply]
      await mainUser.save()

      fs.unlinkSync(filePathSingleCover)
      return res.status(200).send({message: "upload Success-full"})

    } catch (e) {
      return res.status(500).send({error: e})
    }
  }

})

adminRouter.get("/delete/:email/:pageType/:productId", async(req, res)=>{

  const {email, pageType, productId} = req.params


  const mainUser = await adminModel.findOne({ email })
  // console.log(mainUser)

  if (!mainUser?.email) {
    return res.status(500).send({error: "Invalide User Email"})
  }

  if (pageType === "equpmentRental") {
    try {



      const newEqupmentRental = mainUser.equipmentRental?.map(async (val)=>{

        console.log(val._id.toString()===productId)

        if (val._id.toString() === productId) {
          console.log("goal")
          await deleteFromCloudinary(val.public_id);

          return undefined

        } else {

          return val

        }
      })
      // const newEqupmentRental = {
      //   image_url: "",
      //   image_name: "",
      // }
      const result = await Promise.all(newEqupmentRental)
      // console.log(result.filter(val=>val), newEqupmentRental)

      mainUser.equipmentRental = result.filter(val=>val)
      await mainUser.save()


      return res.status(200).send({message: "delete Success-full"})


    } catch (e) {
      return res.status(400).send({error: e})
    }
  } else if (pageType === "concreteProduct") {
    try {

      // cloudedinery upload informations & set Database

      const newConcreteProducts = mainUser.concreteProducts?.map(async (val)=>{
        if (val._id.toString() === productId) {
          await deleteFromCloudinary(val.public_id);
          return undefined

        } else {
          return val

        }
      })

      const result = await Promise.all(newConcreteProducts)

      mainUser.concreteProducts = result.filter(val=>val)
      await mainUser.save()


      return res.status(200).send({message: "delete Success-full"})

    } catch (e) {
      return res.status(400).send({error: e})
    }
  }else if (pageType === "gallary") {
    try {

      // cloudedinery upload informations & set Database
      const newGallary = mainUser.gallary?.map(async (val)=>{
        if (val._id.toString() === productId) {

          await deleteFromCloudinary(val.public_id);
          return undefined

        } else {
          // delete old image & get new iamge
          return val

        }
      })

      const result = await Promise.all(newGallary)


      mainUser.gallary = result.filter(val=>val)
      await mainUser.save()

      return res.status(200).send({message: "delete Success-full"})

    } catch (e) {
      return res.status(400).send({error: e})
    }
  }else{
    try {

      // salesSupply
      // cloudedinery upload informations & set Database
      const newSalesSupply = mainUser.salesSupply.map(async (val)=>{
        if (val._id.toString() === productId) {
          await deleteFromCloudinary(val.public_id);
          return undefined
        } else {
          // delete old image & get new iamge
          return val

        }
      })
      // const newSalesSupply = {
      //   image_url: "",
      //   image_name: "",
      // }
      const result = await Promise.all(newSalesSupply)

      mainUser.salesSupply = result.filter(val=>val)
      await mainUser.save()

      return res.status(200).send({message: "delete Success-full"})

    } catch (e) {
      return res.status(400).send({error: e})
    }
  }


})

module.exports = adminRouter
