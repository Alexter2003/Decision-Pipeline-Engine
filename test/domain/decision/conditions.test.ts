import { Operator } from '#/domain/constants/Operators.js';
import { Condition, } from '#/domain/decision/conditions.js'
import { describe, it, expect } from 'vitest'

describe('Condition: field validation', () => {
    it('throws error when field is empty', () => {
        expect(() => new Condition('', Operator.Equals, true))
            .toThrow("You need a field for your condition")
    });

    it('throws error when field is not string', () => {
        expect(() => {
            new Condition(2 as any, 'equals', 20)
            new Condition(true as any, 'less_than', 20)
        }).toThrow('Field must be a string')
    })


});

describe('Condition: Operator validatoin', () => {
    it('throws error when operator is not valid', () => {
        expect(() => {
            new Condition('transaction.amount', 'any' as any, 200)
            new Condition('transaction.amount', true as any, 200)
        }).toThrow('You need a valid operator: ' + Object.values(Operator).join(', '))
    })
})

describe('Condition: Values validation', () => {
    it('throws error when operator is Between but value is not array', () => {
        expect(() => {
            new Condition('transaction.timestamp', 'between', 20)
            new Condition('transaction.timestamp', 'between', true)
        }).toThrow('Between operator require an array value')
    })

    it('throws error when operator is Between but value is not array of strings or numbers', () => {
        expect(() => {
            new Condition('transaction.timestamp', 'between', [true as any, 'false'])
            new Condition('transaction.timestamp', 'between', [true as any, false as any])
        }).toThrow('The Between operator requires an array of strings or numbers.')
    })

    it('throws error when operator is Between but value has less than two values', () => {
        expect(() => {
            new Condition('transaction.timestamp', 'between', [12])
            new Condition('transaction.timestamp', 'between', ['05:00'])
        }).toThrow('Between operator requires 2 values')
    })

    it('throws error when value is array for non-between operators', () => {
        expect(() => {
            new Condition('transaction.amount', Operator.Equals, [1, 2] as any)
            new Condition('transaction.amount', Operator.MoreThan, ['10', 20] as any)
        }).toThrow('Only Between operator can use array value')
    })

    it('throws error when operator is not equals but the value is boolean ', () => {
        expect(() => {
            new Condition('transaction.amount', Operator.LessThan, true)
            new Condition('transaction.amount', Operator.Equals, false)
        }).toThrow('Only equals operator can use boolean value')
    })

    it('throws error when value is not boolean or number', () => {
        expect(() => {
            new Condition('transaction.amount', Operator.Equals, '10' as any)
            new Condition('transaction.amount', Operator.LessThan, 'true' as any)
        }).toThrow('Value only must be either number or boolean')
    })
})

describe('Condition: valid cases', () => {
    it('does not throw for valid non-between primitive values', () => {
        expect(() => {
            new Condition('transaction.isActive', Operator.Equals, true)
            new Condition('transaction.amount', Operator.LessThan, 100)
        }).not.toThrow()
    })

    it('does not throw for valid between values', () => {
        expect(() => {
            new Condition('transaction.amount', Operator.Between, [10, 20])
            new Condition('transaction.timestamp', Operator.Between, ['05:00', '07:00'])
        }).not.toThrow()
    })
})

