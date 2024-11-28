export async function getIamToken(token) {
  const iamToken = await fetch('https://iam.api.cloud.yandex.net/iam/v1/tokens', {
    body: JSON.stringify({
      yandexPassportOauthToken: token,
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await iamToken.json()
  return data
}

export const iamRepository = {
  value: null,
  timer: null,
  async init(token) {
    const ONE_HOUR = 3600 * 1000
    const setIamToken = async () => {
      const { iamToken } = await getIamToken(token)
      iamRepository.value = iamToken
    }
    await setIamToken(token)
    this.timer = setInterval(async () => {
      this.value = await setIamToken(token)
    }, ONE_HOUR)
  },
  destroy() {
    this.timer && clearInterval(this.timer)
  },
}

export async function getTextCompletion(token, text) {
  const response = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'x-folder-id': process.env.FOLDER_ID,
    },
    body: JSON.stringify({
      modelUri: `gpt://${process.env.FOLDER_ID}/yandexgpt/latest`,
      completionOptions: {
        stream: false,
        temperature: 1,
        maxTokens: '8000',
      },
      messages: [
        {
          role: 'system',
          text: `Ты помощник составления тепловой карты. На вход тебе подается заказ, а тебе нужно составить массив с возможными рисками при выполнении этого заказа
    и их весами. Пришли в виде JSON объекта в формате { [ { "name": "Риск какой то там", "values": [1, 0, 0, 0, 0] } ] }, где 1 - низкий риск, а 5 - высокий риск 
    на конечный продукт. выставляй цифры в порядке вероятности в массиве, где 0 позиция - это маловероятно, а 4 - очень вероятно.
     В ответ выводи только массив объектов. `,
        },
        {
          role: 'user',
          text,
        },
      ],
    }),
  })
  const result = await response.json()
  return result
}
