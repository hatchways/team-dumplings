import { CustomerApiData, PaymentMethodApiData, PaymentProfileUpdateApiData } from '../../interface/Payment';
import { FetchOptions } from '../../interface/FetchOptions';

export const createCustomer = async (name: string, email: string, phone: string): Promise<CustomerApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone }),
    credentials: 'include',
  };
  return await fetch(`/payments/customer`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({ error }));
};

export const listPaymentMethods = async (customerId: string): Promise<PaymentMethodApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/payments/method/${customerId}`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({ error }));
};

export const setDefaultPaymentProfile = async (
  customerId: string,
  cardId: string,
): Promise<PaymentProfileUpdateApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customerId, cardId }),
    credentials: 'include',
  };
  return await fetch(`/payments/customer`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({ error }));
};

export const createPaymentMethod = async (
  creditCardNumber: string,
  cvcField: string,
  expDate: string,
  name: string,
  customerId: string,
): Promise<PaymentProfileUpdateApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ creditCardNumber, cvcField, expDate, name, customerId }),
    credentials: 'include',
  };
  return await fetch(`/payments/method`, fetchOptions)
    .then((res) => res.json())
    .catch((error) => ({ error }));
};
