/**
 * Formats a raw phone string dynamically as the user types.
 * Supports standard 10-digit US phone numbers: (XXX) XXX-XXXX
 * and 11-digit / +1 US formats: +1 (XXX) XXX-XXXX
 */
export function formatPhoneNumber(input: string): string {
  if (!input) return "";

  // Check if international prefix other than +1 is being entered
  const isOtherCountry = input.startsWith("+") && !input.startsWith("+1");
  if (isOtherCountry) {
    // Strip invalid characters but keep leading plus
    return "+" + input.slice(1).replace(/\D/g, "").slice(0, 15);
  }

  // Extract pure digits
  const digits = input.replace(/\D/g, "");
  if (digits.length === 0) return "";

  // Check for leading +1 or 11-digit starting with 1
  if (input.startsWith("+1") || (digits.startsWith("1") && digits.length > 10)) {
    const trimmed = digits.startsWith("1") ? digits.slice(1) : digits;
    const num = trimmed.slice(0, 10);

    if (num.length === 0) return "+1 ";
    if (num.length <= 3) return `+1 (${num}`;
    if (num.length <= 6) return `+1 (${num.slice(0, 3)}) ${num.slice(3)}`;
    return `+1 (${num.slice(0, 3)}) ${num.slice(3, 6)}-${num.slice(6, 10)}`;
  }

  // Standard 10-digit US format
  const num = digits.slice(0, 10);
  if (num.length < 4) {
    return num.length === 0 ? "" : `(${num}`;
  }
  if (num.length < 7) {
    return `(${num.slice(0, 3)}) ${num.slice(3)}`;
  }
  return `(${num.slice(0, 3)}) ${num.slice(3, 6)}-${num.slice(6, 10)}`;
}
