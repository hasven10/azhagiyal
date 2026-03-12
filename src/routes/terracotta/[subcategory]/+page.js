export function load({ params }) {
  return {
    subcategory: params.subcategory
  };
}

export function entries() {
  return [
    { subcategory: 'vases' },
    { subcategory: 'pots' },
    { subcategory: 'wall-art' },
    { subcategory: 'lamps' },
    { subcategory: 'cups' },
    { subcategory: 'plates' },
    { subcategory: 'bowls' }
  ];
}
