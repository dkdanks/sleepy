export type Scale = { left: string; right: string; value: number }; // value 1-5

export type Wine = {
  slug: string;
  name: string;
  producer: string;
  grape: string;
  region: string;
  country: string;
  style: "Red" | "White" | "Orange" | "Rosé";
  vintage: number;
  hook: string;
  note: string[];
  scales: Scale[];
  tastesLike: string[];
  drinkWith: string;
  serve: string;
  colour: string; // accent used on the ticket
  ink: string; // text colour on that accent
};

export const plan = {
  price: 79,
  bottles: 3,
  month: "October",
  year: 2026,
  pickup: "787 Nicholson St, Carlton North",
};

// Placeholder line-up for the demo. Swap for the real monthly picks.
export const wines: Wine[] = [
  {
    slug: "ramato",
    name: "Ramato",
    producer: "Casa Ombra",
    grape: "Pinot Grigio",
    region: "Friuli",
    country: "Italy",
    style: "Orange",
    vintage: 2024,
    hook: "Pinot Grigio, but make it pink and interesting.",
    note: [
      "Forget the Pinot Grigio you had at a wedding. In Friuli they leave the juice on the grape skins for a few days, and it comes out this gorgeous copper colour with way more going on.",
      "Think blood orange, a bit of rhubarb, and a little grip at the end like a cup of black tea. It's the bottle we'd open when friends turn up and nobody can agree on red or white.",
    ],
    scales: [
      { left: "Light", right: "Bold", value: 2 },
      { left: "Fruity", right: "Savoury", value: 3 },
      { left: "Classic", right: "Funky", value: 3 },
    ],
    tastesLike: ["Blood orange", "Rhubarb", "Black tea"],
    drinkWith: "Pizza on the couch, or anything with chilli",
    serve: "Fridge-cold, then let it warm up a bit in the glass",
    colour: "#E8794A",
    ink: "#1C1C1C",
  },
  {
    slug: "petits-matins",
    name: "Petits Matins",
    producer: "Domaine des Lèves-Tard",
    grape: "Gamay",
    region: "Beaujolais",
    country: "France",
    style: "Red",
    vintage: 2024,
    hook: "A red you can chill. Trust us on this one.",
    note: [
      "This is the wine that turned both of us into wine people. Gamay is light, juicy and a bit crunchy, like biting into a cold cherry.",
      "Put it in the fridge for 20 minutes before you open it. It's a Tuesday night red, a picnic red, a 'we're only having one glass' red. You will not only have one glass.",
    ],
    scales: [
      { left: "Light", right: "Bold", value: 1 },
      { left: "Fruity", right: "Savoury", value: 2 },
      { left: "Classic", right: "Funky", value: 2 },
    ],
    tastesLike: ["Sour cherry", "Raspberry", "Crushed violets"],
    drinkWith: "Roast chook, charcuterie, takeaway dumplings",
    serve: "20 minutes in the fridge. Yes, really.",
    colour: "#C23A4B",
    ink: "#FAFAFA",
  },
  {
    slug: "siesta",
    name: "La Siesta",
    producer: "Bodega Hueco",
    grape: "Garnacha",
    region: "Calatayud",
    country: "Spain",
    style: "Red",
    vintage: 2023,
    hook: "Warm, generous, and costs way less than it should.",
    note: [
      "Old vines up in the hills of Calatayud, where it's hot in the day and freezing at night. That's what gives it all this ripe fruit without being heavy or jammy.",
      "Strawberries, a bit of pepper, a little dried herb thing going on. If you usually reach for a Shiraz, start here. It's a hug in a bottle.",
    ],
    scales: [
      { left: "Light", right: "Bold", value: 4 },
      { left: "Fruity", right: "Savoury", value: 2 },
      { left: "Classic", right: "Funky", value: 1 },
    ],
    tastesLike: ["Strawberry", "Black pepper", "Thyme"],
    drinkWith: "Lamb, a big pot of beans, a cheese board",
    serve: "Room temp, or just a touch cooler",
    colour: "#F8ED48",
    ink: "#194E3E",
  },
];

export const getWine = (slug: string) => wines.find((w) => w.slug === slug);
