<!--src/routes/+layout.svelte-->

<script lang="ts">
  import '../app.css';
  import logo from '$lib/images/logo.png';
  import {
    cartItems,
    cartAnim,
    cartToast,
    removeFromCart
  } from '$lib/stores/cart';

  export let data;
  $: user = data?.user;

  let drawerOpen = false;
  let mobileMenuOpen = false;

  let fashionOpen: boolean = false;
  let mobileFashionOpen: boolean = false;
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

  function closeMobileMenu() {
    mobileMenuOpen = false;
    mobileFashionOpen = false;
  }
</script>

<svelte:head>
  <title>Azhagiyal – Indian Heritage</title>
  <link rel="icon" href="/azhagiyal.svg" type="image/svg+xml" />
</svelte:head>

<div class="min-h-screen font-body flex flex-col">

  <!-- NAVBAR -->
  <nav class="fixed top-0 left-0 w-full z-50
              px-4 sm:px-8 lg:px-12 py-4 lg:py-6
              bg-black/50 backdrop-blur-lg
              text-white">

    <div class="flex items-center justify-between">


      <a href="/" class="flex items-center">
        <img src={logo} alt="Azhagiyal" class="h-10 lg:h-12">
      </a>

      <!-- CENTER MENU (desktop only) -->
      <div class="hidden lg:flex gap-12 text-lg font-display relative">

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
              tabindex="-1"
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

        <a href="/brass" class="hover:text-templegold transition">Brass</a>
        <a href="/terracotta" class="hover:text-templegold transition">Terracotta</a>
        <a href="/wood" class="hover:text-templegold transition">Wood</a>
      </div>

      <!-- RIGHT SIDE -->
      <div class="flex gap-4 sm:gap-6 text-base font-display items-center">

        <!-- LOGIN / ACCOUNT (desktop) -->
        {#if user}
          <a href="/account" class="hidden sm:block hover:text-templegold transition">
            {user.full_name}
          </a>
        {:else}
          <a href="/auth/login" class="hidden sm:block hover:text-templegold transition">
            Login
          </a>
        {/if}

        <!-- CART ICON -->
        <button
          class="relative group"
          on:click={() => (drawerOpen = true)}
        >
          <svg
            class="w-6 h-6 lg:w-7 lg:h-7 transition-transform duration-300
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

        <!-- HAMBURGER (mobile only) -->
        <button
          class="lg:hidden flex flex-col gap-1.5 p-1"
          on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span class="block w-6 h-0.5 bg-white transition-all duration-300
                       {mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}"></span>
          <span class="block w-6 h-0.5 bg-white transition-all duration-300
                       {mobileMenuOpen ? 'opacity-0' : ''}"></span>
          <span class="block w-6 h-0.5 bg-white transition-all duration-300
                       {mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}"></span>
        </button>
      </div>

    </div>
  </nav>

  <!-- MOBILE MENU OVERLAY -->
  {#if mobileMenuOpen}
    <button
      class="fixed inset-0 bg-black/60 z-40 lg:hidden"
      on:click={closeMobileMenu}
      aria-label="Close menu"
    ></button>
  {/if}

  <!-- MOBILE SLIDE-IN MENU -->
  <div
    class="fixed top-0 left-0 h-full w-[280px] sm:w-[320px]
           bg-black/95 backdrop-blur-xl
           border-r border-templegold/20
           shadow-2xl
           transform transition-transform duration-500 ease-out
           {mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
           z-50 lg:hidden
           overflow-y-auto"
  >
    <div class="p-6 pt-20 text-white font-display">

      <!-- LOGIN / ACCOUNT (mobile) -->
      {#if user}
        <a href="/account" class="text-lg mb-6 text-templegold block" on:click={closeMobileMenu}>
          {user.full_name}
        </a>
      {:else}
        <a href="/auth/login" class="text-lg mb-6 hover:text-templegold transition block" on:click={closeMobileMenu}>
          Login / Register
        </a>
      {/if}

      <!-- Fashion with accordion -->
      <div class="mb-4">
        <button
          class="text-lg w-full text-left flex justify-between items-center
                 hover:text-templegold transition"
          on:click={() => (mobileFashionOpen = !mobileFashionOpen)}
        >
          Fashion
          <svg
            class="w-4 h-4 transition-transform duration-300
                   {mobileFashionOpen ? 'rotate-180' : ''}"
            fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {#if mobileFashionOpen}
          <div class="mt-4 ml-4 space-y-6">
            <div>
              <h4 class="text-templegold text-sm font-semibold mb-3 uppercase tracking-wider">
                Apparels
              </h4>
              <div class="flex flex-col gap-2.5">
                {#each fashion.apparels as item}
                  <a
                    href={`/fashion/${item.slug}`}
                    class="text-white/80 hover:text-templegold transition text-base"
                    on:click={closeMobileMenu}
                  >
                    {item.name}
                  </a>
                {/each}
              </div>
            </div>
            <div>
              <h4 class="text-templegold text-sm font-semibold mb-3 uppercase tracking-wider">
                Accessories
              </h4>
              <div class="flex flex-col gap-2.5">
                {#each fashion.accessories as item}
                  <a
                    href={`/fashion/${item.slug}`}
                    class="text-white/80 hover:text-templegold transition text-base"
                    on:click={closeMobileMenu}
                  >
                    {item.name}
                  </a>
                {/each}
              </div>
            </div>
          </div>
        {/if}
      </div>

      <!-- Other links -->
      <a href="/brass" class="block text-lg py-3 hover:text-templegold transition"
         on:click={closeMobileMenu}>
        Brass
      </a>
      <a href="/terracotta" class="block text-lg py-3 hover:text-templegold transition"
         on:click={closeMobileMenu}>
        Terracotta
      </a>
      <a href="/wood" class="block text-lg py-3 hover:text-templegold transition"
         on:click={closeMobileMenu}>
        Wood
      </a>

    </div>
  </div>


  <!-- CART DRAWER -->
  {#if drawerOpen}
    <button
      class="fixed inset-0 bg-black/60 z-40"
      on:click={() => (drawerOpen = false)}
      aria-label="Close cart"
    ></button>
  {/if}

  <div
    class="fixed top-0 right-0 h-screen w-full sm:w-[400px]
          bg-black/95 backdrop-blur-xl
          border-l border-templegold/30
          shadow-2xl
          transform transition-transform duration-500
          {drawerOpen ? 'translate-x-0' : 'translate-x-full'}
          z-50 overflow-hidden"
  >
    <div class="p-6 sm:p-8 text-white h-full flex flex-col">

      <div class="flex justify-between items-center mb-8 shrink-0">
        <h2 class="text-2xl font-display">Your Cart</h2>
        <button on:click={() => (drawerOpen = false)} class="text-xl p-2">✕</button>
      </div>

      {#if $cartItems.length === 0}
        <p class="text-white/70">Cart is empty</p>
      {:else}

        <div class="flex-1 overflow-y-auto space-y-4 min-h-0">
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

        <div class="mt-6 border-t border-white/10 pt-6 shrink-0">
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
            class="block text-center bg-templegold text-black py-3 rounded-lg
                   font-semibold hover:bg-templegold/90 transition"
            on:click={() => (drawerOpen = false)}
          >
            Proceed to Checkout
          </a>
        </div>

      {/if}

    </div>
  </div>


  <!-- MAIN CONTENT -->
  <main class="flex-1">
    <slot />
  </main>

  <!-- FOOTER -->
  <footer class="bg-black text-white border-t border-templegold/15">
    <div class="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16">

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">

        <!-- Brand -->
        <div class="sm:col-span-2 lg:col-span-1">
          <a href="/" class="text-2xl font-display text-templegold tracking-wide">
            அழகியல்
          </a>
          <p class="mt-3 text-white/50 font-display text-sm leading-relaxed">
            From the ancient land of culture and colours to your loving homes.
          </p>
        </div>

        <!-- Shop -->
        <div>
          <h4 class="text-templegold font-display font-semibold text-sm uppercase tracking-wider mb-4">
            Shop
          </h4>
          <div class="flex flex-col gap-2.5">
            <a href="/fashion" class="text-white/60 hover:text-templegold transition text-sm font-display">Fashion</a>
            <a href="/brass" class="text-white/60 hover:text-templegold transition text-sm font-display">Brass</a>
            <a href="/terracotta" class="text-white/60 hover:text-templegold transition text-sm font-display">Terracotta</a>
            <a href="/wood" class="text-white/60 hover:text-templegold transition text-sm font-display">Wood</a>
          </div>
        </div>

        <!-- Policies -->
        <div>
          <h4 class="text-templegold font-display font-semibold text-sm uppercase tracking-wider mb-4">
            Policies
          </h4>
          <div class="flex flex-col gap-2.5">
            <a href="/terms" class="text-white/60 hover:text-templegold transition text-sm font-display">Terms &amp; Conditions</a>
            <a href="/privacy" class="text-white/60 hover:text-templegold transition text-sm font-display">Privacy Policy</a>
            <a href="/refund" class="text-white/60 hover:text-templegold transition text-sm font-display">Cancellation &amp; Refund</a>
            <a href="/shipping" class="text-white/60 hover:text-templegold transition text-sm font-display">Shipping Policy</a>
          </div>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="text-templegold font-display font-semibold text-sm uppercase tracking-wider mb-4">
            Contact
          </h4>
          <div class="flex flex-col gap-2.5">
            <a href="mailto:customer-care@azhagiyal.store" 
               class="text-white/60 hover:text-templegold transition text-sm font-display break-all">
              customer-care@azhagiyal.store
            </a>
          </div>
        </div>

      </div>

      <!-- Bottom bar -->
      <div class="mt-12 pt-6 border-t border-white/10 
                  flex flex-col sm:flex-row justify-between items-center gap-3">
        <p class="text-white/30 text-xs font-display">
          &copy; 2026 Azhagiyal Store. All rights reserved.
        </p>
        <div class="flex gap-6">
          <a href="/terms" class="text-white/30 hover:text-templegold transition text-xs font-display">Terms</a>
          <a href="/privacy" class="text-white/30 hover:text-templegold transition text-xs font-display">Privacy</a>
          <a href="/shipping" class="text-white/30 hover:text-templegold transition text-xs font-display">Shipping</a>
          <a href="/refund" class="text-white/30 hover:text-templegold transition text-xs font-display">Refund</a>
        </div>
      </div>

    </div>
  </footer>

  {#if $cartToast}
  <div
    class="fixed top-20 right-4 sm:right-10
           bg-templegold text-black
           px-4 sm:px-6 py-3 rounded-xl
           shadow-lg
           animate-fadeIn
           z-50
           text-sm sm:text-base"
  >
    Item added to cart ✓
  </div>
  {/if}

</div>