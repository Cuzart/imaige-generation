import { Configuration, OpenAIApi } from 'openai';
// import { writeFileSync } from 'fs';

export const createImage = async (prompt: string) => {
  const config = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(config);

  const result = await openai.createImage({
    prompt,
    n: 1,
    size: '1024x1024',
  });

  const url = result.data.data[0].url as string;
  // setTimeout(() => {}, 3000);
  // const url = 'https://source.unsplash.com/random';

  // const image = await fetch(url as string);
  // const blob = await image.blob();
  // const buffer = Buffer.from(await blob.arrayBuffer());

  // writeFileSync(`../result-images/${Date.now()}.jpg`, buffer);

  return url;
};
