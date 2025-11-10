export interface PaymentRecord {
  category: string;
  trNumber: string;
  name: string;
  email: string;
  mobile: string;
  date: string; // ✅ Added date field
}
