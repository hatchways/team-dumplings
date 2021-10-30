export interface CustomerApiData {
  error?: any;
  customerId?: string;
}

export interface PaymentMethodApiData {
  error?: any;
  paymentProfiles?: PaymentProfile[];
}

export interface PaymentProfileUpdateApiData {
  error?: any;
  stripeResponse?: any;
}

export interface PaymentProfile {
  id: string;
  default: boolean;
  name: string;
  brand: string;
  expMonth: number;
  expYear: number;
  last4: string;
}
