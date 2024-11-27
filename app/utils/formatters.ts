export const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{1})(\d{4})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}${match[4]}-${match[5]}`;
    }
    return phone;
  };
  