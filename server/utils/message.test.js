var expect = require('expect');

var { generateMessage } = require('./message');
var { generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
    it('should generate the correct message object', ()=>{
        var msgObj = generateMessage('sahil', 'wassup');
        expect(msgObj.createdAt).toBeA('number');
        expect(msgObj).toInclude({
            from:'sahil',
            text:'wassup'
        })
    })
})

describe('generateLocationMessage', ()=>{
    it('should genrate the correct location', ()=>{
        var locObj = generateLocationMessage('Deb', 15, 19);
        expect(locObj.createdAt).toBeA('number');
        expect(locObj).toInclude({
            from: 'Deb',
            url: 'https://www.google.com/maps?q=15,19'
        })
    })
})