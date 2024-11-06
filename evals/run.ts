import 'dotenv/config'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const main = async () => {
  const evalName = process.argv[2]

  if (!evalName) {
    console.error('Please provide an eval name')
    process.exit(1)
  }

  try {
    const evalPath = join(__dirname, 'experiments', `${evalName}.eval.ts`)
    await import(evalPath)
  } catch (error) {
    console.error(`Failed to load eval '${evalName}':`, error)
    process.exit(1)
  }
}

main()
