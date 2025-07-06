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
    comics: {
      available: 150,
      items: [
        {
          name: 'The Amazing Spider-Man #1',
          year: 1963,
          thumbnail: 'https://m.media-amazon.com/images/I/81p5p1QK2GL.jpg',
        },
        {
          name: 'Ultimate Spider-Man #1',
          year: 2000,
          thumbnail: 'https://m.media-amazon.com/images/I/91Q5d6yQKGL.jpg',
        },
        {
          name: 'Spider-Man: Blue',
          year: 2002,
          thumbnail: 'https://m.media-amazon.com/images/I/81n1QwQK2GL.jpg',
        },
        {
          name: 'Spider-Verse',
          year: 2014,
          thumbnail:
            'https://m.media-amazon.com/images/I/91Q5d6yQKGL._AC_SY679_.jpg',
        },
        {
          name: 'The Superior Spider-Man',
          year: 2013,
          thumbnail:
            'https://m.media-amazon.com/images/I/81n1QwQK2GL._AC_SY679_.jpg',
        },
        {
          name: "Spider-Man: Kraven's Last Hunt",
          year: 1987,
          thumbnail: 'https://m.media-amazon.com/images/I/81Q5d6yQKGL.jpg',
        },
        {
          name: 'Spider-Man: The Clone Saga',
          year: 1994,
          thumbnail:
            'https://m.media-amazon.com/images/I/91Q5d6yQKGL._AC_SY679_.jpg',
        },
        {
          name: 'Spider-Man: Maximum Carnage',
          year: 1993,
          thumbnail: 'https://m.media-amazon.com/images/I/81n1QwQK2GL.jpg',
        },
        {
          name: 'Spider-Man: Back in Black',
          year: 2007,
          thumbnail: 'https://m.media-amazon.com/images/I/81p5p1QK2GL.jpg',
        },
        {
          name: 'Spider-Geddon',
          year: 2018,
          thumbnail: 'https://m.media-amazon.com/images/I/91Q5d6yQKGL.jpg',
        },
      ],
    },
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
    comics: {
      available: 200,
      items: [
        {
          name: 'Tales of Suspense #39',
          year: 1963,
          thumbnail: 'https://m.media-amazon.com/images/I/81Q5d6yQKGL.jpg',
        },
        {
          name: 'Iron Man #1',
          year: 1968,
          thumbnail: 'https://m.media-amazon.com/images/I/81n1QwQK2GL.jpg',
        },
        {
          name: 'Iron Man: Extremis',
          year: 2005,
          thumbnail:
            'https://m.media-amazon.com/images/I/91Q5d6yQKGL._AC_SY679_.jpg',
        },
        {
          name: 'Iron Man: Demon in a Bottle',
          year: 1979,
          thumbnail: 'https://m.media-amazon.com/images/I/81p5p1QK2GL.jpg',
        },
        {
          name: 'The Invincible Iron Man',
          year: 2008,
          thumbnail:
            'https://m.media-amazon.com/images/I/81n1QwQK2GL._AC_SY679_.jpg',
        },
      ],
    },
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
    comics: {
      available: 180,
      items: [
        {
          name: 'Captain America Comics #1',
          year: 1941,
          thumbnail: 'https://m.media-amazon.com/images/I/81Q5d6yQKGL.jpg',
        },
        {
          name: 'The Death of Captain America',
          year: 2007,
          thumbnail: 'https://m.media-amazon.com/images/I/81n1QwQK2GL.jpg',
        },
        {
          name: 'Captain America: Winter Soldier',
          year: 2005,
          thumbnail:
            'https://m.media-amazon.com/images/I/91Q5d6yQKGL._AC_SY679_.jpg',
        },
        {
          name: 'Captain America: Reborn',
          year: 2009,
          thumbnail: 'https://m.media-amazon.com/images/I/81p5p1QK2GL.jpg',
        },
        {
          name: 'Captain America: Man Out of Time',
          year: 2011,
          thumbnail:
            'https://m.media-amazon.com/images/I/81n1QwQK2GL._AC_SY679_.jpg',
        },
      ],
    },
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
    comics: {
      available: 220,
      items: [
        {
          name: 'Journey into Mystery #83',
          year: 1962,
          thumbnail: 'https://m.media-amazon.com/images/I/81Q5d6yQKGL.jpg',
        },
        {
          name: 'Thor: God of Thunder',
          year: 2012,
          thumbnail:
            'https://m.media-amazon.com/images/I/91Q5d6yQKGL._AC_SY679_.jpg',
        },
        {
          name: 'The Mighty Thor #1',
          year: 2015,
          thumbnail: 'https://m.media-amazon.com/images/I/81n1QwQK2GL.jpg',
        },
        {
          name: 'Thor: Ragnarok',
          year: 2017,
          thumbnail: 'https://m.media-amazon.com/images/I/81p5p1QK2GL.jpg',
        },
        {
          name: 'Thor: The Dark World Prelude',
          year: 2013,
          thumbnail: 'https://m.media-amazon.com/images/I/91Q5d6yQKGL.jpg',
        },
      ],
    },
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
    comics: {
      available: 120,
      items: [
        {
          name: 'The Amazing Spider-Man #86',
          year: 1970,
          thumbnail: 'https://m.media-amazon.com/images/I/81Q5d6yQKGL.jpg',
        },
        {
          name: 'Black Widow: The Name of the Rose',
          year: 2010,
          thumbnail: 'https://m.media-amazon.com/images/I/81n1QwQK2GL.jpg',
        },
        {
          name: 'Black Widow: Deadly Origin',
          year: 2010,
          thumbnail:
            'https://m.media-amazon.com/images/I/91Q5d6yQKGL._AC_SY679_.jpg',
        },
        {
          name: 'Black Widow (2020) #1',
          year: 2020,
          thumbnail: 'https://m.media-amazon.com/images/I/81p5p1QK2GL.jpg',
        },
        {
          name: 'Black Widow: Homecoming',
          year: 2004,
          thumbnail: 'https://m.media-amazon.com/images/I/91Q5d6yQKGL.jpg',
        },
      ],
    },
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
    comics: {
      available: 160,
      items: [
        {
          name: 'The Incredible Hulk #1',
          year: 1962,
          thumbnail: 'https://m.media-amazon.com/images/I/81Q5d6yQKGL.jpg',
        },
        {
          name: 'Planet Hulk',
          year: 2006,
          thumbnail:
            'https://m.media-amazon.com/images/I/91Q5d6yQKGL._AC_SY679_.jpg',
        },
        {
          name: 'World War Hulk',
          year: 2007,
          thumbnail: 'https://m.media-amazon.com/images/I/81n1QwQK2GL.jpg',
        },
        {
          name: 'Hulk: Gray',
          year: 2003,
          thumbnail: 'https://m.media-amazon.com/images/I/81p5p1QK2GL.jpg',
        },
        {
          name: 'The Immortal Hulk',
          year: 2018,
          thumbnail: 'https://m.media-amazon.com/images/I/91Q5d6yQKGL.jpg',
        },
      ],
    },
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
    comics: {
      available: 90,
      items: [
        {
          name: 'Fantastic Four #52',
          year: 1966,
          thumbnail: 'https://m.media-amazon.com/images/I/81Q5d6yQKGL.jpg',
        },
        {
          name: 'Black Panther (1998) #1',
          year: 1998,
          thumbnail: 'https://m.media-amazon.com/images/I/81n1QwQK2GL.jpg',
        },
        {
          name: 'Black Panther: The Man Without Fear',
          year: 2010,
          thumbnail:
            'https://m.media-amazon.com/images/I/91Q5d6yQKGL._AC_SY679_.jpg',
        },
        {
          name: 'Black Panther (2016) #1',
          year: 2016,
          thumbnail: 'https://m.media-amazon.com/images/I/81p5p1QK2GL.jpg',
        },
        {
          name: 'Black Panther: World of Wakanda',
          year: 2016,
          thumbnail: 'https://m.media-amazon.com/images/I/91Q5d6yQKGL.jpg',
        },
      ],
    },
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
    comics: {
      available: 110,
      items: [
        {
          name: 'Strange Tales #110',
          year: 1963,
          thumbnail: 'https://m.media-amazon.com/images/I/81Q5d6yQKGL.jpg',
        },
        {
          name: 'Doctor Strange: The Oath',
          year: 2006,
          thumbnail:
            'https://m.media-amazon.com/images/I/91Q5d6yQKGL._AC_SY679_.jpg',
        },
        {
          name: 'Doctor Strange (2015) #1',
          year: 2015,
          thumbnail: 'https://m.media-amazon.com/images/I/81n1QwQK2GL.jpg',
        },
        {
          name: 'Doctor Strange: Damnation',
          year: 2018,
          thumbnail: 'https://m.media-amazon.com/images/I/81p5p1QK2GL.jpg',
        },
        {
          name: 'Doctor Strange: Sorcerer Supreme',
          year: 1988,
          thumbnail: 'https://m.media-amazon.com/images/I/91Q5d6yQKGL.jpg',
        },
      ],
    },
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
    comics: {
      available: 170,
      items: [
        {
          name: 'Fantastic Four #1',
          year: 1961,
          thumbnail: 'https://m.media-amazon.com/images/I/81Q5d6yQKGL.jpg',
        },
        {
          name: 'Marvel Two-in-One #1',
          year: 1974,
          thumbnail: 'https://m.media-amazon.com/images/I/81n1QwQK2GL.jpg',
        },
        {
          name: 'The Thing (1983) #1',
          year: 1983,
          thumbnail:
            'https://m.media-amazon.com/images/I/91Q5d6yQKGL._AC_SY679_.jpg',
        },
        {
          name: 'Fantastic Four: The End',
          year: 2007,
          thumbnail: 'https://m.media-amazon.com/images/I/81p5p1QK2GL.jpg',
        },
        {
          name: 'The Thing (2006) #1',
          year: 2006,
          thumbnail: 'https://m.media-amazon.com/images/I/91Q5d6yQKGL.jpg',
        },
      ],
    },
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
    comics: {
      available: 95,
      items: [
        {
          name: 'The Avengers #57',
          year: 1968,
          thumbnail: 'https://m.media-amazon.com/images/I/81Q5d6yQKGL.jpg',
        },
        {
          name: 'Vision (2015) #1',
          year: 2015,
          thumbnail: 'https://m.media-amazon.com/images/I/81n1QwQK2GL.jpg',
        },
        {
          name: 'Avengers: Vision and the Scarlet Witch',
          year: 1982,
          thumbnail:
            'https://m.media-amazon.com/images/I/91Q5d6yQKGL._AC_SY679_.jpg',
        },
        {
          name: 'Vision: Little Worse Than A Man',
          year: 2016,
          thumbnail: 'https://m.media-amazon.com/images/I/81p5p1QK2GL.jpg',
        },
        {
          name: 'Avengers: No Road Home',
          year: 2019,
          thumbnail: 'https://m.media-amazon.com/images/I/91Q5d6yQKGL.jpg',
        },
      ],
    },
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
    comics: {
      available: 105,
      items: [
        {
          name: 'Tales of Suspense #57',
          year: 1964,
          thumbnail: 'https://m.media-amazon.com/images/I/81Q5d6yQKGL.jpg',
        },
        {
          name: 'Hawkeye (2012) #1',
          year: 2012,
          thumbnail: 'https://m.media-amazon.com/images/I/81n1QwQK2GL.jpg',
        },
        {
          name: 'Hawkeye: My Life as a Weapon',
          year: 2013,
          thumbnail:
            'https://m.media-amazon.com/images/I/91Q5d6yQKGL._AC_SY679_.jpg',
        },
        {
          name: 'Hawkeye: Freefall',
          year: 2020,
          thumbnail: 'https://m.media-amazon.com/images/I/81p5p1QK2GL.jpg',
        },
        {
          name: 'Hawkeye (1983) #1',
          year: 1983,
          thumbnail: 'https://m.media-amazon.com/images/I/91Q5d6yQKGL.jpg',
        },
      ],
    },
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
    comics: {
      available: 140,
      items: [
        {
          name: 'Ms. Marvel #1',
          year: 1977,
          thumbnail: 'https://m.media-amazon.com/images/I/81Q5d6yQKGL.jpg',
        },
        {
          name: 'Captain Marvel (2012) #1',
          year: 2012,
          thumbnail: 'https://m.media-amazon.com/images/I/81n1QwQK2GL.jpg',
        },
        {
          name: 'The Life of Captain Marvel',
          year: 2018,
          thumbnail:
            'https://m.media-amazon.com/images/I/91Q5d6yQKGL._AC_SY679_.jpg',
        },
        {
          name: 'Captain Marvel: Higher, Further, Faster, More',
          year: 2014,
          thumbnail: 'https://m.media-amazon.com/images/I/81p5p1QK2GL.jpg',
        },
        {
          name: 'Captain Marvel (2019) #1',
          year: 2019,
          thumbnail: 'https://m.media-amazon.com/images/I/91Q5d6yQKGL.jpg',
        },
      ],
    },
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
    comics: {
      available: 85,
      items: [
        {
          name: 'Marvel Premiere #47',
          year: 1979,
          thumbnail: 'https://m.media-amazon.com/images/I/81Q5d6yQKGL.jpg',
        },
        {
          name: 'Ant-Man (2015) #1',
          year: 2015,
          thumbnail: 'https://m.media-amazon.com/images/I/81n1QwQK2GL.jpg',
        },
        {
          name: 'Ant-Man: Second-Chance Man',
          year: 2015,
          thumbnail:
            'https://m.media-amazon.com/images/I/91Q5d6yQKGL._AC_SY679_.jpg',
        },
        {
          name: 'Ant-Man and the Wasp',
          year: 2018,
          thumbnail: 'https://m.media-amazon.com/images/I/81p5p1QK2GL.jpg',
        },
        {
          name: 'The Astonishing Ant-Man',
          year: 2015,
          thumbnail: 'https://m.media-amazon.com/images/I/91Q5d6yQKGL.jpg',
        },
      ],
    },
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
    comics: {
      available: 210,
      items: [
        {
          name: 'The Incredible Hulk #181',
          year: 1974,
          thumbnail: 'https://m.media-amazon.com/images/I/81Q5d6yQKGL.jpg',
        },
        {
          name: 'Wolverine (1982) #1',
          year: 1982,
          thumbnail: 'https://m.media-amazon.com/images/I/81n1QwQK2GL.jpg',
        },
        {
          name: 'Wolverine: Old Man Logan',
          year: 2008,
          thumbnail:
            'https://m.media-amazon.com/images/I/91Q5d6yQKGL._AC_SY679_.jpg',
        },
        {
          name: 'Wolverine: Weapon X',
          year: 1991,
          thumbnail: 'https://m.media-amazon.com/images/I/81p5p1QK2GL.jpg',
        },
        {
          name: 'Wolverine (2010) #1',
          year: 2010,
          thumbnail: 'https://m.media-amazon.com/images/I/91Q5d6yQKGL.jpg',
        },
      ],
    },
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
