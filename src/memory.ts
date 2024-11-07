import { JSONFilePreset } from 'lowdb/node'
import type { AIMessage } from '../types'
import { v4 as uuidv4 } from 'uuid'

export type MessageWithMetadata = AIMessage & {
  id: string
  createdAt: string
}

type Data = {
  messages: MessageWithMetadata[]
}

export const addMetadata = (message: AIMessage) => {
  return {
    ...message,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  }
}

export const removeMetadata = (message: MessageWithMetadata) => {
  const { id, createdAt, ...rest } = message
  return rest
}

const defaultData: Data = {
  messages: [],
}

export const getDb = async () => {
  const db = await JSONFilePreset<Data>('db.json', defaultData)
  return db
}

export const addMessages = async (messages: AIMessage[]) => {
  const db = await getDb()
  db.data.messages.push(...messages.map(addMetadata))
  await db.write()
}

export const getMessages = async (n?: number) => {
  const db = await getDb()
  const messages = db.data.messages.map(removeMetadata)

  if (!n) {
    return messages
  }

  // Get last n messages
  const lastN = messages.slice(-n)

  // Check if first message is assistant with content
  if (
    lastN.length > 0 &&
    (lastN[0].role !== 'assistant' || !lastN[0].content)
  ) {
    // Find first valid assistant message
    const firstValidIndex = messages.findIndex(
      (m) => m.role === 'assistant' && m.content
    )

    if (firstValidIndex >= 0) {
      // Return messages from first valid assistant message
      return messages.slice(firstValidIndex, firstValidIndex + n)
    }
    return []
  }

  return lastN
}

export const saveToolResponse = async (
  toolCallId: string,
  toolResponse: string
) => {
  return addMessages([
    {
      role: 'tool',
      content: toolResponse,
      tool_call_id: toolCallId,
    },
  ])
}
