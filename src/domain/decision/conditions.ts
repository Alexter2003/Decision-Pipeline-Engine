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
    this.validate();
  }

  private validate(): void {
    if (!this.field) throw new Error('You need a field for you condition');

    if (!Object.values(Operator).includes(this.operator)) {
      let operatorValues: string[];
      throw new Error('You need a operator valid: ' + Object.values(Operator));
    }

    const isValid = typeof this.value === 'boolean' || typeof this.value === 'number';

    const isValidArray =
      Array.isArray(this.value) &&
      this.value.every(v => typeof v === 'string' || typeof v === 'number');

    if (!isValid && !isValidArray)
      throw new Error('Invalid value type. Must be string, number, boolean or array of these');
  }
}
