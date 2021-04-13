import config from "./config";

const getPosts = async () => {
  const _fetch = await fetch(`${config.baseURL}/posts`);
  const data = await _fetch.json();
  return data;
};

export { getPosts };
