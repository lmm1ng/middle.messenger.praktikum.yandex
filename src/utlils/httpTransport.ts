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
    timeout?: number,
    isFormData?: boolean
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
  protected API_URL: string;

  protected endpoint: string;

  constructor(endpoint: string, apiUrl?: string) {
    this.API_URL = apiUrl || 'https://ya-praktikum.tech/api/v2';
    this.endpoint = `${this.API_URL}${endpoint}`;
  }

  get<Response>(url: string, options: IOptions = {}): Promise<Response> {
    return this.request(
      `${this.endpoint + url}?${queryStringify(options.data)}`,
      { ...options, method: METHOD.GET },
      options.timeout,
    );
  }

  post<Response = void>(url: string, options: IOptions = {}): Promise<Response> {
    return this.request(this.endpoint + url, { ...options, method: METHOD.POST }, options.timeout);
  }

  put<Response = void>(url: string, options: IOptions = {}): Promise<Response> {
    return this.request(this.endpoint + url, { ...options, method: METHOD.PUT }, options.timeout);
  }

  delete<Response>(url: string, options: IOptions = {}): Promise<Response> {
    return this.request(
      this.endpoint + url,
      { ...options, method: METHOD.DELETE },
      options.timeout,
    );
  }

  request<Response>(url: string, options: IOptions, timeout = 5000): Promise<Response> {
    const { method = '', data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.timeout = timeout;
      xhr.open(method, url);

      if (options.isFormData) {
        // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
      xhr.responseType = 'json';
      xhr.withCredentials = true;

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(options.isFormData ? data : JSON.stringify(data));
      }
    });
  }
}
