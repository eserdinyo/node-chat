const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Football',
    },
    {
      id: '2',
      name: 'Jen',
      room: 'Volleyball',
    }, {
      id: '3',
      name: 'Julie',
      room: 'Football',
    }];
  })


  it('should add new user', () => {
    const users = new Users();
    const user = {
      id: '123',
      name: 'Nadal',
      room: 'Tennis Lovers'
    };

    const refUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  })

  it('should return names for football', () => {
    const userList = users.getUserList('Football');
    expect(userList).toEqual(['Mike', 'Julie']);

  })

  it('should find user', () => {
    const user = users.getUser('3');
    expect(user).toEqual(users.users[2])
  })

  it('should not find user', () => {
    const user = users.getUser('99');
    expect(user).toBeFalsy();
  })

  it('should remove a user', () => {
    const user = users.removeUser('1');
    expect(user.id).toEqual('1');
    expect(users.users.length).toBe(2);
  })
})