/**
 * Get only the first name from a full name
 * @param {string} fullName - The full name (e.g., "Ahmed Al Maktoum")
 * @returns {string} - Only the first name (e.g., "Ahmed")
 */
export const getFirstName = (fullName) => {
  if (!fullName || typeof fullName !== 'string') {
    return fullName || 'Seller';
  }
  
  // Split by space and get the first part
  const nameParts = fullName.trim().split(/\s+/);
  return nameParts[0] || fullName;
};

/**
 * Get the first letter of the first name for avatar initials
 * @param {string} fullName - The full name
 * @returns {string} - First letter of the first name
 */
export const getFirstNameInitial = (fullName) => {
  const firstName = getFirstName(fullName);
  return firstName.charAt(0).toLowerCase();
};

