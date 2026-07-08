/**
 * services/uploadService.ts
 * Uploads a captured face image (base64) to Firebase Storage.
 * Returns the public download URL.
 */
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { storage } from '../config/firebase'

export async function uploadFaceImage(userId: string, base64Image: string): Promise<string> {
  const imageRef = ref(storage, `faces/${userId}/${Date.now()}.jpg`)
  await uploadString(imageRef, base64Image, 'data_url')
  const url = await getDownloadURL(imageRef)
  return url
}
