import React from 'react';

const Subscriptions = ({ expenses = [] }) => {
  const recurring = expenses.filter(exp => exp.isRecurring);

  return (
    <div className="dashboard-section subscriptions">
      <h3>Subscriptions</h3>
      {recurring.length === 0 ? (
        <p>No active subscriptions</p>
      ) : (
        <ul>
          {recurring.map(sub => (
            <li key={sub._id}>
              <span>{sub.title}</span>
              <span>₹{sub.amount}</span>
              <span>{new Date(sub.date).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Subscriptions;
