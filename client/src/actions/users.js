export async function saveUserToDatabase(email, firstName, lastName) {
  const payload = { email, firstName, lastName };

  const response = await fetch('/api/users/register', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const body = await response.json();

  if (response.status === 200) {
    return;
  }

  const errorMessage = body.message || 'Failed to register user in the server';
  throw Error(errorMessage);
}

export async function loginUser(token, email, name) {
  const payload = { email, name };

  const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const body = await response.json();

  if (response.status === 200) {
    return body['user'];
  }

  const errorMessage = body.message || 'Failed to validate user auth token';
  throw Error(errorMessage);
}

export async function verifyAuthUser() {
  const response = await fetch('/api/users/validate');

  const body = await response.json();

  if (response.status === 200) {
    return body['user'];
  }

  const errorMessage = body.message || 'Failed to validate user auth token';
  throw Error(errorMessage);
}

export async function logoutUser() {
  await fetch('/api/users/logout', {
    method: 'POST',
  });
}
