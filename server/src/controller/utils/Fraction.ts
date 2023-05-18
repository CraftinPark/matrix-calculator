export default class Fraction {
  public numerator: number;
  public denominator: number;

  constructor(numerator?: number, denominator?: number) {
    this.numerator = numerator ?? 0;
    this.denominator = denominator ?? 1;
  }

  public simplify(): number {
    if (this.numerator === 0) return 0;
    return this.numerator / this.denominator;
  }

  public reduce(): void {
    var gcd: any = function gcd(a: any, b: any): any {
      return b ? gcd(b, a % b) : a;
    };
    gcd = gcd(this.numerator, this.denominator);
    this.numerator /= gcd;
    this.denominator /= gcd;
  }
}
