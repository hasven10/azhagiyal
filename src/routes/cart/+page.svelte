<script lang="ts">
  import { cart } from '$lib/stores/cart';
</script>

<section class="min-h-screen bg-ivory px-12 py-32">

  <h1 class="text-4xl font-tamil text-kumkum mb-12">
    Your Cart
  </h1>

  {#if $cart.length === 0}
    <p class="text-lg text-peacock">Your cart is empty.</p>
  {:else}

    <div class="space-y-6">

      {#each $cart as item}

        <div class="flex justify-between items-center bg-white p-6 rounded-2xl shadow">

          <div>
            <h3 class="text-xl font-display">{item.name}</h3>
            <p class="text-templegold">
              RM {item.price} × {item.quantity}
            </p>
          </div>

          <button
            class="text-kumkum hover:text-black transition"
            on:click={() => cart.remove(item.name)}
          >
            Remove
          </button>

        </div>

      {/each}

    </div>

    <div class="mt-12 text-2xl font-semibold">
      Total: RM {$cart.reduce((sum, i) => sum + i.price * i.quantity, 0)}
    </div>

    <a
      href="/checkout"
      class="mt-8 inline-block px-8 py-3 bg-kumkum text-white rounded-lg hover:bg-black transition"
    >
      Proceed to Checkout
    </a>

  {/if}

</section>
