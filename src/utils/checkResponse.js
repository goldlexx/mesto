const checkResponse = async (response) => {
  let data = null;

  try {
    data = await response.json();
  } catch {
    if (response.ok && response.status !== 204) {
      throw new Error('The server returned an unreadable response.');
    }
  }

  if (!response.ok) {
    throw new Error(data?.message || `Request failed (${response.status}).`);
  }

  return data;
};

export default checkResponse;
