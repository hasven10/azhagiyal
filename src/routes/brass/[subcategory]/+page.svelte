<script>
  import styleBg from '$lib/images/brass.webp';
  import { cart } from '$lib/stores/cart';
  export let data;

  $: subcategory = data.subcategory;

  const products = [
    { name: "Traditional Diya", category: "diyas", price: 45 },
    { name: "Hanging Diya with Bells", category: "diyas", price: 120 },
    { name: "Peacock Diya", category: "diyas", price: 85 },
    
    { name: "Temple Bell", category: "bells", price: 150 },
    { name: "Small Pooja Bell", category: "bells", price: 35 },

    { name: "Ganesha Statue", category: "statues", price: 250 },
    { name: "Buddha Statue", category: "statues", price: 300 },
    { name: "Nataraja Statue", category: "statues", price: 450 },

    { name: "Brass Tumbler Glass", category: "tumblers", price: 40 },
    { name: "Engraved Tumbler Set", category: "tumblers", price: 110 },

    { name: "Thali Plate Set", category: "plates", price: 180 },
    { name: "Decorative Brass Plate", category: "plates", price: 130 },

    { name: "Water Storage Pot", category: "pots", price: 320 },
    { name: "Small Brass Pot", category: "pots", price: 90 }
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
