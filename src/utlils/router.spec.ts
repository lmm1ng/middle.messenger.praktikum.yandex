import { expect } from 'chai';
import Block from './block';
import Router from './router';

describe('Router', () => {
  class Dummy1 extends Block {
    render() {
      return '<span/>';
    }
  }
  class Dummy2 extends Block {
    render() {
      return '<span/>';
    }
  }
  class Dummy3 extends Block {
    render() {
      return '<span/>';
    }
  }

  const router = new Router();

  router
    .use('/', Dummy1)
    .use('/dummy_2', Dummy2)
    .use('/dummy_3', Dummy3);
  router.start();

  it('Переход на новую страницу должен менять состояние сущности history', () => {
    router.go('/dummy_2');
    router.go('/dummy_3');

    expect(window.history.length).to.eq(3);
  });
});
