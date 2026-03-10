<script lang="ts">
  import '../app.css';
  import {
    cartItems,
    cartAnim,
    cartToast,
    removeFromCart
  } from '$lib/stores/cart';

  let drawerOpen = false;

  let fashionOpen: boolean = false;
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const fashion = {
    apparels: [
      { name: "Dresses", slug: "dresses" },
      { name: "Tops", slug: "tops" },
      { name: "Kurtas", slug: "kurtas" },
      { name: "Sarees", slug: "sarees" },
      { name: "Bottomwear", slug: "bottomwear" },
      { name: "Co-ord Sets", slug: "coord-sets" }
    ],
    accessories: [
      { name: "Jewelleries", slug: "jewelleries" },
      { name: "Bags", slug: "bags" },
      { name: "Earrings", slug: "earrings" }
    ]
  };

  function openMenu() {
    if (timeout) clearTimeout(timeout);
    fashionOpen = true;
  }

  function closeMenu() {
    timeout = setTimeout(() => {
      fashionOpen = false;
    }, 200);
  }
</script>

<div class="min-h-screen font-body">

  <!-- NAVBAR -->
  <nav class="fixed top-0 left-0 w-full z-50
              px-12 py-6
              bg-black/50 backdrop-blur-lg
              text-white">

    <div class="flex items-center justify-between">

      <!-- LOGO -->
      <a href="/" 
         class="text-3xl font-display tracking-wide 
                hover:text-templegold transition">
        அழகியல்
      </a>

      <!-- CENTER MENU -->
      <div class="flex gap-12 text-lg font-display relative">

        <!-- FASHION -->
        <div class="relative">

          <button
            class="hover:text-templegold transition"
            on:mouseenter={openMenu}
            on:mouseleave={closeMenu}
            aria-haspopup="true"
            aria-expanded={fashionOpen}
          >
            Fashion
          </button>

          {#if fashionOpen}
            <div
              class="absolute left-1/2 -translate-x-1/2 top-full
                     mt-4
                     w-[700px]
                     bg-black/95 backdrop-blur-xl
                     rounded-2xl
                     border border-templegold/30
                     shadow-2xl
                     p-10"
              role="menu"
              on:mouseenter={openMenu}
              on:mouseleave={closeMenu}
            >

              <div class="grid grid-cols-2 gap-16">

                <div>
                  <h3 class="text-templegold mb-5 text-lg font-semibold">
                    Apparels
                  </h3>

                  <div class="flex flex-col gap-3">
                    {#each fashion.apparels as item}
                      <a
                        href={`/fashion/${item.slug}`}
                        role="menuitem"
                        class="hover:text-templegold transition"
                      >
                        {item.name}
                      </a>
                    {/each}
                  </div>
                </div>

                <div>
                  <h3 class="text-templegold mb-5 text-lg font-semibold">
                    Accessories
                  </h3>

                  <div class="flex flex-col gap-3">
                    {#each fashion.accessories as item}
                      <a
                        href={`/fashion/${item.slug}`}
                        role="menuitem"
                        class="hover:text-templegold transition"
                      >
                        {item.name}
                      </a>
                    {/each}
                  </div>
                </div>

              </div>
            </div>
          {/if}
        </div>

        <a href="/brass" class="hover:text-templegold transition">
          Brass
        </a>

        <a href="/terracotta" class="hover:text-templegold transition">
          Terracotta
        </a>

        <a href="/wood" class="hover:text-templegold transition">
          Wood
        </a>

      </div>

      <!-- RIGHT -->
      <div class="flex gap-8 text-base font-display items-center">

        <button class="hover:text-templegold transition">
          Search
        </button>

        <!-- CART ICON -->
        <button
          class="relative group"
          on:click={() => (drawerOpen = true)}
        >

          <!-- Shake animation -->
          <svg
            class="w-7 h-7 transition-transform duration-300
                  {$cartAnim ? 'animate-bounce scale-110' : ''}
                  group-hover:text-templegold"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 6h13M7 13L5.4 5M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
          </svg>

          <!-- BADGE -->
          {#if $cartItems.length > 0}
            <span
              class="absolute -top-2 -right-3
                    bg-templegold text-black text-xs
                    w-5 h-5 flex items-center justify-center
                    rounded-full font-semibold
                    transition-all duration-300
                    {$cartAnim ? 'scale-125 shadow-lg shadow-templegold/60' : ''}"
            >
              {$cartItems.reduce(
                (sum: number, i) => sum + i.quantity,
                0
              )}
            </span>
          {/if}
        </button>

      </div>


    </div>
  </nav>


  <!-- CART DRAWER -->
      <div
        class="fixed top-0 right-0 h-full w-[400px]
              bg-black/95 backdrop-blur-xl
              border-l border-templegold/30
              shadow-2xl
              transform transition-transform duration-500
              {drawerOpen ? 'translate-x-0' : 'translate-x-full'}
              z-50"
      >

        <div class="p-8 text-white h-full flex flex-col">

          <div class="flex justify-between items-center mb-8">
            <h2 class="text-2xl font-display">Your Cart</h2>
            <button on:click={() => (drawerOpen = false)}>✕</button>
          </div>

          {#if $cartItems.length === 0}
            <p class="text-white/70">Cart is empty</p>
          {:else}

            <div class="flex-1 overflow-y-auto space-y-4">

              {#each $cartItems as item}
                <div class="flex justify-between items-center border-b border-white/10 pb-4">
                  <div>
                    <p>{item.name}</p>
                    <p class="text-templegold">
                      RM {item.price} × {item.quantity}
                    </p>
                  </div>
                  <button
                    class="text-red-400"
                    on:click={() => removeFromCart(item.name)}
                  >
                    Remove
                  </button>
                </div>
              {/each}

            </div>

            <div class="mt-6 border-t border-white/10 pt-6">

              <div class="flex justify-between text-lg font-semibold mb-4">
                <span>Total</span>
                <span>
                  RM {$cartItems.reduce(
                    (sum: number, i) => sum + i.price * i.quantity,
                    0
                  )}
                </span>
              </div>

              <a
                href="/checkout"
                class="block text-center bg-templegold text-black py-3 rounded-lg"
              >
                Proceed to Checkout
              </a>

            </div>

          {/if}

        </div>
      </div>


  <main>
    <slot />
  </main>

  {#if $cartToast}
  <div
    class="fixed top-24 right-10
           bg-templegold text-black
           px-6 py-3 rounded-xl
           shadow-lg
           animate-fadeIn
           z-50"
  >
    Item added to cart ✓
  </div>
{/if}


</div>
