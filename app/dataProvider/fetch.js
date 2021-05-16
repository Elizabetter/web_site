import HttpError from './HttpError';

export const createHeadersFromOptions = options => {
  const headers = options.headers || { Accept: 'application/json' };
  const requestHeaders = new Headers(headers);
  if (
    !requestHeaders.has('Content-Type') &&
    !(options && (!options.method || options.method === 'GET')) &&
    !(options && options.body && options.body instanceof FormData)
  ) {
    requestHeaders.set('Content-Type', 'application/json');
  }
  if (options.user && options.user.token) {
    requestHeaders.set('Authorization', `Bearer ${options.user.token}`);
  }

  return requestHeaders;
};

export const fetchJson = (url, options = {}) => {
  const requestHeaders = createHeadersFromOptions(options);

  return fetch(url, { ...options, headers: requestHeaders })
    .then(response =>
      response.text().then(text => ({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body: text,
      })),
    )
    .then(({ status, statusText, headers, body }) => {
      let json;
      try {
        json = JSON.parse(body);
      } catch (e) {
        // not json, no big deal
      }
      if (status < 200 || status >= 300) {
        return Promise.reject(
          new HttpError((json && json.message) || statusText, status, json),
        );
      }
      return Promise.resolve({ status, headers, body, json });
    });
};

const isValidObject = value => {
  if (!value) {
    return false;
  }

  const isArray = Array.isArray(value);
  const isBuffer = typeof Buffer !== 'undefined' && Buffer.isBuffer(value);
  const isObject = Object.prototype.toString.call(value) === '[object Object]';
  const hasKeys = !!Object.keys(value).length;

  return !isArray && !isBuffer && isObject && hasKeys;
};

export const flattenObject = (value, path = []) => {
  if (isValidObject(value)) {
    return Object.assign(
      {},
      ...Object.keys(value).map(key =>
        flattenObject(value[key], path.concat([key])),
      ),
    );
  }
  return path.length ? { [path.join('.')]: value } : value;
};
