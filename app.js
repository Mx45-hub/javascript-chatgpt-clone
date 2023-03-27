// do NOT deploy this API key or upload onto GitHub. If you do it could be visible to others and stolen for their own use.
const APIKey = {your_api_key}
const inputElement = document.querySelector('input')
const submitIcon = document.querySelector('#submit')
const outPutElement = document.querySelector('#output')
const historyElement = document.querySelector('.history')
const buttonElement = document.querySelector('button')

const changeInput = (value) => {
    console.log('clicked')
    const inputElement = document.querySelector('input')
    inputElement.value = value
}


async function getMessage() {
  try {
    const options = {
        method: 'POST',
        headers: {
            // notice how we're using process.env here
            // this is using the environment variable from the .env file
            'Authorization': `Bearer ${APIKey}`,
            'Content-Type': 'application/json',
        },
        // construct the request payload
        // sending an external request to the OpenAI API
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{role: "user", content: inputElement.value}],
            // the maximum number of tokens/words the bot should return
            // in response to a given prompt
            max_tokens: 100,
        })
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', options);
    const data = await response.json()
    console.log(data)
    outPutElement.textContent = data.choices[0].message.content
    if (data.choices[0].message.content) {
        const pElement = document.createElement('a')
        pElement.textContent = inputElement.value
        pElement.addEventListener('click', () => changeInput(pElement.textContent))
        historyElement.append(pElement)
    }
  } catch (error) {
    console.error(error)
  }
}

submitIcon.addEventListener('click', getMessage)

const clearInput = () => {
    inputElement.value = ''
}

buttonElement.addEventListener('click', clearInput)
