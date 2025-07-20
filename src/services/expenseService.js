export const submitExpense = async (expenseData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(expenseData)
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Failed to submit expense');
    }

    return await response.json();
  } catch (err) {
    console.error('Expense submission error:', err.message);
    throw err;
  }
};
