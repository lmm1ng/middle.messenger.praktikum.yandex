import { assert } from 'chai';
import HTTPTransport from './httpTransport';

describe('Http Transport', () => {
  const http = new HTTPTransport('/', 'https://jsonplaceholder.typicode.com');

  it('GET', async () => {
    const response = await http.get('todos/1');
    assert.isObject(response);
  });
  it('POST', async () => {
    const requestData = {
      userId: 1,
      title: 'test',
      completed: false,
    };
    const response = await http.post('todos', { data: requestData });
    assert.hasAllKeys(response, [...Object.keys(requestData), 'id']);
  });
  it('PUT', async () => {
    const requestData = {
      userId: 1,
      title: 'test',
      completed: false,
    };
    const response = await http.put('todos/1', { data: requestData });
    assert.hasAllKeys(response, [...Object.keys(requestData), 'id']);
  });
});
