<script lang="ts">
  import styleBg from '$lib/images/style.webp';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  let email = '';
  let password = '';
  let error = '';
  let isLoading = false;

  $: redirect = $page.url.searchParams.get('redirect') || '/account';

  async function handleLogin() {
    error = '';
    isLoading = true;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        error = data.error || 'Login failed.';
        isLoading = false;
        return;
      }

      goto(redirect, { replaceState: true, invalidateAll: true });
    } catch (err) {
      error = 'Something went wrong. Please try again.';
      isLoading = false;
    }
  }
</script>

<section class="relative min-h-screen text-white overflow-hidden">

  <div class="absolute inset-0 bg-cover bg-center"
       style="background-image: url({styleBg});">
  </div>
  <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/85"></div>

  <div class="relative z-10 px-4 sm:px-8 pt-24 pb-16 sm:py-32 max-w-[480px] mx-auto">

    <div class="text-center mb-10">
      <h1 class="text-3xl sm:text-4xl font-tamil text-templegold mb-3">Login</h1>
      <p class="text-ivory/60 font-display text-sm">Welcome back to Azhagiyal Store</p>
    </div>

    <div class="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8">

      {#if error}
        <div class="bg-red-500/20 border border-red-500/40 rounded-lg px-4 py-3 mb-6 text-red-300 text-sm font-display">
          {error}
        </div>
      {/if}

      <div class="space-y-5">
        <div>
          <label for="email" class="block text-sm font-display text-ivory/60 mb-2">Email</label>
          <input
            id="email"
            type="email"
            bind:value={email}
            placeholder="Enter your email"
            class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3
                   text-white placeholder-white/30 font-display text-sm sm:text-base
                   focus:outline-none focus:border-templegold focus:ring-1 focus:ring-templegold transition"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-display text-ivory/60 mb-2">Password</label>
          <input
            id="password"
            type="password"
            bind:value={password}
            placeholder="Enter your password"
            on:keydown={(e) => e.key === 'Enter' && handleLogin()}
            class="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3
                   text-white placeholder-white/30 font-display text-sm sm:text-base
                   focus:outline-none focus:border-templegold focus:ring-1 focus:ring-templegold transition"
          />
        </div>

        <button
          on:click={handleLogin}
          disabled={isLoading}
          class="w-full bg-templegold text-black py-3 rounded-lg font-display font-semibold
                 text-base sm:text-lg hover:bg-templegold/90 transition
                 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </div>

      <p class="text-center text-ivory/50 text-sm font-display mt-6">
        Don't have an account?
        <a href="/auth/register" class="text-templegold hover:underline">Register here</a>
      </p>

    </div>

  </div>
</section>