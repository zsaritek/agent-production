# AI Agent: From Prototype to Production

This project is an AI agent built following Scott Moss's guidance on creating AI agents from prototype to production.

## Overview

This AI agent can perform various tasks through specialized tools including:
- Generating movie posters
- Fetching dad jokes
- Retrieving content from Reddit
- And more!

## Features

- Tool-based architecture for extensible functionality
- Image generation capabilities
- Content retrieval from external APIs
- Evaluation framework for testing agent performance

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- An OpenAI API key (for image generation)

### Installation

1. Clone this repository
```bash
git clone https://github.com/yourusername/ai-agents-production.git
cd ai-agents-production
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your API keys
```

## Usage

You can run the agent with:

```bash
npx tsx index.ts "your request here"
```

### Example Commands

```bash
# Generate a movie poster
npx tsx index.ts "create me movie poster for Midnight in Paris"

# Get a dad joke
npx tsx index.ts "Tell me a funny dad joke"

# Find interesting content on Reddit
npx tsx index.ts "find me something interesting on reddit"
```

## Acknowledgements

This project was built following Scott Moss's guidance on AI Agent development, from prototype to production. His approach and insights have been instrumental in creating this tool.

## License

MIT
