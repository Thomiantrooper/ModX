import React, { useState } from 'react';
import { Table, message, InputNumber, Button } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Admincart = () => {
  const accountColumns = [
    {
      title: 'Account Type',
      dataIndex: 'accountType',
    },
    {
      title: 'Token Code',
      dataIndex: 'tokenCode',
    },
    {
      title: 'Discount Rate',
      dataIndex: 'discountRate',
    },
  ];

  const accountData = [
    {
      key: '1',
      accountType: 'Premium',
      tokenCode: '#0012',
      discountRate: '20%',
    },
    {
      key: '2',
      accountType: 'Silver Jubilee',
      tokenCode: '#0087',
      discountRate: '10%',
    },
    {
      key: '3',
      accountType: 'Platinum Jubilee',
      tokenCode: '#9871',
      discountRate: '15%',
    },
  ];

  const helmetColumns = [
    {
      title: 'Helmet Name',
      dataIndex: 'name',
    },
    {
      title: 'Helmet Count',
      dataIndex: 'count',
    },
  ];

  const helmetData = [
    {
      key: '1',
      name: 'Vega',
      count: 20,
    },
    {
      key: '2',
      name: 'Bolt',
      count: 15,
    },
    {
      key: '3',
      name: 'Axor',
      count: 10,
    },
    {
      key: '4',
      name: 'SMK',
      count: 8,
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%', marginRight: '20px' }}>
          <h1>Account Details</h1>
          <Table columns={accountColumns} dataSource={accountData} size="small" />
        </div>
        <div style={{ width: '50%' }}>
          <h1>Highly Purchased Helmets</h1>
          <Table columns={helmetColumns} dataSource={helmetData} size="small" />
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Calculator />
      </div>
      <div style={{ height: '50px' }}></div> {/* Create space between container and footer */}
    </div>
  );
};

const Calculator = () => {
  const [productTotal, setProductTotal] = useState(0);
  const [pricePerHelmet, setPricePerHelmet] = useState(0);
  const [countSold, setCountSold] = useState(0);
  const [bonusValue, setBonusValue] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [workerCount, setWorkerCount] = useState(0);
  const [staffAmount, setStaffAmount] = useState(0);
  const [workerAmount, setWorkerAmount] = useState(0);
  const [totalBonus, setTotalBonus] = useState(0);
  const [profitStatus, setProfitStatus] = useState(null);

  const calculateIncome = () => {
    return pricePerHelmet * countSold;
  };

  const calculateProfit = () => {
    const income = calculateIncome();
    const profit = income - productTotal;
    return profit >= 0 ? 'Profit' : 'Loss';
  };

  const handleCalculateProfit = () => {
    const status = calculateProfit();
    setProfitStatus(status);
    if (status === 'Profit') {
      message.success('The outcome tends to be profitable!');
    }
  };

  const handleBonusSubmit = () => {
    const totalEmployees = staffCount + workerCount;
    const totalBonusAmount = bonusValue * totalEmployees;
    const staffBonus = (staffCount / totalEmployees) * totalBonusAmount;
    const workerBonus = (workerCount / totalEmployees) * totalBonusAmount;
    setStaffAmount(staffBonus);
    setWorkerAmount(workerBonus);
    setTotalBonus(totalBonusAmount);
    message.success('Bonus credited to the employees!');
  };

  const generatePDFReport = () => {
    html2canvas(document.getElementById('report-container')).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgHeight = (canvas.height * 210) / canvas.width; // Scale image to A4 width
      pdf.addImage(imgData, 'PNG', 0, 0, 210, imgHeight);
      pdf.text(15, imgHeight + 10, "Our bonus distribution plan aims to recognize and reward outstanding contributions from our staff and workers. We have allocated percentages for different levels within the organization: 15% for the management team, 25% for supervisors and team leads, 40% for regular staff, and 20% for workers/technicians. Bonuses will be calculated based on performance metrics such as achieving targets, attendance records, and maintaining a positive work attitude. This ensures that bonuses are distributed fairly and transparently, reflecting both individual and team contributions. Our process includes performance evaluations, bonus calculations, and clear communication to ensure that everyone understands the criteria and feels motivated to excel.");
      pdf.text(15, imgHeight + 40, `Total Bonus Amount: ${totalBonus}`);
      pdf.text(15, imgHeight + 50, `Staff Amount: ${staffAmount}`);
      pdf.text(15, imgHeight + 60, `Worker Amount: ${workerAmount}`);
      pdf.text(15, imgHeight + 80, "CEO Signature");
      pdf.text(15, imgHeight + 90, "John Doe");
      pdf.text(15, imgHeight + 100, "CEO, XYZ Company");
      pdf.save("bonus_distribution_report.pdf");
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '50%' }}>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
          <h2 style={{ marginBottom: '10px' }}>Profit Calculator</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '10px' }}>
              <label>Product Manufacture Total:</label>
              <input type="number" value={productTotal} onChange={(e) => setProductTotal(e.target.value)} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Price Per Helmet:</label>
              <input type="number" value={pricePerHelmet} onChange={(e) => setPricePerHelmet(e.target.value)} />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Count Sold:</label>
              <input type="number" value={countSold} onChange={(e) => setCountSold(e.target.value)} />
            </div>
            <button style={{ padding: '8px 16px', borderRadius: '5px', cursor: 'pointer' }} onClick={handleCalculateProfit}>Calculate Profit</button>
          </div>
        </div>
        {profitStatus === 'Profit' && (
          <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
            <h2 style={{ marginBottom: '10px' }}>Bonus Distribution</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '10px' }}>
                <label>Bonus Value:</label>
                <input type="number" value={bonusValue} onChange={(e) => setBonusValue(e.target.value)} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Staff Count:</label>
                <input type="number" value={staffCount} onChange={(e) => setStaffCount(e.target.value)} />
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label>Worker Count:</label>
                <input type="number" value={workerCount} onChange={(e) => setWorkerCount(e.target.value)} />
              </div>
              <Button type="primary" onClick={handleBonusSubmit}>Submit Bonus</Button>
            </div>
          </div>
        )}
        {totalBonus > 0 && (
          <div id="report-container" style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
            <h2>Bonus Distribution Details</h2>
            <p>Total Bonus Amount: {totalBonus}</p>
            <p>Staff Amount: {staffAmount}</p>
            <p>Worker Amount: {workerAmount}</p>
            <Button type="primary" onClick={generatePDFReport}>Generate PDF Report</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admincart;
