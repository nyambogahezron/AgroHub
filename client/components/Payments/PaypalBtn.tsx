import { useEffect } from 'react';

export default function PayPalButton() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.paypal
        .Buttons({
          createOrder: async (data, actions) => {
            const res = await fetch('/api/paypal/create-order', {
              method: 'POST',
            });
            const details = await res.json();
            return details.id;
          },
          onApprove: async (data, actions) => {
            const res = await fetch('/api/paypal/capture-order', {
              method: 'POST',
              body: JSON.stringify({ orderID: data.orderID }),
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const details = await res.json();
            console.log('Payment captured:', details);
            alert('Payment Successful!');
          },
          onError: (err) => {
            console.error(err);
            alert('An error occurred during the transaction');
          },
        })
        .render('#paypal-button-container');
    };
  }, []);

  return <div id='paypal-button-container'></div>;
}
