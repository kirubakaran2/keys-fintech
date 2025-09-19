export type WithdrawalTiming = 'end' | 'beginning';

export interface SWPResult {
  totalInvestment: number;   // Rounded initial investment (P)
  totalWithdrawal: number;   // Rounded total withdrawn over processed months
  finalValue: number;        // Rounded remaining corpus after processing (>=0)
  monthsProcessed: number;   // Number of months withdrawals actually processed
  sustainable: boolean;      // True if withdrawal sustainable for full period
  exhausted: boolean;        // True if corpus exhausted early
}

export function calculateSWP(
  investment: number,       // initial lump-sum P
  annualReturn: number,     // annual r in percent, e.g. 10 for 10%
  withdrawal: number,       // B per month
  timePeriod: number,       // t in years (can be fractional or integer)
  timing: WithdrawalTiming = 'end'  // 'end' for end-of-period withdrawal
): SWPResult {
  // 1. Effective monthly rate: i = (1 + r/100)^(1/12) -1
  const monthlyRate = Math.pow(1 + annualReturn / 100, 1 / 12) - 1;

  // total months N = n * t (n = 12)
  const totalMonths = Math.max(0, Math.floor(timePeriod * 12));

  let balance = investment;    // will hold float balance during sim or closed-form
  let totalWithdrawn = 0;
  let monthsProcessed = 0;
  let sustainable = false;
  let exhausted = false;

  // Helper: closed-form remaining corpus after N periods
  const computeClosedFormFinal = (
    i: number,
    n: number,
    P: number,
    W: number,
    timing: WithdrawalTiming
  ): number => {
    if (i === 0) {
      // zero return: simply P - W*n
      return P - W * n;
    }
    const factor = Math.pow(1 + i, n);             // (1+i)^N
    const annuityTerm = (factor - 1) / i;           // ((1+i)^N - 1)/i
    if (timing === 'end') {
      // Remaining = P*(1+i)^N - W * annuityTerm
      return P * factor - W * annuityTerm;
    } else {
      // Beginning-of-period: withdraw first, then grow: formula multiplies annuityTerm by (1+i)
      // Remaining = P*(1+i)^N - W * annuityTerm * (1+i)
      return P * factor - W * annuityTerm * (1 + i);
    }
  };

  // 2. Sustainability check: if corpus is large enough that interest each month covers withdrawal,
  //    then corpus is sustainable for the full period (it will not exhaust within those months).
  if (monthlyRate > 0) {
    if (timing === 'end') {
      // end-of-period: condition P * i >= W
      if (investment * monthlyRate >= withdrawal) {
        sustainable = true;
      }
    } else {
      // beginning-of-period: required corpus ~ W*(1+i)/i; check P >= required
      if (investment >= (withdrawal * (1 + monthlyRate)) / monthlyRate) {
        sustainable = true;
      }
    }
  }
  // If monthlyRate = 0 (0% return) or negative, sustainable remains false.

  if (sustainable) {
    // 3a. Closed-form if sustainable: compute remaining corpus after full period
    const floatFinal = computeClosedFormFinal(
      monthlyRate,
      totalMonths,
      investment,
      withdrawal,
      timing
    );
    balance = floatFinal;
    totalWithdrawn = withdrawal * totalMonths;
    monthsProcessed = totalMonths;
    // If floatFinal <= 0 in closed-form (rare if truly sustainable), mark exhausted
    exhausted = floatFinal <= 0;
  } else {
    // 3b. Simulate month-by-month until exhaustion or full period
    let bal = investment;
    let totW = 0;
    let m = 0;
    for (; m < totalMonths; m++) {
      if (timing === 'beginning') {
        // Withdraw at start of month
        if (bal >= withdrawal) {
          bal -= withdrawal;
          totW += withdrawal;
        } else {
          // Partial withdrawal and exhaust
          totW += bal;
          bal = 0;
          m++;
          exhausted = true;
          break;
        }
        // Then grow remaining for one period
        bal *= (1 + monthlyRate);
      } else {
        // timing === 'end': grow first
        bal *= (1 + monthlyRate);
        if (bal >= withdrawal) {
          bal -= withdrawal;
          totW += withdrawal;
        } else {
          // Partial withdrawal and exhaust
          totW += bal;
          bal = 0;
          m++;
          exhausted = true;
          break;
        }
      }
    }
    balance = bal;
    totalWithdrawn = totW;
    monthsProcessed = m;
    // exhausted is true if we broke early
  }

  // 4. Round results to whole rupees
  const roundedInvestment = Math.round(investment);
  const roundedWithdrawn = Math.round(totalWithdrawn);
  let roundedFinal = Math.round(balance);
  if (roundedFinal < 0) roundedFinal = 0;

  return {
    totalInvestment: roundedInvestment,
    totalWithdrawal: roundedWithdrawn,
    finalValue: roundedFinal,
    monthsProcessed,
    sustainable,
    exhausted: !sustainable && monthsProcessed < totalMonths,
  };
}
