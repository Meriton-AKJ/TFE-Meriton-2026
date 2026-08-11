import multer from 'multer'
import { cloudinary } from '../config/cloudinary.js'

// Le fichier est stocké en mémoire (pas sur le disque)
export const upload = multer({ storage: multer.memoryStorage() })

// Envoie le fichier sur Cloudinary et retourne l'URL
export function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'meriton-hotel' },
      (error, result) => {
        if (error) reject(error)
        else resolve(result.secure_url)
      }
    )
    stream.end(buffer)
  })
}
