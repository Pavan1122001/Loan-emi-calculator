export function calculateEMI(P, R, N) {
  const r = R / 12 / 100;
  const emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
  return emi ? emi : 0;
}

export function getAmortizationSchedule(P, R, N, emi) {
  const schedule = [];
  let balance = P;
  const r = R / 12 / 100;

  for (let i = 1; i <= N; i++) {
    const interest = balance * r;
    const principalPaid = emi - interest;
    balance -= principalPaid;
    schedule.push({
      month: i,
      principalPaid: principalPaid > 0 ? principalPaid : 0,
      interestPaid: interest > 0 ? interest : 0,
      balance: balance > 0 ? balance : 0,
    });
  }

  return schedule;
}
