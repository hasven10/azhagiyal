<script lang="ts">
  import { cart } from '$lib/stores/cart';
</script>

<section class="min-h-screen bg-ivory px-12 py-32">

  <h1 class="text-4xl font-tamil text-kumkum mb-12">
    Checkout
  </h1>

  {#if $cart.length === 0}
    <p>Your cart is empty.</p>
  {:else}

    <div class="grid md:grid-cols-2 gap-12">

      <!-- Customer Details -->
      <div class="space-y-6">

        <input placeholder="Full Name" class="w-full p-3 border rounded" />
        <input placeholder="Email" class="w-full p-3 border rounded" />
        <input placeholder="Address" class="w-full p-3 border rounded" />
        <input placeholder="City" class="w-full p-3 border rounded" />

      </div>

      <!-- Order Summary -->
      <div class="bg-white p-6 rounded-2xl shadow space-y-4">

        {#each $cart as item}
          <div class="flex justify-between">
            <span>{item.name} × {item.quantity}</span>
            <span>RM {item.price * item.quantity}</span>
          </div>
        {/each}

        <hr />

        <div class="flex justify-between font-semibold text-xl">
          <span>Total</span>
          <span>
            RM {$cart.reduce((sum, i) => sum + i.price * i.quantity, 0)}
          </span>
        </div>

        <button
          class="mt-6 w-full bg-templegold text-black py-3 rounded-lg opacity-70 cursor-not-allowed"
          disabled
        >
          Payment Coming Soon
        </button>

      </div>

    </div>

  {/if}

</section>
