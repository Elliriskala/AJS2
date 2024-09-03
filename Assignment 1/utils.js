const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error('HTTP error: ' + response.status);
  }
  const json = await response.json();
  return json;
}

export { fetchData };
