<script>
  import bg from '$lib/images/wood.webp';

  const sections = [
    {
      title: "Furniture",
      items: [
        { name: "Side Tables", slug: "side-tables" },
        { name: "Chairs", slug: "chairs" },
        { name: "Stools", slug: "stools" }
      ]
    },
    {
      title: "Decor",
      items: [
        { name: "Carvings", slug: "carvings" },
        { name: "Frames", slug: "frames" },
        { name: "Boxes", slug: "boxes" }
      ]
    },
    {
      title: "Kitchenware",
      items: [
        { name: "Cutting Boards", slug: "cutting-boards" },
        { name: "Bowls", slug: "bowls" },
        { name: "Spoons", slug: "spoons" }
      ]
    }
  ];
</script>

<section class="relative min-h-screen text-white overflow-hidden">

  <!-- Background -->
  <div 
    class="absolute inset-0 bg-cover bg-center"
    style="background-image: url({bg});">
  </div>

  <!-- Overlay -->
  <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>

  <div class="relative z-10 px-4 sm:px-8 lg:px-12 pt-24 pb-12 sm:py-32 max-w-[1600px] mx-auto">

    <!-- Page Title -->
    <div class="text-center mb-12 sm:mb-16 lg:mb-24">
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-tamil text-templegold drop-shadow-xl">
        Wood
      </h1>
      <p class="mt-3 sm:mt-4 text-base sm:text-lg font-display text-ivory">
        Discover timeless craftsmanship
      </p>
    </div>

    {#each sections as section}

      <div class="mb-12 sm:mb-16 lg:mb-20">

        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-tamil text-templegold mb-6 sm:mb-8 lg:mb-10 
                   border-b border-templegold/40 pb-3 sm:pb-4">
          {section.title}
        </h2>

        <!-- Subcategory Cards -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-10">

          {#each section.items as item}

            <a href={`/wood/${item.slug}`}
               class="group relative h-36 sm:h-48 lg:h-60 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl 
                      bg-white/5 backdrop-blur-md border border-white/10 
                      hover:border-templegold transition duration-500">

              <div class="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition"></div>

              <div class="absolute inset-0 flex items-center justify-center">
                <h3 class="text-lg sm:text-xl lg:text-2xl font-tamil text-white group-hover:text-templegold transition
                           text-center px-2">
                  {item.name}
                </h3>
              </div>

              <!-- Gold Glow -->
              <div class="absolute inset-0 rounded-2xl sm:rounded-3xl 
                          border border-transparent
                          group-hover:shadow-[0_0_40px_rgba(212,175,55,0.6)]
                          transition duration-500">
              </div>

            </a>

          {/each}

        </div>

      </div>

    {/each}

  </div>

</section>
