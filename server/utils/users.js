class Users {
	constructor() {
		this.users = [];
	}

	addUser(id, name, room) {
		const user = { id, name, room };
		this.users.push(user);
		return user;
	}

	removeUser(id) {
		const user = this.getUser(id);
		if (user)
			this.users = this.users.filter(user => user.id != id);
		return user;
	}

	getUser(id) {
		return this.users.filter(user => user.id == id)[0];
	}

	getUserList(room) {
		const users = this.users.filter(user => user.room == room);
		const namesArr = users.map(user => user.name);

		return namesArr;
	}
}

module.exports = { Users }



/* class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}

	getUserDescription() {
		return `${this.name} is ${this.age} year(s) old.`
	}
}

const me = new Person('Nadal', 32);
const desc = me.getUserDescription();
console.log(desc);
 */