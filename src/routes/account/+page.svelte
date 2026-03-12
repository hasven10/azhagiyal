<script lang="ts">
  import styleBg from '$lib/images/style.webp';
  import { goto, invalidateAll } from '$app/navigation';

  export let data;

  $: user = data.user;

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    await invalidateAll();
    goto('/', { replaceState: true });
  }
</script>

<section class="relative min-h-screen text-white overflow-hidden">

  <div class="absolute inset-0 bg-cover bg-center"
       style="background-image: url({styleBg});">
  </div>
  <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/85"></div>

  <div class="relative z-10 px-4 sm:px-8 lg:px-12 pt-24 pb-16 sm:py-32 max-w-[900px] mx-auto">

    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
      <div>
        <h1 class="text-3xl sm:text-4xl font-tamil text-templegold">
          Welcome, {user?.full_name}
        </h1>
        <p class="text-ivory/60 font-display text-sm mt-2">{user?.email}</p>
      </div>
      <button
        on:click={handleLogout}
        class="border border-templegold/50 text-templegold px-6 py-2 rounded-lg
               font-display text-sm hover:bg-templegold hover:text-black transition"
      >
        Logout
      </button>
    </div>

    <!-- Account Navigation Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

      <a href="/account/profile"
         class="group bg-white/5 backdrop-blur-md rounded-2xl border border-white/10
                hover:border-templegold p-6 sm:p-8 transition duration-500">
        <div class="text-3xl mb-4">👤</div>
        <h3 class="text-lg font-display text-white group-hover:text-templegold transition mb-2">
          Profile
        </h3>
        <p class="text-ivory/50 text-sm font-display">
          Edit your name, email, phone, and password
        </p>
      </a>

      <a href="/account/addresses"
         class="group bg-white/5 backdrop-blur-md rounded-2xl border border-white/10
                hover:border-templegold p-6 sm:p-8 transition duration-500">
        <div class="text-3xl mb-4">📍</div>
        <h3 class="text-lg font-display text-white group-hover:text-templegold transition mb-2">
          Addresses
        </h3>
        <p class="text-ivory/50 text-sm font-display">
          Manage your shipping addresses
        </p>
      </a>

      <a href="/account/orders"
         class="group bg-white/5 backdrop-blur-md rounded-2xl border border-white/10
                hover:border-templegold p-6 sm:p-8 transition duration-500">
        <div class="text-3xl mb-4">📦</div>
        <h3 class="text-lg font-display text-white group-hover:text-templegold transition mb-2">
          Orders
        </h3>
        <p class="text-ivory/50 text-sm font-display">
          View your order history and track deliveries
        </p>
      </a>

    </div>

  </div>
</section>