const expext = require('expect');

const { isRealString } = require('./validation');

describe('validate user', () => {
  it('should validate username and room name', () => {
    const non_space = isRealString('Ali');
    const non_string = isRealString(212);
    const only_space = isRealString("   ");

    expext(non_space).toBe(true);
    expext(non_string).toBe(false);
    expext(only_space).toBe(false);
  })
})