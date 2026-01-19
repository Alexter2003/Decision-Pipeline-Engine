import { Operator, OperatorValue } from "../constants/Operators.js";

type ConditionValue = boolean | Array<string | number> | number;
export class Condition {
  constructor(
    private readonly field: string,
    private readonly operator: OperatorValue,
    private readonly value: ConditionValue
  ) {
    this.validate();
  }

  private validate(): void {
    this.validateField();
    this.validateOperator();
    this.validateValues();
  }

  private validateField(): void {
    if (!this.field) throw new Error('You need a field for your condition');

    if (typeof this.field !== 'string') throw new Error('Field must be a string');
  }

  private validateOperator(): void {
    if (!Object.values(Operator).includes(this.operator)) {
      throw new Error('You need a valid operator: ' + Object.values(Operator).join(', '));
    }
  }

  private validateValues(): void {
    if (this.operator === Operator.Between) {
      this.validateBetweenValues()
    } else if (this.operator !== Operator.Equals) {
      this.validateNotEqualsValue()
    } else {
      this.validatePrimitiveValues()
    }
  }

  private validateBetweenValues(): void {
    if (!Array.isArray(this.value)) throw new Error('Between operator require an array value');

    if (!this.value.every(v => typeof v === 'string' || typeof v === 'number'))
      throw new Error('The Between operator requires an array of strings or numbers.');

    if (this.value.length !== 2) throw new Error('Between operator requires 2 values');
  }

  private validateNotEqualsValue(): void {
    if (typeof this.value === 'boolean') throw new Error('Only equals operator can use boolean value');

  }

  private validatePrimitiveValues(): void {
    if (Array.isArray(this.value)) throw new Error('Only Between operator can use array value');

    const isValidType: boolean = typeof this.value == 'boolean' ||
      typeof this.value == 'number';

    if (!isValidType) throw new Error('Value only must be either number or boolean');

  }

  public toString(): string {
    return `field: ${this.field} \n operator: ${this.operator} \n value: ${this.value}`
  }

  public toJson(): object {
    return {
      'field': this.field,
      'operator': this.operator,
      'value': this.value
    }
  }

}
