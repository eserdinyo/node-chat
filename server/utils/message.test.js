const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = "Alex";
        const text = "Hello There!";

        const res = generateMessage(from, text);

        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        expect(typeof res.createdAt).toBe('number');
    });
})

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const from = "Admin";
        const lat = "1";
        const lng = "1";
        const url = "https://www.google.com/maps?q=1,1"

        const res = generateLocationMessage(from, lat, lng);
        
        expect(res.from).toBe(from);
        expect(res.url).toBe(url);
        expect(typeof res.createdAt).toBe('number');
    })
})