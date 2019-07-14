import { createWriteStream } from 'fs'

export function writeScreenShot(data, filename) {
  const stream = createWriteStream(filename)
  stream.write(Buffer.from(data, 'base64'))
  stream.end()
}
