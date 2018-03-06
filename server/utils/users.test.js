const expect = require('expect');

const { Users } = require('./users');

describe('Users', ()=>{
    var users;
    beforeEach(()=>{
        users = new Users();
        users.users =  [
            {
                id:'1',
                name: 'sahil',
                room: 'node'
            },{
                id:'2',
                name: 'kapil',
                room: 'ne'
            },{
                id:'3',
                name: 'ahi',
                room: 'node'
            }
        ]
    })
    it('should add new user', ()=>{
        var users = new Users();
        var user = {
            id: '123',
            name: 'Shawdd',
            room: 'The office'
        }
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user])
    });

    it('should find User', ()=>{
        var userId = '1';
        var user = users.getUser(userId);

        expect(user.id).toEqual(userId);
    });

    it('should not find a user', ()=>{
        var userId = '0';
        var user = users.getUser(userId);

        expect(user).toNotExist();
    })

    it('should remove a user', ()=>{
        var userId = '2';
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    })

    it('should not remove a user', ()=>{
        var userId = '0';
        var user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    })

    it('should return names for node', ()=>{
        var userList = users.getUserList('node');

        expect(userList).toEqual(['sahil', 'ahi']);
    });

    it('should return names for ne', ()=>{
        var userList = users.getUserList('ne');

        expect(userList).toEqual(['kapil']);
    });
})