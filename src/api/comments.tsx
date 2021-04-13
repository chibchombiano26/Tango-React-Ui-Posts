import config from "./config";

const getComments = async (postId: number) => {
  const _fetch = await fetch(`${config.baseURL}/comments?postId=${postId}`);
  const data = await _fetch.json();
  return data;
};

export { getComments };
