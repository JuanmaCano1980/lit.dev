// Datos mock para simular la API de Marvel
export const mockCharacters = [
  {
    id: 1,
    name: 'Spider-Man',
    description:
      'Peter Parker, el amigable vecino Spider-Man, es un superhéroe que combate el crimen en Nueva York. Después de ser mordido por una araña radiactiva, Peter adquirió poderes arácnidos que incluyen fuerza sobrehumana, agilidad, sentidos arácnidos y la capacidad de trepar paredes.',
    thumbnail: {
      path: 'https://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b',
      extension: 'jpg',
    },
    comics: { available: 150 },
    series: { available: 25 },
    stories: { available: 300 },
    events: { available: 10 },
  },
  {
    id: 2,
    name: 'Iron Man',
    description:
      'Tony Stark, el genio millonario que se convirtió en Iron Man, protege al mundo con su armadura tecnológica. Después de ser herido en una explosión, Stark creó una armadura para mantener su corazón latiendo y ahora usa esa tecnología para combatir el mal.',
    thumbnail: {
      path: 'https://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55',
      extension: 'jpg',
    },
    comics: { available: 200 },
    series: { available: 30 },
    stories: { available: 400 },
    events: { available: 15 },
  },
  {
    id: 3,
    name: 'Captain America',
    description:
      'Steve Rogers, el primer vengador, representa los valores de libertad y justicia. Después de recibir el suero del super soldado, Rogers se convirtió en Captain America, un símbolo de esperanza durante la Segunda Guerra Mundial y más allá.',
    thumbnail: {
      path: 'https://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087',
      extension: 'jpg',
    },
    comics: { available: 180 },
    series: { available: 28 },
    stories: { available: 350 },
    events: { available: 12 },
  },
  {
    id: 4,
    name: 'Thor',
    description:
      'Thor, el dios del trueno, es uno de los vengadores más poderosos. Hijo de Odín, Thor protege tanto Asgard como la Tierra con su martillo Mjolnir y sus poderes divinos de trueno y relámpago.',
    thumbnail: {
      path: 'https://i.annihil.us/u/prod/marvel/i/mg/5/a0/537bc7036ab02',
      extension: 'jpg',
    },
    comics: { available: 220 },
    series: { available: 35 },
    stories: { available: 450 },
    events: { available: 18 },
  },
  {
    id: 5,
    name: 'Black Widow',
    description:
      'Natasha Romanoff, la Black Widow, es una espía y asesina altamente entrenada. Su pasado oscuro como agente rusa la convirtió en una de las heroínas más letales del mundo, usando sus habilidades de combate y espionaje para proteger a los inocentes.',
    thumbnail: {
      path: 'https://i.annihil.us/u/prod/marvel/i/mg/f/30/50fecad1f395b',
      extension: 'jpg',
    },
    comics: { available: 120 },
    series: { available: 20 },
    stories: { available: 250 },
    events: { available: 8 },
  },
  {
    id: 6,
    name: 'Hulk',
    description:
      'Bruce Banner, el increíble Hulk, es un científico brillante que se transforma en una criatura verde gigante cuando se enfada. A pesar de su apariencia aterradora, Hulk lucha por proteger a los inocentes y controlar su ira.',
    thumbnail: {
      path: 'https://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0',
      extension: 'jpg',
    },
    comics: { available: 160 },
    series: { available: 22 },
    stories: { available: 320 },
    events: { available: 11 },
  },
  {
    id: 7,
    name: 'Black Panther',
    description:
      "T'Challa, el Black Panther, es el rey de Wakanda y uno de los héroes más inteligentes del mundo. Con su traje de vibranium y sus habilidades de combate, protege su nación y el mundo de amenazas globales.",
    thumbnail: {
      path: 'https://i.annihil.us/u/prod/marvel/i/mg/6/60/5261a80a67e7d',
      extension: 'jpg',
    },
    comics: { available: 90 },
    series: { available: 15 },
    stories: { available: 180 },
    events: { available: 6 },
  },
  {
    id: 8,
    name: 'Doctor Strange',
    description:
      'Stephen Strange, el Doctor Strange, es el hechicero supremo de la Tierra. Después de perder sus habilidades como cirujano, Strange aprendió las artes místicas para proteger la realidad de amenazas sobrenaturales.',
    thumbnail: {
      path: 'https://i.annihil.us/u/prod/marvel/i/mg/5/f0/5261a85a501fe',
      extension: 'jpg',
    },
    comics: { available: 110 },
    series: { available: 18 },
    stories: { available: 220 },
    events: { available: 9 },
  },
  {
    id: 9,
    name: 'The Thing',
    description:
      'Ben Grimm, conocido como The Thing, es miembro de los Cuatro Fantásticos. Su cuerpo está cubierto de una roca naranja superresistente y posee una fuerza sobrehumana. Es famoso por su frase: ¡Es hora de las tortas!',
    thumbnail: {
      path: 'https://cdn.marvel.com/content/1x/214thg_com_crd_01',
      extension: 'jpg',
    },
    comics: { available: 170 },
    series: { available: 24 },
    stories: { available: 260 },
    events: { available: 9 },
  },
  {
    id: 10,
    name: 'Vision',
    description:
      'Vision es un androide sintético creado por Ultron y miembro de los Vengadores. Posee la capacidad de alterar su densidad, volverse intangible y disparar rayos de energía.',
    thumbnail: {
      path: 'https://i.annihil.us/u/prod/marvel/i/mg/6/70/526547e2d90ad',
      extension: 'jpg',
    },
    comics: { available: 95 },
    series: { available: 14 },
    stories: { available: 160 },
    events: { available: 5 },
  },
  {
    id: 11,
    name: 'Hawkeye',
    description:
      'Clint Barton, conocido como Hawkeye, es el mejor arquero del mundo y miembro de los Vengadores. Es experto en combate cuerpo a cuerpo y utiliza una variedad de flechas especiales.',
    thumbnail: {
      path: 'https://i.annihil.us/u/prod/marvel/i/mg/9/03/537ba26276348',
      extension: 'jpg',
    },
    comics: { available: 105 },
    series: { available: 16 },
    stories: { available: 170 },
    events: { available: 6 },
  },
  {
    id: 12,
    name: 'Captain Marvel',
    description:
      'Carol Danvers, la Capitana Marvel, es una de las heroínas más poderosas del universo Marvel. Posee superfuerza, vuelo y la capacidad de absorber y proyectar energía.',
    thumbnail: {
      path: 'https://cdn.marvel.com/content/1x/008cmv_ons_crd_05',
      extension: 'jpg',
    },
    comics: { available: 140 },
    series: { available: 21 },
    stories: { available: 230 },
    events: { available: 8 },
  },
  {
    id: 13,
    name: 'Ant-Man',
    description:
      'Scott Lang, el segundo Ant-Man, es un ladrón reformado que utiliza un traje especial para encogerse y comunicarse con insectos. Es miembro de los Vengadores y un héroe inesperado.',
    thumbnail: {
      path: 'https://cdn.marvel.com/content/1x/010ant_ons_crd_05',
      extension: 'jpg',
    },
    comics: { available: 85 },
    series: { available: 12 },
    stories: { available: 140 },
    events: { available: 4 },
  },
  {
    id: 14,
    name: 'Wolverine',
    description:
      'Logan, conocido como Wolverine, es un mutante con factor curativo, sentidos agudos y garras retráctiles de adamantium. Es miembro de los X-Men y uno de los héroes más icónicos de Marvel.',
    thumbnail: {
      path: 'https://cdn.marvel.com/content/1x/034wlv_com_crd_01',
      extension: 'jpg',
    },
    comics: { available: 210 },
    series: { available: 32 },
    stories: { available: 410 },
    events: { available: 13 },
  },
];

// Simular respuesta de la API
export const mockApiResponse = {
  code: 200,
  status: 'Ok',
  copyright: '© 2024 MARVEL',
  attributionText: 'Data provided by Marvel. © 2024 MARVEL',
  attributionHTML:
    '<a href="http://marvel.com">Data provided by Marvel. © 2024 MARVEL</a>',
  etag: 'aae473f8470cae5cd0ebc74d1db02f8b5d67b173',
  data: {
    offset: 0,
    limit: 20,
    total: mockCharacters.length,
    count: mockCharacters.length,
    results: mockCharacters,
  },
};

// Función para simular delay de API
export const simulateApiDelay = (ms = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Función para simular búsqueda
export const searchCharacters = async (searchTerm) => {
  await simulateApiDelay(500);

  if (!searchTerm) {
    return mockCharacters;
  }

  return mockCharacters.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

// Función para obtener un personaje por ID
export const getCharacterById = async (id) => {
  await simulateApiDelay(300);

  return mockCharacters.find((character) => character.id === parseInt(id));
};
