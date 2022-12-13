export async function fetcher(url) {
  const res = await fetch(url);

  if (!res.ok) {
    let errorMessage = 'Failed to retrieve information';
    try {
      const errorResponse = await res.json();
      if (errorResponse?.message) {
        errorMessage = errorResponse?.message;
      }
    } catch (e) {
      // error parsing error message. ignore it
    }
    throw new Error(errorMessage);
  }

  return res.json();
}
