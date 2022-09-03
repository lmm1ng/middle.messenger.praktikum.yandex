enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

interface IOptions {
    method?: string,
    data?: any,
    timeout?: number
}

const queryStringify = (data: Array<any>): string => {
  if (!data) {
    return '';
  }
  const outArr = [''];
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(data)) {
    let prepVal = '';
    if (Array.isArray(value)) {
      prepVal = value.join(',');
    } else {
      prepVal = value;
    }
    outArr.push(`${key}=${prepVal}`);
  }
  return outArr.join('&').slice(1);
};

export default class HTTPTransport {
  get(url: string, options: IOptions = {}): Promise<XMLHttpRequest> {
    return this.request(
      `${url}?${queryStringify(options.data)}`,
      { ...options, method: METHOD.GET },
      options.timeout,
    );
  }

  post(url: string, options: IOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.POST }, options.timeout);
  }

  put(url: string, options: IOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.PUT }, options.timeout);
  }

  delete(url: string, options: IOptions = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.DELETE }, options.timeout);
  }

  request(url: string, options: IOptions, timeout = 5000): Promise<XMLHttpRequest> {
    const { method = '', data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.timeout = timeout;
      xhr.open(method, url);
      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
