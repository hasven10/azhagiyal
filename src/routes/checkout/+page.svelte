//src/lib/routes/checkout/+page.svelte

<script lang="ts">
  import mainImage from '$lib/images/main.webp';
  import { cartItems, clearCart } from '$lib/stores/cart';
  import { onMount } from 'svelte';


  const SENANGPAY_URL = 'https://app.senangpay.my/payment/';
  const MERCHANT_ID = '477177312786050';
  const SECRET_KEY = 'SK-ysSK2uSAGVCpFvPB0vxu';

  let name = '';
  let email = '';
  let phone = '';
  let items: { name: string; price: number; quantity: number }[] = [];
  let total = 0;
  let isSubmitting = false;

  onMount(() => {
    const unsub = cartItems.subscribe((value) => {
      items = value;
      total = value.reduce((sum, i) => sum + i.price * i.quantity, 0);
    });
    return unsub;
  });

  async function generateHash(secretKey: string, detail: string, amount: string, orderId: string) {
    const str = secretKey + detail + amount + orderId;
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secretKey);
    const msgData = encoder.encode(str);

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', cryptoKey, msgData);
    const hashArray = Array.from(new Uint8Array(signature));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  async function handleCheckout() {
    if (!name || !email || !phone) {
      alert('Please fill in all fields.');
      return;
    }

    if (items.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    isSubmitting = true;

    try {
      // Build order details
      const detail = items
        .map((i) => `${i.name}_x${i.quantity}`)
        .join(',_');

      const amount = total.toFixed(2);
      const orderId = 'AZH-' + Date.now();

      // Generate secure hash
      const hash = await generateHash(SECRET_KEY, detail, amount, orderId);

      // Create and submit the form to senangPay
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = SENANGPAY_URL + MERCHANT_ID;

      const fields = {
        detail: detail,
        amount: amount,
        order_id: orderId,
        hash: hash,
        name: name,
        email: email,
        phone: phone
      };

      for (const [key, value] of Object.entries(fields)) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Something went wrong. Please try again.');
      isSubmitting = false;
    }
  }
</script>

<section class="relative min-h-screen text-white overflow-hidden">

  <div
    class="absolute inset-0 bg-cover bg-center"
    style="background-image: url({mainImage});">
  </div>

  <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/85"></div>

  <div class="relative z-10 px-4 sm:px-8 lg:px-12 pt-24 pb-16 sm:py-32 max-w-[700px] mx-auto">

    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-tamil text-templegold mb-8 sm:mb-12">
      Checkout
    </h1>

    {#if items.length === 0}

      <div class="text-center py-16">
        <p class="text-xl text-ivory/70 font-display mb-6">Your cart is empty</p>
        <a href="/fashion" class="inline-block bg-templegold text-black px-8 py-3 rounded-lg font-display font-semibold
                                   hover:bg-templegold/90 transition">
          Continue Shopping
        </a>
      </div>

    {:else}

      <!-- Order Summary -->
      <div class="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 sm:p-8 mb-8">
        <h2 class="text-xl sm:text-2xl font-display text-templegold mb-6">Order Summary</h2>

        <div class="space-y-3">
          {#each items as item}
            <div class="flex justify-between items-center text-sm sm:text-base">
              <span class="text-ivory/80 font-display">
                {item.name} <span class="text-ivory/40">×{item.quantity}</span>
              </span>
              <span class="text-templegold font-semibold">
                RM {(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          {/each}
        </div>

        <div class="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
          <span class="text-lg sm:text-xl font-display font-semibold">Total</span>
          <span class="text-xl sm:text-2xl text-templegold font-semibold">
            RM {total.toFixed(2)}
          </span>
        </div>
      </div>

      <!-- Customer Details Form -->
      <div class="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 sm:p-8 mb-8">
        <h2 class="text-xl sm:text-2xl font-display text-templegold mb-6">Your Details</h2>

        <div class="space-y-5">
          <div>
            <label for="name" class="block text-sm font-display text-ivory/60 mb-2">Full Name</label>
            <input
              id="name"
              type="text"
              bind:value={name}
              placeholder="Enter your full name"
              class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3
                     text-white placeholder-white/30 font-display text-sm sm:text-base
                     focus:outline-none focus:border-templegold focus:ring-1 focus:ring-templegold
                     transition"
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-display text-ivory/60 mb-2">Email</label>
            <input
              id="email"
              type="email"
              bind:value={email}
              placeholder="Enter your email address"
              class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3
                     text-white placeholder-white/30 font-display text-sm sm:text-base
                     focus:outline-none focus:border-templegold focus:ring-1 focus:ring-templegold
                     transition"
            />
          </div>

          <div>
            <label for="phone" class="block text-sm font-display text-ivory/60 mb-2">Phone Number</label>
            <input
              id="phone"
              type="tel"
              bind:value={phone}
              placeholder="e.g. 0123456789"
              class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3
                     text-white placeholder-white/30 font-display text-sm sm:text-base
                     focus:outline-none focus:border-templegold focus:ring-1 focus:ring-templegold
                     transition"
            />
          </div>
        </div>
      </div>

      <!-- Pay Button -->
      <button
        on:click={handleCheckout}
        disabled={isSubmitting}
        class="w-full bg-templegold text-black py-4 rounded-xl font-display font-semibold
               text-lg sm:text-xl
               hover:bg-templegold/90 transition
               disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {#if isSubmitting}
          Redirecting to payment...
        {:else}
          Pay RM {total.toFixed(2)}
        {/if}
      </button>

      <p class="text-center text-ivory/40 text-xs sm:text-sm mt-4 font-display">
        You will be redirected to senangPay's secure payment page
      </p>

      <!-- Payment methods note -->
      <div class="mt-6 flex justify-center gap-4 text-ivory/30 text-xs font-display">
        <span>FPX</span>
        <span>•</span>
        <span>Visa</span>
        <span>•</span>
        <span>Mastercard</span>
        <span>•</span>
        <span>E-Wallet</span>
      </div>

    {/if}

  </div>

</section>