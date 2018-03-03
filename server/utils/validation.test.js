const expect = require('expect');

const { isRealString } = require('./validation');


describe('isRealString', ()=>{
        it('should return non string values', ()=>{
            var res = isRealString(98);
            expect(res).toBe(false);

        });
        it('should return string with only spaces', ()=>{
            var res = isRealString('   ');
            expect(res).toBe(false);
        })
        it('should allow strings with non space characters', ()=>{
            var res = isRealString('   auwhd');
            expect(res).toBe(true);
        })
})