import randomInt from '../../utils/randomNumber';

it('should generate random number in specified range', () => {
    expect(randomInt(0,1)).toBeLessThan(1);
    expect(randomInt(2,2)).toBe(2);
});