const BASE_URL = 'https://mate.academy/students-api';


function wait(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function request(url, method, data) {
  const options = { 
    method: 'GET',
    body: null,
    headers: null,
   };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=utf-8',
    }

    return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then(response => response.json());
  }
}

export const client = {
  get: (url) => request(url),
  post: (url, data) => request(url, 'POST', data),
  patch: (url, data) => request(url, 'POST', data),
  delete: (url) => request(url, 'DELETE'),
};

