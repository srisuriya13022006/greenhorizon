import openai
import gradio

openai.api_key = "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"


messages = [{"role": "system", "content": "You are a plant expert "}]

def CustomChatGPT(user_input):
    messages.append({"role": "user", "content": user_input})
    response = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages = messages
    )
    ChatGPT_reply = response["choices"][0]["message"]["content"]
    messages.append({"role": "assistant", "content": ChatGPT_reply})
    return ChatGPT_reply

demo = gradio.Interface(fn=CustomChatGPT, inputs = "text", outputs = "text", title = "Plant Expert")

demo.launch(share=True)