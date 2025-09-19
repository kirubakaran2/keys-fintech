'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculateSWP, SWPResult } from './swp';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const CalculatorCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600 mb-4">
      {title}
    </h3>
    {children}
  </div>
);

const ResultPieChart = ({ data }: { data: { name: string; value: number }[] }) => (
  <div className="h-64 mt-6">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default function FinancialCalculators() {
  const [activeTab, setActiveTab] = useState('sip');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600 mb-4 mt-9">
            Financial Calculators
          </h1>
          <p className="text-xl text-gray-300">
            Plan your financial future with our powerful calculators
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('sip')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'sip' ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            SIP Calculator
          </button>
          <button
            onClick={() => setActiveTab('swp')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'swp' ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            SWP Calculator
          </button>
          <button
            onClick={() => setActiveTab('hlv')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'hlv' ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            HLV Calculator
          </button>
          <button
            onClick={() => setActiveTab('retirement')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${activeTab === 'retirement' ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            Retirement Calculator
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {activeTab === 'sip' && <SIPCalculator />}
          {activeTab === 'swp' && <SWPCalculator />}
          {activeTab === 'hlv' && <HLVCalculator />}
          {activeTab === 'retirement' && <RetirementCalculator />}
        </div>
      </div>
    </div>
  );
}

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number>(10000);
  const [annualReturn, setAnnualReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(10);
  const [result, setResult] = useState<{
    totalInvestment: number;
    estimatedReturns: number;
    totalValue: number;
  } | null>(null);

  const calculateSIP = () => {
    const months = Math.floor(timePeriod * 12);
    const monthlyRate = annualReturn > 0
      ? Math.pow(1 + annualReturn / 100, 1 / 12) - 1
      : 0;

    let futureValue: number;
    if (monthlyRate === 0) {
      futureValue = monthlyInvestment * months;
    } else {
      futureValue =
        monthlyInvestment *
        ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);
    }

    const totalInvestment = monthlyInvestment * months;
    const estimatedReturns = futureValue - totalInvestment;

    setResult({
      totalInvestment: Math.round(totalInvestment),
      estimatedReturns: Math.round(estimatedReturns),
      totalValue: Math.round(futureValue),
    });
  };

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, annualReturn, timePeriod]);

  const pieData = result
    ? [
        { name: 'Invested Amount', value: result.totalInvestment },
        { name: 'Estimated Returns', value: result.estimatedReturns },
      ]
    : [];

  return (
    <CalculatorCard title="SIP Calculator">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-green-400 mb-1">
              Monthly Investment (₹)
            </label>
            <input
              type="range"
              min="100"
              max="100000"
              step="100"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>100</span>
              <span>50K</span>
              <span>100K</span>
            </div>
            <input
              type="number"
              min="0"
              step="100"
              value={monthlyInvestment === 0 ? '' : monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value === '' ? 0 : Number(e.target.value))}
              className="w-full mt-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-400 mb-1">
              Expected Annual Return (%)
            </label>
            <input
              type="range"
              min="0"
              max="30"
              step="0.1"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0%</span>
              <span>15%</span>
              <span>30%</span>
            </div>
            <input
              type="number"
              min="0"
              step="0.1"
              value={annualReturn === 0 ? '' : annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value === '' ? 0 : Number(e.target.value))}
              className="w-full mt-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-400 mb-1">
              Time Period (Years)
            </label>
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={timePeriod}
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1Y</span>
              <span>20Y</span>
              <span>40Y</span>
            </div>
            <input
              type="number"
              min="1"
              step="1"
              value={timePeriod === 0 ? '' : timePeriod}
              onChange={(e) => setTimePeriod(e.target.value === '' ? 0 : Number(e.target.value))}
              className="w-full mt-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white"
            />
          </div>
        </div>

        <div className="bg-gray-700 rounded-xl p-6">
          {result && (
            <>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Invested Amount</span>
                  <span className="font-bold text-white">
                    ₹{result.totalInvestment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Estimated Returns</span>
                  <span className="font-bold text-green-400">
                    ₹{result.estimatedReturns.toLocaleString()}
                  </span>
                </div>
                <div className="pt-4 border-t border-gray-600 mt-2">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-300">Total Value</span>
                    <span className="font-bold text-emerald-400">
                      ₹{result.totalValue.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <ResultPieChart data={pieData} />
            </>
          )}
        </div>
      </div>
    </CalculatorCard>
  );
};

const SWPCalculator = () => {
  const [investment, setInvestment] = useState<number>(1000000);
  const [annualReturn, setAnnualReturn] = useState<number>(8);
  const [withdrawal, setWithdrawal] = useState<number>(10000);
  const [timePeriod, setTimePeriod] = useState<number>(20);
  const [result, setResult] = useState<SWPResult | null>(null);

  useEffect(() => {
    const res = calculateSWP(investment, annualReturn, withdrawal, timePeriod);
    setResult(res);
  }, [investment, annualReturn, withdrawal, timePeriod]);

  const formatMonths = (months: number) => {
    const yrs = Math.floor(months / 12);
    const m = months % 12;
    const parts: string[] = [];
    if (yrs > 0) parts.push(`${yrs} yr${yrs > 1 ? 's' : ''}`);
    if (m > 0) parts.push(`${m} mo${m > 1 ? 's' : ''}`);
    if (parts.length === 0) return '0 mo';
    return parts.join(' ');
  };

  const pieData = result
    ? [
        { name: 'Initial Investment', value: result.totalInvestment },
        { name: 'Total Withdrawn', value: result.totalWithdrawal },
        { name: 'Remaining Corpus', value: result.finalValue },
      ].filter(item => item.value > 0)
    : [];

  return (
    <CalculatorCard title="SWP Calculator">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-green-400 mb-1">
              Total Investment (₹)
            </label>
            <input
              type="range"
              min="0"
              max="10000000"
              step="1000"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0</span>
              <span>50L</span>
              <span>1Cr</span>
            </div>
            <input
              type="number"
              min="0"
              step="1000"
              value={investment === 0 ? '' : investment}
              onChange={(e) => setInvestment(e.target.value === '' ? 0 : Number(e.target.value))}
              className="w-full mt-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-400 mb-1">
              Expected Return Rate (p.a.) (%)
            </label>
            <input
              type="range"
              min="0"
              max="20"
              step="0.1"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0%</span>
              <span>10%</span>
              <span>20%</span>
            </div>
            <input
              type="number"
              min="0"
              step="0.1"
              value={annualReturn === 0 ? '' : annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value === '' ? 0 : Number(e.target.value))}
              className="w-full mt-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-400 mb-1">
              Withdrawal per Month (₹)
            </label>
            <input
              type="range"
              min="0"
              max="200000"
              step="500"
              value={withdrawal}
              onChange={(e) => setWithdrawal(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0</span>
              <span>1L</span>
              <span>2L</span>
            </div>
            <input
              type="number"
              min="0"
              step="100"
              value={withdrawal === 0 ? '' : withdrawal}
              onChange={(e) => setWithdrawal(e.target.value === '' ? 0 : Number(e.target.value))}
              className="w-full mt-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-400 mb-1">
              Time Period (Years)
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={timePeriod}
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1Y</span>
              <span>25Y</span>
              <span>50Y</span>
            </div>
            <input
              type="number"
              min="1"
              max="100"
              value={timePeriod === 0 ? '' : timePeriod}
              onChange={(e) => setTimePeriod(e.target.value === '' ? 0 : Number(e.target.value))}
              className="w-full mt-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white"
            />
          </div>
        </div>

        <div className="bg-gray-700 rounded-xl p-6">
          {result && (
            <>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Investment</span>
                  <span className="font-bold text-white">
                    ₹{result.totalInvestment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Total Withdrawal</span>
                  <span className="font-bold text-green-400">
                    ₹{result.totalWithdrawal.toLocaleString()}
                  </span>
                </div>
                <div className="pt-4 border-t border-gray-600 mt-2">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-300">Remaining Corpus</span>
                    <span className="font-bold text-emerald-400">
                      ₹{result.finalValue.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  {result.sustainable ? (
                    <p>
                      At {annualReturn}% p.a., withdrawing ₹{withdrawal.toLocaleString()}/month is sustainable for {timePeriod} year
                      {timePeriod > 1 ? 's' : ''}: corpus will not exhaust.
                    </p>
                  ) : (
                    <>
                      {result.monthsProcessed >= timePeriod * 12 ? (
                        <p>
                          Corpus lasts the full period of {timePeriod} year
                          {timePeriod > 1 ? 's' : ''}.
                        </p>
                      ) : (
                        <p>
                          Corpus exhausts after <strong>{formatMonths(result.monthsProcessed)}</strong>.
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
              <ResultPieChart data={pieData} />
            </>
          )}
        </div>
      </div>
    </CalculatorCard>
  );
};

const HLVCalculator = () => {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [annualIncome, setAnnualIncome] = useState<number>(120000);
  const [savings, setSavings] = useState<number>(0);
  const [loans, setLoans] = useState<number>(0);
  const [existingCover, setExistingCover] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);

  const calculateHLV = () => {
    let multiplier = 0;
    if (currentAge <= 35) multiplier = 25;
    else if (currentAge <= 45) multiplier = 20;
    else if (currentAge <= 50) multiplier = 15;
    else if (currentAge <= 60) multiplier = 10;
    else multiplier = 0;

    const incomeBasedHLV = annualIncome * multiplier;
    const adjustedHLV = Math.max(
      0,
      incomeBasedHLV + loans - savings - existingCover
    );

    setResult(adjustedHLV);
  };

  useEffect(() => {
    calculateHLV();
  }, [currentAge, retirementAge, annualIncome, savings, loans, existingCover]);

  const pieData = result ? [
    { name: 'Income Replacement', value: result },
    { name: 'Existing Cover', value: existingCover },
    { name: 'Savings', value: savings },
    { name: 'Liabilities', value: loans }
  ].filter(item => item.value > 0) : [];

  return (
    <CalculatorCard title="Human Life Value Calculator">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* My Profile Section */}
        <div className="space-y-6">
          <div className="bg-gray-700 rounded-xl p-4">
            <h4 className="text-lg font-semibold text-green-400 mb-4">My Profile</h4>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">Current Age *</label>
              <div className="flex items-center gap-2">
                <input type="range" min="18" max="69" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500" />
                <span className="text-white w-16 text-center">{currentAge} Years</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>18</span>
                <span>69</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">Expected Retirement Age *</label>
              <div className="flex items-center gap-2">
                <input type="range" min="40" max="70" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500" />
                <span className="text-white w-16 text-center">{retirementAge} Years</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>40</span>
                <span>70</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Annual Income *</label>
              <div className="flex items-center gap-2">
                <input type="range" min="120000" max="50000000" step="10000" value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500" />
                <span className="text-white w-24 text-right">₹{annualIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1.2L</span>
                <span>5Cr</span>
              </div>
            </div>
          </div>

          {/* My Finance Section */}
          <div className="bg-gray-700 rounded-xl p-4">
            <h4 className="text-lg font-semibold text-green-400 mb-4">My Finance</h4>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">My Savings</label>
              <div className="flex items-center gap-2">
                <input type="range" min="0" max="20000000" step="10000" value={savings} onChange={(e) => setSavings(Number(e.target.value))} className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500" />
                <span className="text-white w-24 text-right">₹{savings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0</span>
                <span>2Cr</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">Loans and Liabilities</label>
              <div className="flex items-center gap-2">
                <input type="range" min="0" max="100000000" step="10000" value={loans} onChange={(e) => setLoans(Number(e.target.value))} className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500" />
                <span className="text-white w-24 text-right">₹{loans.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0</span>
                <span>10Cr</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Existing Life Cover</label>
              <div className="flex items-center gap-2">
                <input type="range" min="0" max="50000000" step="10000" value={existingCover} onChange={(e) => setExistingCover(Number(e.target.value))} className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-500" />
                <span className="text-white w-24 text-right">₹{existingCover.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0</span>
                <span>5Cr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-gray-700 rounded-xl p-6">
          {result !== null && (
            <>
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-emerald-400 mb-2">Your Human Life Value</h3>
                  <div className="text-4xl font-extrabold text-white">₹{result.toLocaleString()}</div>
                  <p className="text-gray-400 mt-2">Recommended life insurance coverage amount</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Current Annual Income</span>
                    <span className="font-bold text-white">₹{annualIncome.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Years to Retirement</span>
                    <span className="font-bold text-white">{retirementAge - currentAge} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Existing Financial Assets</span>
                    <span className="font-bold text-white">₹{savings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Outstanding Liabilities</span>
                    <span className="font-bold text-white">₹{loans.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Current Life Cover</span>
                    <span className="font-bold text-white">₹{existingCover.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-600">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-300">Additional Cover Needed</span>
                    <span className="font-bold text-emerald-400">₹{Math.max(0, result - existingCover).toLocaleString()}</span>
                  </div>
                </div>

                <div className="text-sm text-gray-400 mt-4">
                  <p>Human Life Value represents the economic value of your future earnings potential. This calculation uses age-based income multipliers along with your financials to determine the recommended life cover.</p>
                </div>
              </div>
              <ResultPieChart data={pieData} />
            </>
          )}
        </div>
      </div>
    </CalculatorCard>
  );
};


const RetirementCalculator = () => {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(50000);
  const [inflation, setInflation] = useState<number>(6);
  const [currentSavings, setCurrentSavings] = useState<number>(1000000);
  const [annualReturn, setAnnualReturn] = useState<number>(8);
  const [result, setResult] = useState<{ corpusRequired: number; monthlySaving: number } | null>(null);

  const calculateRetirement = () => {
    const yearsToRetirement = retirementAge - currentAge;
    const yearsInRetirement = 90 - retirementAge;
    
    const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflation / 100, yearsToRetirement);
    const corpusRequired = futureMonthlyExpenses * 12 * (yearsInRetirement);
    const futureValueOfSavings = currentSavings * Math.pow(1 + annualReturn / 100, yearsToRetirement);
    const additionalCorpusNeeded = Math.max(0, corpusRequired - futureValueOfSavings);
    
    const monthlyRate = annualReturn / 12 / 100;
    const months = yearsToRetirement * 12;
    const monthlySaving = additionalCorpusNeeded / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate));
    
    setResult({
      corpusRequired: corpusRequired,
      monthlySaving: monthlySaving
    });
  };

  useEffect(() => {
    calculateRetirement();
  }, [currentAge, retirementAge, monthlyExpenses, inflation, currentSavings, annualReturn]);

  const pieData = result ? [
    { name: 'Current Savings', value: currentSavings },
    { name: 'Additional Needed', value: Math.max(0, result.corpusRequired - currentSavings) }
  ] : [];

  return (
    <CalculatorCard title="Retirement Calculator">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-green-400 mb-1">
              Current Age (Years)
            </label>
            <input
              type="range"
              min="20"
              max="70"
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>20</span>
              <span>45</span>
              <span>70</span>
            </div>
            <input
              type="number"
              min="20"
              max="70"
              value={currentAge === 0 ? '' : currentAge}
              onChange={(e) => setCurrentAge(e.target.value === '' ? 0 : Number(e.target.value))}
              className="w-full mt-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-400 mb-1">
              Retirement Age (Years)
            </label>
            <input
              type="range"
              min="40"
              max="80"
              value={retirementAge}
              onChange={(e) => setRetirementAge(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>40</span>
              <span>60</span>
              <span>80</span>
            </div>
            <input
              type="number"
              min="40"
              max="80"
              value={retirementAge === 0 ? '' : retirementAge}
              onChange={(e) => setRetirementAge(e.target.value === '' ? 0 : Number(e.target.value))}
              className="w-full mt-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-400 mb-1">
              Current Monthly Expenses (₹)
            </label>
            <input
              type="range"
              min="10000"
              max="500000"
              step="1000"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>10K</span>
              <span>2.5L</span>
              <span>5L</span>
            </div>
            <input
              type="number"
              min="0"
              step="1000"
              value={monthlyExpenses === 0 ? '' : monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value === '' ? 0 : Number(e.target.value))}
              className="w-full mt-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-400 mb-1">
              Expected Inflation (%)
            </label>
            <input
              type="range"
              min="1"
              max="15"
              value={inflation}
              onChange={(e) => setInflation(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1%</span>
              <span>8%</span>
              <span>15%</span>
            </div>
            <input
              type="number"
              min="1"
              max="15"
              value={inflation === 0 ? '' : inflation}
              onChange={(e) => setInflation(e.target.value === '' ? 0 : Number(e.target.value))}
              className="w-full mt-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-400 mb-1">
              Current Retirement Savings (₹)
            </label>
            <input
              type="range"
              min="0"
              max="50000000"
              step="10000"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0</span>
              <span>25L</span>
              <span>5Cr</span>
            </div>
            <input
              type="number"
              min="0"
              step="10000"
              value={currentSavings === 0 ? '' : currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value === '' ? 0 : Number(e.target.value))}
              className="w-full mt-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-400 mb-1">
              Expected Annual Return (%)
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1%</span>
              <span>10%</span>
              <span>20%</span>
            </div>
            <input
              type="number"
              min="1"
              max="20"
              value={annualReturn === 0 ? '' : annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value === '' ? 0 : Number(e.target.value))}
              className="w-full mt-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-white"
            />
          </div>
        </div>

        <div className="bg-gray-700 rounded-xl p-6">
          {result && (
            <>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Years to Retirement</span>
                  <span className="font-bold text-white">{retirementAge - currentAge} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Current Savings</span>
                  <span className="font-bold text-white">₹{currentSavings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Estimated Corpus Required</span>
                  <span className="font-bold text-green-400">₹{result.corpusRequired.toLocaleString()}</span>
                </div>
                <div className="pt-4 border-t border-gray-600 mt-2">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-300">Monthly Savings Needed</span>
                    <span className="font-bold text-emerald-400">₹{result.monthlySaving.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-400 mt-4">
                  <p>This calculation estimates the corpus needed to maintain your current lifestyle in retirement, accounting for inflation.</p>
                  <p className="mt-2">The monthly savings amount is what you need to invest to reach your retirement goal.</p>
                </div>
              </div>
              <ResultPieChart data={pieData} />
            </>
          )}
        </div>
      </div>
    </CalculatorCard>
  );
};