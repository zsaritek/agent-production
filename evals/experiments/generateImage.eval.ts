import 'dotenv/config'
import { runEval } from '../evalTools'
import { runLLM } from '../../src/llm'
import { generateImageToolDefinition } from '../../src/tools/generateImage'
import { ToolCallMatch } from '../scorers'

const createToolCallMessage = (toolName: string) => ({
  role: 'assistant',
  tool_calls: [
    {
      type: 'function',
      function: {
        name: toolName,
      },
    },
  ],
})

runEval('generateImage', {
  task: (input) =>
    runLLM({
      messages: [{ role: 'user', content: input }],
      tools: [generateImageToolDefinition],
    }),
  data: [
    {
      input: 'Generate an image of a sunset',
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
    {
      input: 'take a photo of the sunset',
      expected: createToolCallMessage(generateImageToolDefinition.name),
    },
  ],
  scorers: [ToolCallMatch],
})
