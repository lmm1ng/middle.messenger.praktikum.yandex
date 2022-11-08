import { assert } from 'chai';
import Block from './block';

describe('Block', () => {
  const dummyContent = '<div>simple_div</div>';
  class Dummy extends Block {
    render() {
      return dummyContent;
    }
  }
  const dummy = new Dummy();
  it('Props устанавливаются', () => {
    const prop = { test: 'test' };
    dummy.setProps({ test: 'test' });

    assert.deepEqual(dummy.props, prop);
  });
  it('Контент верный', () => {
    assert.equal(dummyContent, dummy.element?.outerHTML);
  });
});
