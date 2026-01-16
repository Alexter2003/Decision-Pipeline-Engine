enum Operator {
  Equals = 'equals',
  LessThan = 'less_than',
  MoreThan = 'more_than',
}

type ConditionValue = boolean | Array<string> | number;

export class Condition {
  constructor(
    private readonly field: string,
    private readonly operator: Operator,
    private readonly value: ConditionValue
  ) {
    if (!field) throw new Error('You need a field for you condition');

    if (!Object.values(Operator).includes(operator)) {
      let operatorValues: string[];
      throw new Error('You need a operator valid: ' + Object.values(Operator));
    }

    if (
      typeof value === 'boolean' ||
      typeof value === 'number' ||
      (Array.isArray(value) && value.every(v => typeof v === 'string'))
    ) {
        throw new Error("Invalied value type");
        
    }
  }
}
