var expect = require('expect');

var { generateMessage } = require('./message');

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