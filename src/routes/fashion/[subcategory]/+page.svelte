<script>
  import styleBg from '$lib/images/style.jpg';
  import { cart } from '$lib/stores/cart';
  export let data;

  $: subcategory = data.subcategory;

  const products = [
    { name: "Silk Saree", category: "sarees", price: 299 },
    { name: "Cotton Saree", category: "sarees", price: 199 },
    { name: "Kanchipuram Saree", category: "sarees", price: 129 },
    { name: "Sungadi Saree", category: "sarees", price: 89 },
    { name: "Banarasi Saree", category: "sarees", price: 159 },
    { name: "Silk Cotton Saree", category: "sarees", price: 139 },

    { name: "Anarkali Gown", category: "dresses", price: 189 },
    { name: "Floor-Length Anarkali", category: "dresses", price: 229 },
    { name: "Indo-Western Fusion Dress", category: "dresses", price: 199 },
    { name: "Embroidered Maxi Dress", category: "dresses", price: 159 },
    { name: "Handloom Cotton Midi Dress", category: "dresses", price: 129 },
    { name: "Chikankari Long Dress", category: "dresses", price: 179 },
    { name: "Banarasi Silk Dress", category: "dresses", price: 249 },
    { name: "Festive Sharara Set", category: "dresses", price: 219 },
    { name: "Printed Kalamkari Dress", category: "dresses", price: 149 },
    { name: "Mirror Work Party Dress", category: "dresses", price: 209 },
    { name: "Silk Blend Evening Dress", category: "dresses", price: 189 },
    { name: "Temple Border Ethnic Dress", category: "dresses", price: 199 },

    { name: "Handloom Cotton Kurta", category: "kurtas", price: 99 },
    { name: "Chikankari Embroidered Kurta", category: "kurtas", price: 139 },
    { name: "Kalamkari Printed Kurta", category: "kurtas", price: 119 },
    { name: "Banarasi Silk Kurta", category: "kurtas", price: 189 },
    { name: "Temple Border Festive Kurta", category: "kurtas", price: 159 },
    { name: "Ajrakh Block Print Kurta", category: "kurtas", price: 129 },
    { name: "Anarkali Style Kurta", category: "kurtas", price: 169 },
    { name: "Straight Cut Office Kurta", category: "kurtas", price: 109 },
    { name: "Pastel Linen Kurta", category: "kurtas", price: 119 },
    { name: "Mirror Work Celebration Kurta", category: "kurtas", price: 179 },
    { name: "Silk Blend Evening Kurta", category: "kurtas", price: 199 },
    { name: "Layered Indo-Western Kurta", category: "kurtas", price: 209 },

    { name: "Peplum Style Top", category: "tops", price: 79 },
    { name: "Ikat Print Short Top", category: "tops", price: 89 },
    { name: "Hand-Block Printed Crop Top", category: "tops", price: 69 },
    { name: "Ruffle Sleeve Casual Top", category: "tops", price: 59 },
    { name: "Boat Neck Festive Top", category: "tops", price: 99 },
    { name: "Tie-Front Cotton Top", category: "tops", price: 75 },
    { name: "Layered Flare Top", category: "tops", price: 85 },
    { name: "Mandarin Collar Ethnic Top", category: "tops", price: 109 },
    { name: "Kutch Patchwork Top", category: "tops", price: 119 },
    { name: "Sheer Overlay Designer Top", category: "tops", price: 129 },
    { name: "Asymmetric Hemline Top", category: "tops", price: 89 },
    { name: "Handwoven Khadi Top", category: "tops", price: 99 },

    { name: "Handloom Cotton Palazzo", category: "bottomwear", price: 79 },
    { name: "Straight Fit Cotton Pants", category: "bottomwear", price: 69 },
    { name: "Embroidered Sharara Pants", category: "bottomwear", price: 129 },
    { name: "Chanderi Silk Palazzo", category: "bottomwear", price: 149 },
    { name: "Printed Dhoti Pants", category: "bottomwear", price: 89 },
    { name: "Pleated Long Skirt", category: "bottomwear", price: 119 },
    { name: "Layered Ghagra Skirt", category: "bottomwear", price: 169 },
    { name: "Elastic Waist Casual Trousers", category: "bottomwear", price: 59 },
    { name: "Linen Wide-Leg Pants", category: "bottomwear", price: 99 },
    { name: "Flared Festive Lehenga Skirt", category: "bottomwear", price: 199 },
    { name: "Khadi Wrap Skirt", category: "bottomwear", price: 109 },
    { name: "Indigo Dyed Culottes", category: "bottomwear", price: 89 },

    { name: "Printed Palazzo Co-ord Set", category: "coord-sets", price: 149 },
    { name: "Floral Summer Co-ord Set", category: "coord-sets", price: 129 },
    { name: "Handloom Cotton Co-ord Ensemble", category: "coord-sets", price: 169 },
    { name: "Indigo Block Print Co-ord Set", category: "coord-sets", price: 159 },
    { name: "Pastel Linen Co-ord Set", category: "coord-sets", price: 139 },
    { name: "Festive Embellished Co-ord Set", category: "coord-sets", price: 219 },
    { name: "Mirror Accent Celebration Co-ord", category: "coord-sets", price: 199 },
    { name: "Silk Blend Evening Co-ord", category: "coord-sets", price: 229 },
    { name: "Layered Jacket Style Co-ord Set", category: "coord-sets", price: 189 },
    { name: "Pleated Skirt Co-ord Set", category: "coord-sets", price: 179 },
    { name: "Contemporary Crop Co-ord Set", category: "coord-sets", price: 119 },
    { name: "Heritage Print Designer Co-ord", category: "coord-sets", price: 209 }
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

  <div class="relative z-10 px-12 py-24 max-w-[1600px] mx-auto">

    <h1 class="text-5xl font-tamil text-templegold mb-16 capitalize">
      {subcategory}
    </h1>

    {#if filtered.length === 0}
      <p class="text-xl text-ivory font-display">
        No products found.
      </p>
    {/if}

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">

      {#each filtered as product}

        <div class="group bg-white/5 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden 
                    border border-white/10 hover:border-templegold transition duration-500">

          <div class="h-72 bg-black/20 flex items-center justify-center relative">
            <span class="text-lg font-display text-ivory">
              Product Image
            </span>
          </div>

          <div class="p-6 space-y-3">
            <h3 class="text-xl font-display text-white group-hover:text-templegold transition">
              {product.name}
            </h3>

            <p class="text-templegold font-semibold">
              RM {product.price}
            </p>

            <button
            class="mt-4 w-full py-2 border border-templegold text-templegold 
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
