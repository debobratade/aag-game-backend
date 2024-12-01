function generateDataDeletionUrl(userId: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourapp.com'; // Ensure this environment variable is set
    return `${baseUrl}/deletion-status?id=${userId}&confirmation_code=del_${userId}`;
  }
  
  // Example usage
  const userId = '1234567890';
  const deletionUrl = generateDataDeletionUrl(userId);
  console.log(`Data Deletion URL: ${deletionUrl}`);
  