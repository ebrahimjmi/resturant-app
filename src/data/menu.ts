export interface MenuItem {
  id: string;
  name: string;
  frenchName?: string;
  description: string;
  price: number;
  category: 'starters' | 'mains' | 'desserts' | 'wines' | 'specials';
  tags: ('Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Chef Special' | 'Signature')[];
  image: string;
  calories?: number;
  prepTime?: string;
  pairing?: string;
  spicyLevel?: number;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Pan-Seared Hokkaido Scallops',
    frenchName: 'Coquilles Saint-Jacques Dorées',
    description: 'Caramelized cauliflower velouté, imperial oscietra caviar, and micro-herbs infused with brown butter.',
    price: 36,
    category: 'starters',
    tags: ['Signature', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80',
    calories: 340,
    prepTime: '15 min',
    pairing: 'Domaine Leflaive Puligny-Montrachet 2020'
  },
  {
    id: 'm2',
    name: 'Heritage Black Truffle Burrata',
    frenchName: 'Burrata Crémeuse à la Truffe Noire',
    description: 'Heirloom vine tomatoes, 25-year aged balsamic reduction, roasted pine nuts, and grilled sourdough.',
    price: 28,
    category: 'starters',
    tags: ['Vegetarian'],
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=800&q=80',
    calories: 420,
    prepTime: '12 min',
    pairing: 'Sancerre Blanc Les Baronnes'
  },
  {
    id: 'm3',
    name: 'Wild Forest Morel Tartlet',
    frenchName: 'Tartelette aux Morilles Sauvages',
    description: 'Puff pastry cradle with sautéed morels, shallot confit, aged Comté mousse, and shaved summer truffles.',
    price: 32,
    category: 'starters',
    tags: ['Vegetarian'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    calories: 380,
    prepTime: '18 min',
    pairing: 'Chablis Premier Cru 2021'
  },
  {
    id: 'm4',
    name: 'A5 Wagyu Striploin Miyazaki',
    frenchName: 'Faux-Filet de Bœuf Wagyu A5',
    description: 'Robata grilled A5 beef, parsnip silk, charred baby leeks, and black garlic bone marrow glaze.',
    price: 88,
    category: 'mains',
    tags: ['Signature', 'Chef Special', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    calories: 680,
    prepTime: '25 min',
    pairing: 'Château Margaux Premier Grand Cru 2015'
  },
  {
    id: 'm5',
    name: 'Roasted Glacier 51 Toothfish',
    frenchName: 'Légine Australe Rôtie au Miso',
    description: 'Wild patagonian toothfish marinated in white yuzu miso, sea asparagus, and ginger dashi broth.',
    price: 64,
    category: 'mains',
    tags: ['Gluten-Free', 'Chef Special'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    calories: 510,
    prepTime: '22 min',
    pairing: 'Meursault Domaine des Comtes Lafon'
  },
  {
    id: 'm6',
    name: 'Canard de Challans au Poivre Rose',
    frenchName: 'Poitrine de Canard Rôtie',
    description: 'Dry-aged spiced duck breast, beetroot carpaccio, kumquat marmalade, and pink peppercorn jus.',
    price: 52,
    category: 'mains',
    tags: ['Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1514944298352-73a72814ca54?auto=format&fit=crop&w=800&q=80',
    calories: 590,
    prepTime: '24 min',
    pairing: 'Gevrey-Chambertin Pinot Noir'
  },
  {
    id: 'm7',
    name: 'Artisanal Saffron Risotto',
    frenchName: 'Risotto au Safran & Asperges Vertes',
    description: 'Acquerello carnaroli rice, Persian saffron stamens, charred green asparagus, and 36-month Parmigiano Reggiano crisp.',
    price: 42,
    category: 'mains',
    tags: ['Vegetarian', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80',
    calories: 460,
    prepTime: '20 min',
    pairing: 'Barolo DOCG Pio Cesare'
  },
  {
    id: 'm8',
    name: 'Valrhona Grand Cru Chocolate Sphere',
    frenchName: 'Sphère Chocolat Grand Cru Guanaja',
    description: '70% dark chocolate dome melted table-side with warm salted caramel ganache, hazelnut praline, and gold leaf.',
    price: 24,
    category: 'desserts',
    tags: ['Signature', 'Vegetarian'],
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
    calories: 540,
    prepTime: '10 min',
    pairing: 'Taylor’s 20-Year Tawny Port'
  },
  {
    id: 'm9',
    name: 'Madagascan Bourbon Vanilla Mille-Feuille',
    frenchName: 'Mille-Feuille Croustillant Vanille',
    description: 'Caramelized inverted puff pastry leaves layered with whipped Tahitian vanilla mascarpone and raspberry coulis.',
    price: 20,
    category: 'desserts',
    tags: ['Vegetarian'],
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80',
    calories: 430,
    prepTime: '8 min',
    pairing: 'Château d’Yquem Sauternes'
  },
  {
    id: 'm10',
    name: 'Citrus Yuzu & Jasmine Blossom Pavlova',
    frenchName: 'Pavlova Délicate Agrumes & Jasmin',
    description: 'Crisp French meringue, yuzu curd, candied bergamot, fresh organic berries, and edible cornflowers.',
    price: 22,
    category: 'desserts',
    tags: ['Vegetarian', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    calories: 310,
    prepTime: '10 min',
    pairing: 'Moscato d’Asti Michele Chiarlo'
  },
  {
    id: 'm11',
    name: 'Château d’Yquem Premier Cru Supérieur',
    frenchName: 'Bordeaux Sauternes Grand Vin',
    description: 'Intense candied apricots, honeysuckle, dried ginger, and vibrant botrytis acidity. 2017 Vintage.',
    price: 180,
    category: 'wines',
    tags: ['Signature', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    prepTime: 'Immediate',
    pairing: 'Foie Gras or Valrhona Sphere'
  },
  {
    id: 'm12',
    name: 'Dom Pérignon Vintage Champagne',
    frenchName: 'Champagne Brut Millésimé 2013',
    description: 'Elegantly smoky bouquet with notes of toasted almond, brioche, white peach, and crystalline minerality.',
    price: 260,
    category: 'wines',
    tags: ['Signature', 'Vegan', 'Gluten-Free'],
    image: 'https://images.unsplash.com/photo-1569919659476-f0852f6834b7?auto=format&fit=crop&w=800&q=80',
    prepTime: 'Immediate',
    pairing: 'Imperial Caviar & Oysters'
  }
];
