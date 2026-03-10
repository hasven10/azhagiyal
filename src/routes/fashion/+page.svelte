<script>
  import styleBg from '$lib/images/style.webp';

  const sections = [
    {
      title: "Apparels",
      items: [
        { name: "Dresses", slug: "dresses" },
        { name: "Tops", slug: "tops" },
        { name: "Kurtas", slug: "kurtas" },
        { name: "Sarees", slug: "sarees" },
        { name: "Bottomwear", slug: "bottomwear" },
        { name: "Co-ord Sets", slug: "coord-sets" }
      ]
    },
    {
      title: "Accessories",
      items: [
        { name: "Jewelleries", slug: "jewelleries" },
        { name: "Bags", slug: "bags" },
        { name: "Earrings", slug: "earrings" }
      ]
    }
  ];
</script>

<section class="relative min-h-screen text-white overflow-hidden">

  <!-- Background -->
  <div 
    class="absolute inset-0 bg-cover bg-center"
    style="background-image: url({styleBg});">
  </div>

  <!-- Overlay -->
  <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>

  <div class="relative z-10 px-12 py-32 max-w-[1600px] mx-auto">

    <!-- Page Title -->
    <div class="text-center mb-24">
      <h1 class="text-6xl font-tamil text-templegold drop-shadow-xl">
        Fashion
      </h1>
      <p class="mt-4 text-lg font-display text-ivory">
        Explore curated collections
      </p>
    </div>

    {#each sections as section}

      <div class="mb-20">

        <h2 class="text-4xl font-tamil text-templegold mb-10 border-b border-templegold/40 pb-4">
          {section.title}
        </h2>

        <!-- Subcategory Cards -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

          {#each section.items as item}

            <a href={`/fashion/${item.slug}`}
               class="group relative h-60 rounded-3xl overflow-hidden shadow-2xl 
                      bg-white/5 backdrop-blur-md border border-white/10 
                      hover:border-templegold transition duration-500">

              <div class="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition"></div>

              <div class="absolute inset-0 flex items-center justify-center">
                <h3 class="text-2xl font-tamil text-white group-hover:text-templegold transition">
                  {item.name}
                </h3>
              </div>

              <!-- Gold Glow -->
              <div class="absolute inset-0 rounded-3xl 
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
