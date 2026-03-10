<script>
  import { onMount } from 'svelte';
  import mainImage from '$lib/images/main.jpg';
  import fashionImage from '$lib/images/fashion.jpg';
  import brassImage from '$lib/images/brass.jpg';
  import woodImage from '$lib/images/wood.jpg';
  import terracottaImage from '$lib/images/terracotta.jpg';

  let scrollY = 0;
  let visible = false;

  onMount(() => {
    visible = true;
    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
    });
  });
</script>

<section 
  class="relative min-h-screen flex flex-col justify-center items-center text-white overflow-hidden"
>

  <!-- Parallax Background -->
  <div 
    class="absolute inset-0 bg-cover bg-center transition-transform duration-300"
    style="background-image: url({mainImage});
           transform: translateY({scrollY * 0.2}px);">
  </div>

  <!-- Softer Overlay -->
  <div class="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/40"></div>

  <div class="relative z-10 text-center px-8 max-w-[1600px] w-full transition-all duration-1000"
       class:opacity-100={visible}
       class:opacity-0={!visible}>

    <!-- Tamil Heading -->
    <h1 class="text-6xl md:text-7xl font-tamil tracking-wide text-templegold drop-shadow-xl">
      அழகியல்
    </h1>

    <p class="mt-6 text-xl md:text-2xl text-ivory leading-relaxed font-display">
      From the ancient land of culture and colours  
      to your loving homes
    </p>

    <!-- Wider Cinematic Cards -->
    <div class="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

      {#each [
        { title: 'Fashion', img: fashionImage, link: '/fashion/' },
        { title: 'Brass', img: brassImage, link: '/brass/' },
        { title: 'Terracotta', img: terracottaImage, link: '/terracotta/' },
        { title: 'Wood', img: woodImage, link: '/wood/' }
        
      ] as item}

        <a href={item.link}
           class="group relative overflow-hidden rounded-3xl shadow-2xl 
                  h-80 w-full transition duration-700">

          <!-- Image -->
          <img src={item.img}
               alt={item.title}
               class="absolute inset-0 w-full h-full object-cover 
                      group-hover:scale-110 transition duration-700" />

          <!-- Overlay -->
          <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>

          <!-- Gold Glow -->
          <div class="absolute inset-0 rounded-3xl 
                      border border-transparent
                      group-hover:border-templegold 
                      group-hover:shadow-[0_0_50px_rgba(212,175,55,0.7)]
                      transition duration-500">
          </div>

          <!-- Title -->
          <div class="absolute inset-0 flex items-center justify-center">
            <h2 class="text-3xl font-tamil text-white tracking-wide drop-shadow-lg">
              {item.title}
            </h2>
          </div>

        </a>

      {/each}

    </div>

  </div>

</section>
