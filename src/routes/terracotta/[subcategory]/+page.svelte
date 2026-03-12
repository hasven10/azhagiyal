<script>
  import styleBg from '$lib/images/terracotta.webp';
  import { cart } from '$lib/stores/cart';
  export let data;

  $: subcategory = data.subcategory;

  const products = [
    { name: "Tall Clay Vase", category: "vases", price: 89 },
    { name: "Patterned Vase", category: "vases", price: 120 },
    { name: "Small Table Vase", category: "vases", price: 45 },
    
    { name: "Garden Pot", category: "pots", price: 150 },
    { name: "Indoor Planter", category: "pots", price: 75 },

    { name: "Clay Motif Art", category: "wall-art", price: 200 },
    { name: "Terracotta Masks", category: "wall-art", price: 250 },

    { name: "Hanging Clay Lamp", category: "lamps", price: 130 },
    { name: "Table Lamp", category: "lamps", price: 95 },

    { name: "Clay Tea Cups (Set of 4)", category: "cups", price: 60 },
    { name: "Terracotta Mug", category: "cups", price: 25 },

    { name: "Dinner Plate", category: "plates", price: 35 },
    { name: "Serving Platter", category: "plates", price: 55 },

    { name: "Soup Bowl", category: "bowls", price: 30 },
    { name: "Decorative Bowl", category: "bowls", price: 80 }
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
