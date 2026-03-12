export function load({ params }) {
  return {
    subcategory: params.subcategory
  };
}

export function entries() {
  return [
    { subcategory: 'diyas' },
    { subcategory: 'bells' },
    { subcategory: 'statues' },
    { subcategory: 'tumblers' },
    { subcategory: 'plates' },
    { subcategory: 'pots' }
  ];
}
