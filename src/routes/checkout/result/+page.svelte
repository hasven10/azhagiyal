<script>
  import mainImage from '$lib/images/main.webp';
  import { clearCart } from '$lib/stores/cart';
  import { onMount } from 'svelte';

  let status = 'loading';
  let statusId = '';
  let orderId = '';
  let transactionId = '';
  let message = '';

  onMount(() => {
    // senangPay redirects back with query parameters
    const params = new URLSearchParams(window.location.search);

    statusId = params.get('status_id') || '';
    orderId = params.get('order_id') || '';
    transactionId = params.get('transaction_id') || '';
    message = (params.get('msg') || '').replace(/_/g, ' ');

    if (statusId === '1') {
      status = 'success';
      // Clear the cart on successful payment
      clearCart();
    } else if (statusId === '2') {
      status = 'pending';
    } else if (statusId === '0') {
      status = 'failed';
    } else {
      status = 'unknown';
    }
  });
</script>

<section class="relative min-h-screen text-white overflow-hidden">

  <div
    class="absolute inset-0 bg-cover bg-center"
    style="background-image: url({mainImage});">
  </div>

  <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/85"></div>

  <div class="relative z-10 px-4 sm:px-8 lg:px-12 pt-24 pb-16 sm:py-32 max-w-[700px] mx-auto">

    {#if status === 'loading'}

      <div class="text-center py-20">
        <p class="text-xl text-ivory/70 font-display">Processing your payment...</p>
      </div>

    {:else if status === 'success'}

      <div class="text-center py-12 sm:py-20">
        <!-- Success Icon -->
        <div class="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-8 rounded-full bg-green-500/20 
                    flex items-center justify-center border-2 border-green-500">
          <svg class="w-10 h-10 sm:w-12 sm:h-12 text-green-400" fill="none" stroke="currentColor" 
               stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-tamil text-templegold mb-4">
          Payment Successful
        </h1>

        <p class="text-lg sm:text-xl text-ivory/70 font-display mb-8">
          Thank you for your purchase!
        </p>

        <div class="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 sm:p-8 
                    text-left max-w-[400px] mx-auto mb-10">
          <div class="space-y-3 text-sm sm:text-base font-display">
            <div class="flex justify-between">
              <span class="text-ivory/50">Order ID</span>
              <span class="text-ivory/90">{orderId}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-ivory/50">Transaction ID</span>
              <span class="text-ivory/90">{transactionId}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-ivory/50">Status</span>
              <span class="text-green-400">{message}</span>
            </div>
          </div>
        </div>

        <a href="/"
           class="inline-block bg-templegold text-black px-8 py-3 rounded-lg font-display font-semibold
                  hover:bg-templegold/90 transition">
          Continue Shopping
        </a>
      </div>

    {:else if status === 'pending'}

      <div class="text-center py-12 sm:py-20">
        <!-- Pending Icon -->
        <div class="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-8 rounded-full bg-yellow-500/20 
                    flex items-center justify-center border-2 border-yellow-500">
          <svg class="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400" fill="none" stroke="currentColor" 
               stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-tamil text-templegold mb-4">
          Payment Pending
        </h1>

        <p class="text-lg sm:text-xl text-ivory/70 font-display mb-4">
          Your payment is being processed.
        </p>
        <p class="text-ivory/50 font-display text-sm mb-8">
          Order ID: {orderId}
        </p>

        <a href="/"
           class="inline-block bg-templegold text-black px-8 py-3 rounded-lg font-display font-semibold
                  hover:bg-templegold/90 transition">
          Return to Home
        </a>
      </div>

    {:else}

      <div class="text-center py-12 sm:py-20">
        <!-- Failed Icon -->
        <div class="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-8 rounded-full bg-red-500/20 
                    flex items-center justify-center border-2 border-red-500">
          <svg class="w-10 h-10 sm:w-12 sm:h-12 text-red-400" fill="none" stroke="currentColor" 
               stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-tamil text-templegold mb-4">
          Payment Failed
        </h1>

        <p class="text-lg sm:text-xl text-ivory/70 font-display mb-4">
          {message || 'Something went wrong with your payment.'}
        </p>
        <p class="text-ivory/50 font-display text-sm mb-8">
          Order ID: {orderId}
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/checkout"
             class="inline-block bg-templegold text-black px-8 py-3 rounded-lg font-display font-semibold
                    hover:bg-templegold/90 transition">
            Try Again
          </a>
          <a href="/"
             class="inline-block border border-templegold text-templegold px-8 py-3 rounded-lg font-display font-semibold
                    hover:bg-templegold hover:text-black transition">
            Return to Home
          </a>
        </div>
      </div>

    {/if}

  </div>

</section>