export function load({ params }) {
  return {
    subcategory: params.subcategory
  };
}

export function entries() {
  return [
    { subcategory: 'dresses' },
    { subcategory: 'tops' },
    { subcategory: 'kurtas' },
    { subcategory: 'sarees' },
    { subcategory: 'bottomwear' },
    { subcategory: 'coord-sets' },
    { subcategory: 'jewelleries' },
    { subcategory: 'bags' },
    { subcategory: 'earrings' }
  ];
}