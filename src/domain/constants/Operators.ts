export const Operator = {
    Equals: 'equals',
    LessThan: 'less_than',
    MoreThan: 'more_than',
    Between: 'between'
} as const

export type OperatorValue = (typeof Operator)[keyof typeof Operator];
