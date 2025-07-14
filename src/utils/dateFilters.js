const getDateRange = (period, startDate, endDate) => {
  const now = new Date();
  let start, end;

  switch (period) {
    case 'week':
      start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      end = now;
      break;
    
    case 'month':
      start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      end = now;
      break;
    
    case '3months':
      start = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      end = now;
      break;
    
    case 'custom':
      if (!startDate || !endDate) {
        throw new Error('Start date and end date are required for custom period');
      }
      start = new Date(startDate);
      end = new Date(endDate);
      
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error('Invalid date format');
      }
      
      if (start > end) {
        throw new Error('Start date must be before end date');
      }
      break;
    
    default:
      return null;
  }

  return { start, end };
};

module.exports = { getDateRange };