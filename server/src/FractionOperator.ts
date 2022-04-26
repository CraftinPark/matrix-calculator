import { reduceEachLeadingCommentRange } from "typescript";
import Fraction from "./Fraction";

export default class FractionOperator {
  constructor() {}

  public commonDenominator(f1: Fraction, f2: Fraction): void {
    if (f1.denominator !== f2.denominator) {
      let firstDenominator = f1.denominator;
      f1.numerator *= f2.denominator;
      f1.denominator *= f2.denominator;
      f2.numerator *= firstDenominator;
      f2.denominator *= firstDenominator;
    }
  }

  public isEquivalent(f1: Fraction, f2: Fraction): Boolean {
    f1.reduce();
    f2.reduce();
    if (f1.numerator !== f2.numerator || f1.denominator !== f2.denominator) return false;
    return true;
  }

  public add(f1: Fraction, f2: Fraction): Fraction {
    let resultFraction: Fraction = new Fraction();
    if (f1.denominator !== f2.denominator) this.commonDenominator(f1, f2);
    resultFraction.numerator = f1.numerator + f2.numerator;
    resultFraction.denominator = f1.denominator;
    return resultFraction;
  }

  public subtract(f1: Fraction, f2: Fraction): Fraction {
    let resultFraction: Fraction = new Fraction();
    if (f1.denominator !== f2.denominator) this.commonDenominator(f1, f2);
    resultFraction.numerator = f1.numerator - f2.numerator;
    resultFraction.denominator = f1.denominator;
    return resultFraction;
  }

  public scale(f1: Fraction, n: number): Fraction {
    let resultFraction: Fraction = new Fraction();
    resultFraction.numerator = f1.numerator * n;
    resultFraction.denominator = f1.denominator;
    return resultFraction;
  }

  public multiply(f1: Fraction, f2: Fraction): Fraction {
    let resultFraction: Fraction = new Fraction();
    resultFraction.numerator = f1.numerator * f2.numerator;
    resultFraction.denominator = f1.denominator * f2.denominator;
    return resultFraction;
  }

  public divide(f1: Fraction, f2: Fraction): Fraction {
    let resultFraction: Fraction = new Fraction();
    if (f2.numerator === 0) return new Fraction(0);
    resultFraction.numerator = f1.numerator * f2.denominator;
    resultFraction.denominator = f1.denominator * f2.numerator;
    return resultFraction;
  }
}
