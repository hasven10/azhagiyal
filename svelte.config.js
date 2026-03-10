import adapter from '@sveltejs/adapter-node';

const config = {
  kit: {
    adapter: adapter({
      fallback: '404.html'
    }),
    prerender: {
      handleHttpError: 'warn'
    }
  }
};

export default config;