export function load({ params }) {
  return {
    subcategory: params.subcategory
  };
}

export function entries() {
  return [
    { subcategory: 'side-tables' },
    { subcategory: 'chairs' },
    { subcategory: 'stools' },
    { subcategory: 'carvings' },
    { subcategory: 'frames' },
    { subcategory: 'boxes' },
    { subcategory: 'cutting-boards' },
    { subcategory: 'bowls' },
    { subcategory: 'spoons' }
  ];
}
