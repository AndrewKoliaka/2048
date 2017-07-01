import isEqual from '../../utils/objectEquality';

it('should compare for equality by their properties', () => {
    let obj1 = {age: 1};
    let obj2 = {age: 1};

    expect(isEqual(obj1, obj2)).toBe(true);

    delete obj2.age;

    expect(isEqual(obj1, obj2)).toBe(false);

    obj2.age = 2;

    expect(isEqual(obj1, obj2)).toBe(false);
});