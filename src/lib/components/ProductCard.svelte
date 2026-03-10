<script>
  export let product;
</script>

<div class="group bg-white shadow-lg rounded-md overflow-hidden hover:shadow-2xl transition duration-300">

  <div class="aspect-[4/5] bg-sandal/10 flex items-center justify-center">
    <img src={product.image} alt={product.name} class="object-cover w-full h-full group-hover:scale-105 transition duration-500" />
  </div>

  <div class="p-5 space-y-2">
    <h3 class="font-display text-lg text-peacock">
      {product.name}
    </h3>

    <p class="text-templegold font-semibold">
      ${product.price}
    </p>

    <button class="w-full mt-3 py-2 border border-kumkum text-kumkum hover:bg-kumkum hover:text-white transition">
      Add to Cart
    </button>
  </div>

</div>
