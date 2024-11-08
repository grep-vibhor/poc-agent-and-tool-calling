import OpenAI from 'openai'
import { tools } from "./tools.js"
import { renderNewMessage } from "./dom.js"

export const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
    dangerouslyAllowBrowser: true
})


const messages = [
    {
        role: "system", 
        content: `
Be a helpful AI companion who communicates technical information in an approachable way.
Share what would matter most to everyday users, diving deeper only when asked. 
Instead of giving general answers, use your tools and knowledge to provide detailed, relevant responses based on the specific information at hand.
`
    },
]

async function agent(query) {

    messages.push({ role: "user", content: query })
    renderNewMessage(query, "user")

    const runner = openai.beta.chat.completions.runTools({
        model: "gpt-4-1106-preview",
        messages,
        tools
    }).on("message", (message) => console.log(message))

    const finalContent = await runner.finalContent()
    messages.push({ role: "system", content: finalContent })
    renderNewMessage(finalContent, "assistant")
}

document.getElementById("form").addEventListener("submit", async function (event) {
    event.preventDefault()
    const inputElement = document.getElementById("user-input")
    inputElement.focus()
    const formData = new FormData(event.target)
    const query = formData.get("user-input")
    event.target.reset()
    await agent(query)
})
