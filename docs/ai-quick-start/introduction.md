I just wrote this in response to an ELI5 question so I thought I would post it here if it helps others:

Some advice for getting started. Try Google Gemini CLI as it has very generous free limits. This should give you a good experience for what it is like to use the SOTA agents. For paid, Claude Code is the best in my experience. If you want to go free and don't mind using an agent from (China - Alibaba), I have found the qwen-code CLI to be quite good and it is adapted from the Google Gemini CLI. I have yet to run into any limits using qwen and I am building pretty big projects.

The older school path (just 1-year ago) is to download aider.chat as it is also free (US-based). Configure it to use OpenRouter free models so you can get a taste of how this works. This model `qwen/qwen3-coder:free` will probably give you the best experience of the free models available and it should be hosted in the US on OpenRouter.

I left off IDE style agents like Cursor (very good) because it only has a 1-week free trial.

For the best experience, I need to feel like I do not need to hold back and be concerned with accumulating costs (I have run close to $300 in a single day when work is paying for it); otherwise, I hold back and do not get the most benefit from using an agent. Try to go really free if possible so you do not hold back. Make it do almost everything.

Here is the ELI5 part:

Agents are able to look through your code when you first initialize them, creating a CLAUDE.md file or GEMINI.md file hopefully standardizing on AGENT.md file eventually. This file gives the LLM context about your project so it kind of knows where to look for code relevant to your request (prompt).

Your prompt should be constructed in a way to give the agent hints about files to look in using @<file path>. I also provide line numbers or function names in large code bases so it does not get confused. A vertical slice architecture is best for limiting the scope of what the LLM needs to understand.

There are three actors involved in prompting: system, assistant, and user.

The system is typically a markdown file that gives the LLM general instructions about what role to assume, "expert software engineer" for example, and other general instructions and how to respond. This file usually changes only when you want the LLM to wear a different hat.

The system prompt is often sent every time you send a request (prompt) along with the conversation history (context) in the form of messages. The messages read like a chat conversation with the assistant responding to the user's prompt. The message history is sent to the LLM on each request as they are stateless and this is what is referred to as "context".

Context does fill up after a while and at about half way used the results start to get a little flaky. I keep the context smaller by keeping the requested work small then I `/clear` when I move on to the next task.

You have probably heard of MCP servers by now and these are tools that the agent has available to it by adding them to your environment. The list of tool functions available in an MCP server is often sent along with the system prompt as a json list with function parameters and really good descriptions of the server's purpose, what the function does, and what its parameters are for. Think of this as SEO for an API/MCP. If you have competing MCP servers installed in your environment, how does the LLM choose which one to use? That is where really good descriptions come in. To be sure, I usually tell it "Use the blah MCP server to do x".

MCP servers are much less mysterious than they seem on the surface. They are just a detailed json description for remote procedure call functions as described above. They can call APIs (acting basically as a proxy to an API in a way that an LLM can understand). Or, they are simply descriptions of functions the server exposes to an LLM. Like an API they can get data from a database and/or perform logic operations to return an answer.

Those are the basics. I hope this helps.