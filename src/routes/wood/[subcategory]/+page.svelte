<script>
  import styleBg from '$lib/images/wood.webp';
  import { cart } from '$lib/stores/cart';
  export let data;

  $: subcategory = data.subcategory;

  const products = [
    { name: "Teak Side Table", category: "side-tables", price: 350 },
    { name: "Rosewood End Table", category: "side-tables", price: 420 },
    
    { name: "Carved Dining Chair", category: "chairs", price: 290 },
    { name: "Rocking Chair", category: "chairs", price: 550 },

    { name: "Wooden Bar Stool", category: "stools", price: 180 },
    { name: "Minimalist Step Stool", category: "stools", price: 110 },

    { name: "Wall Carving Panel", category: "carvings", price: 800 },
    { name: "Elephant Carving", category: "carvings", price: 450 },

    { name: "Vintage Wood Frame", category: "frames", price: 120 },
    { name: "Simple Photo Frame", category: "frames", price: 65 },

    { name: "Jewelry Box", category: "boxes", price: 150 },
    { name: "Storage Trunk", category: "boxes", price: 600 },

    { name: "Acacia Cutting Board", category: "cutting-boards", price: 90 },
    { name: "End-Grain Chopping Block", category: "cutting-boards", price: 210 },

    { name: "Large Salad Bowl", category: "bowls", price: 130 },
    { name: "Soup Bowl Set", category: "bowls", price: 160 },

    { name: "Wooden Spatula Set", category: "spoons", price: 45 },
    { name: "Salad Tossers", category: "spoons", price: 60 }
  ];

  $: filtered = products.filter(
    (p) => p.category === subcategory
  );
</script>

<section class="relative min-h-screen text-white overflow-hidden">

  <!-- Background -->
  <div 
    class="absolute inset-0 bg-cover bg-center"
    style="background-image: url({styleBg});">
  </div>

  <!-- Overlay -->
  <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>

  <div class="relative z-10 px-4 sm:px-8 lg:px-12 pt-24 pb-12 sm:py-24 max-w-[1600px] mx-auto">

    <h1 class="text-3xl sm:text-4xl lg:text-5xl font-tamil text-templegold mb-8 sm:mb-12 lg:mb-16 capitalize text-center">
      {subcategory.replace('-', ' ')}
    </h1>

    {#if filtered.length === 0}
      <p class="text-lg sm:text-xl text-ivory font-display text-center">
        No products found.
      </p>
    {/if}

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">

      {#each filtered as product}

        <div class="group bg-white/5 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden 
                    border border-white/10 hover:border-templegold transition duration-500">

          <div class="h-40 sm:h-56 lg:h-72 bg-black/20 flex items-center justify-center relative">
            <span class="text-sm sm:text-lg font-display text-ivory/60">
              Product Image
            </span>
          </div>

          <div class="p-3 sm:p-5 lg:p-6 space-y-1.5 sm:space-y-3">
            <h3 class="text-sm sm:text-lg lg:text-xl font-display text-white group-hover:text-templegold transition
                       leading-tight">
              {product.name}
            </h3>

            <p class="text-templegold font-semibold text-sm sm:text-base">
              RM {product.price}
            </p>

            <button
              class="mt-2 sm:mt-4 w-full py-1.5 sm:py-2 border border-templegold text-templegold 
                    text-xs sm:text-sm lg:text-base
                    rounded-lg sm:rounded-none
                    hover:bg-templegold hover:text-black transition"
              on:click={() => cart({ name: product.name, price: product.price })}
            >
              Add to Cart
            </button>
          </div>

        </div>

      {/each}

    </div>

  </div>

</section>
