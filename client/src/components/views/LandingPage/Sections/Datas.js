const category = [
  {
    _id: 1,
    name: "Electronics",
  },
  {
    _id: 2,
    name: "Fashion",
  },
  {
    _id: 3,
    name: "Health",
  },
  {
    _id: 4,
    name: "Sports",
  },
  {
    _id: 5,
    name: "Pet supplies",
  },
  {
    _id: 6,
    name: "Beauty",
  },
  {
    _id: 7,
    name: "Baby",
  },
];

const price = [
  {
    _id: 0,
    name: "Any",
    array: [],
  },
  {
    _id: 1,
    name: "$0 to $199",
    array: [0, 199],
  },
  {
    _id: 2,
    name: "$200 to $249",
    array: [200, 249],
  },
  {
    _id: 3,
    name: "$250 to $279",
    array: [250, 279],
  },
  {
    _id: 4,
    name: "$280 to $299",
    array: [280, 299],
  },
  {
    _id: 5,
    name: "More than $300",
    array: [300, 1500000],
  },
];

export { category, price };
