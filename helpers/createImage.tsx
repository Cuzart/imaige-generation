// import { Configuration, OpenAIApi } from 'openai';

export const createImage = async (prompt: string) => {
  // const config = new Configuration({
  //   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  // });
  // const openai = new OpenAIApi(config);

  // const result = await openai.createImage({
  //   prompt,
  //   n: 1,
  //   size: '1024x1024',
  // });

  const url = 'https://source.unsplash.com/random?' + prompt;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url);
    }, 2000);
  });
};
