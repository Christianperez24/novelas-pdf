/* =====================================================
   NovelaHub — Base de datos de novelas
   -----------------------------------------------------
   👉 PARA AGREGAR NUEVAS NOVELAS:
   Copia un bloque completo { ... } y pégalo dentro del arreglo,
   cambiando los valores. Todos los campos son obligatorios
   excepto los marcados como opcionales.

   Campos:
   - id           : Identificador único (sin espacios)
   - title        : Título de la novela
   - cover        : URL de la imagen de portada
   - coverColor   : Color de respaldo si la imagen no carga (hex)
   - synopsis     : Sinopsis completa (texto largo)
   - genre        : Uno de: Fantasía, Acción, Romance, Sistema, Cultivación
   - tags         : Array de etiquetas secundarias (opcional)
   - chapters     : Número total de capítulos
   - volumes      : Número de tomos (opcional)
   - status       : "En curso" o "Completado"
   - rating       : Puntuación 0-10 (opcional)
   - views        : Número de visitas (opcional)
   - isAdult      : true si es +18 (opcional)
   - lastUpdate   : Fecha de última actualización (YYYY-MM-DD)
   - downloads    : Array de volúmenes/rangos con enlace de descarga
                    { label: "Cap. 001-100", size: "12 MB", link: "https://...", vip: false }
   ===================================================== */

const NOVELAS = [
  {
    id: "dragones-del-crepusculo",
    title: "Dragones del Crepúsculo",
    cover: "https://picsum.photos/seed/dragones1/400/600",
    coverColor: "#7c3aed",
    synopsis: "En un mundo donde los dragones desaparecieron hace mil años, un joven herrero descubre un huevo abandonado en las profundidades de su mina. Cuando el huevo se abre, desata una cadena de eventos que obligará al reino a enfrentar una antigua profecía olvidada. Mientras reinos rivales conspiran y sombras del pasado despiertan, nuestro héroe tendrá que aprender a domar lo indomable antes de que el crepúsculo caiga sobre todos.",
    genre: "Fantasía",
    tags: ["Aventura", "Magia", "Dragones", "Épico"],
    chapters: 1280,
    volumes: 12,
    status: "En curso",
    rating: 9.2,
    views: 145000,
    lastUpdate: "2026-11-22",
    downloads: [
      { label: "Tomos 1-3 (Cap. 001-300)", size: "45 MB", link: "https://acortador.ejemplo/dragones-v1" },
      { label: "Tomos 4-6 (Cap. 301-650)", size: "52 MB", link: "https://acortador.ejemplo/dragones-v2" },
      { label: "Tomos 7-9 (Cap. 651-980)", size: "48 MB", link: "https://acortador.ejemplo/dragones-v3" },
      { label: "Tomos 10-12 (Cap. 981-1280)", size: "38 MB", link: "https://acortador.ejemplo/dragones-v4", vip: true }
    ]
  },
  {
    id: "camino-del-cielo-azul",
    title: "Camino del Cielo Azul",
    cover: "https://picsum.photos/seed/cieloazul/400/600",
    coverColor: "#06b6d4",
    synopsis: "Li Wei nació en la secta más humilde del continente oriental, sin talento aparente para la cultivación. Sin embargo, una noche encuentra un antiguo pergamino que describe un camino prohibido de cultivo: el Camino del Cielo Azul. Mientras los genios de las grandes sectas avanzan a pasos agigantados, Li Wei descubre que la verdadera fuerza no reside en el talento, sino en la voluntad inquebrantable de quien camina contra el destino.",
    genre: "Cultivación",
    tags: ["Wuxia", "Xianxia", "Sectas", "Cultivación"],
    chapters: 2450,
    volumes: 24,
    status: "En curso",
    rating: 9.5,
    views: 320000,
    lastUpdate: "2026-11-23",
    downloads: [
      { label: "Arcos 1-5 (Cap. 001-500)", size: "78 MB", link: "https://acortador.ejemplo/cielo-v1" },
      { label: "Arcos 6-10 (Cap. 501-1000)", size: "82 MB", link: "https://acortador.ejemplo/cielo-v2" },
      { label: "Arcos 11-15 (Cap. 1001-1500)", size: "85 MB", link: "https://acortador.ejemplo/cielo-v3" },
      { label: "Arcos 16-20 (Cap. 1501-2000)", size: "80 MB", link: "https://acortador.ejemplo/cielo-v4" },
      { label: "Arcos 21-24 (Cap. 2001-2450)", size: "65 MB", link: "https://acortador.ejemplo/cielo-v5", vip: true }
    ]
  },
  {
    id: "codigo-sistema-rpg",
    title: "Código: Sistema RPG",
    cover: "https://picsum.photos/seed/sistemarp/400/600",
    coverColor: "#10b981",
    synopsis: "Cuando un programador mediocre muere atropellado, despierta en un mundo de fantasía con una ventaja inesperada: un sistema tipo RPG que solo él puede ver. Niveles, misiones, estadísticas, inventario... pero también reglas ocultas, bugs y exploits que solo un verdadero hacker podría encontrar. Mientras otros héroes confían en su espada, él confía en el código fuente del mundo.",
    genre: "Sistema",
    tags: ["LitRPG", "Isekai", "Reencarnación", "Aventura"],
    chapters: 980,
    volumes: 10,
    status: "En curso",
    rating: 8.7,
    views: 198000,
    lastUpdate: "2026-11-21",
    downloads: [
      { label: "Tomos 1-3 (Cap. 001-280)", size: "42 MB", link: "https://acortador.ejemplo/sistema-v1" },
      { label: "Tomos 4-6 (Cap. 281-560)", size: "46 MB", link: "https://acortador.ejemplo/sistema-v2" },
      { label: "Tomos 7-10 (Cap. 561-980)", size: "58 MB", link: "https://acortador.ejemplo/sistema-v3", vip: true }
    ]
  },
  {
    id: "corazon-de-sakura",
    title: "Corazón de Sakura",
    cover: "https://picsum.photos/seed/sakura/400/600",
    coverColor: "#ec4899",
    synopsis: "Haru, un estudiante de intercambio, llega a Kioto justo a tiempo para ver los cerezos en flor. Allí conoce a Yuki, una chica silenciosa que pinta siempre el mismo jardín. Lo que Haru no sabe es que cada pincelada de Yuki guarda un recuerdo que el tiempo intenta borrar. Una historia de amor sobre memorias, pérdidas y la promesa de un segundo comienzo bajo los pétalos de sakura.",
    genre: "Romance",
    tags: ["Slice of Life", "Drama", "Japón", "Universitario"],
    chapters: 156,
    volumes: 4,
    status: "Completado",
    rating: 9.0,
    views: 87000,
    lastUpdate: "2026-10-15",
    downloads: [
      { label: "Tomo 1 (Cap. 001-040)", size: "15 MB", link: "https://acortador.ejemplo/sakura-v1" },
      { label: "Tomo 2 (Cap. 041-080)", size: "14 MB", link: "https://acortador.ejemplo/sakura-v2" },
      { label: "Tomo 3 (Cap. 081-120)", size: "16 MB", link: "https://acortador.ejemplo/sakura-v3" },
      { label: "Tomo Final (Cap. 121-156)", size: "13 MB", link: "https://acortador.ejemplo/sakura-v4" }
    ]
  },
  {
    id: "filo-de-la-tempestad",
    title: "Filo de la Tempestad",
    cover: "https://picsum.photos/seed/tempestad/400/600",
    coverColor: "#ef4444",
    synopsis: "En una tierra devastada por la guerra entre tres imperios, un huérfano criado por espadachines nómadas jura vengar a su clan. Pero la venganza tiene un precio: cada enemigo que derrota lo acerca a una verdad incómoda sobre el origen de su propia sangre. Espadas, traiciones y batallas épicas en una saga donde cada victoria cuesta un pedazo del alma.",
    genre: "Acción",
    tags: ["Aventura", "Venganza", "Espadas", "Guerra"],
    chapters: 720,
    volumes: 8,
    status: "En curso",
    rating: 8.9,
    views: 154000,
    lastUpdate: "2026-11-20",
    downloads: [
      { label: "Tomos 1-2 (Cap. 001-180)", size: "28 MB", link: "https://acortador.ejemplo/tempestad-v1" },
      { label: "Tomos 3-4 (Cap. 181-360)", size: "32 MB", link: "https://acortador.ejemplo/tempestad-v2" },
      { label: "Tomos 5-6 (Cap. 361-540)", size: "30 MB", link: "https://acortador.ejemplo/tempestad-v3" },
      { label: "Tomos 7-8 (Cap. 541-720)", size: "29 MB", link: "https://acortador.ejemplo/tempestad-v4", vip: true }
    ]
  },
  {
    id: "maestro-de-la-forja",
    title: "Maestro de la Forja",
    cover: "https://picsum.photos/seed/forja/400/600",
    coverColor: "#f59e0b",
    synopsis: "Kael era solo un aprendiz de herrero hasta el día en que forjó por accidente una espada capaz de cortar la magia. Perseguido por reyes y hechiceros, deberá recorrer un continente en guerra para descubrir el secreto de su maestro desaparecido y evitar que la espada caiga en las manos equivocadas. Una historia de artesanía, lealtad y el poder de crear.",
    genre: "Fantasía",
    tags: ["Aventura", "Forja", "Magia", "Artesanía"],
    chapters: 540,
    volumes: 6,
    status: "En curso",
    rating: 8.4,
    views: 92000,
    lastUpdate: "2026-11-18",
    downloads: [
      { label: "Tomos 1-2 (Cap. 001-180)", size: "26 MB", link: "https://acortador.ejemplo/forja-v1" },
      { label: "Tomos 3-4 (Cap. 181-360)", size: "28 MB", link: "https://acortador.ejemplo/forja-v2" },
      { label: "Tomos 5-6 (Cap. 361-540)", size: "27 MB", link: "https://acortador.ejemplo/forja-v3", vip: true }
    ]
  },
  {
    id: "reino-de-las-sombras",
    title: "Reino de las Sombras",
    cover: "https://picsum.photos/seed/sombras/400/600",
    coverColor: "#1f2937",
    synopsis: "Asesinado en una emboscada, el príncipe exiliado regresa del más allá con la capacidad de controlar las sombras. Mientras su hermano usurpador se corona rey, él reúne en secreto a una corte de espías, asesinos y renegados para reclamar un trono manchado de sangre. Política, intrigas y poderes oscuros en un thriller de fantasía donde el mejor aliado es la sombra misma.",
    genre: "Acción",
    tags: ["Intrigas", "Venganza", "Magia oscura", "Política"],
    chapters: 410,
    volumes: 5,
    status: "Completado",
    rating: 9.1,
    views: 134000,
    lastUpdate: "2026-09-30",
    downloads: [
      { label: "Tomo 1 (Cap. 001-080)", size: "18 MB", link: "https://acortador.ejemplo/sombras-v1" },
      { label: "Tomo 2 (Cap. 081-160)", size: "20 MB", link: "https://acortador.ejemplo/sombras-v2" },
      { label: "Tomo 3 (Cap. 161-250)", size: "22 MB", link: "https://acortador.ejemplo/sombras-v3" },
      { label: "Tomo 4 (Cap. 251-330)", size: "19 MB", link: "https://acortador.ejemplo/sombras-v4" },
      { label: "Tomo Final (Cap. 331-410)", size: "21 MB", link: "https://acortador.ejemplo/sombras-v5" }
    ]
  },
  {
    id: "estrella-y-el-lobo",
    title: "La Estrella y el Lobo",
    cover: "https://picsum.photos/seed/estrella-lobo/400/600",
    coverColor: "#8b5cf6",
    synopsis: "Aria es la heredera de una familia caída en desgracia. Ren es un mercenario con un pasado manchado. Cuando un contrato los une para proteger un secreto que podría derrocar al rey, ambos descubrirán que la línea entre el deber y el amor es más delgada de lo que jamás imaginaron. Romance, acción y segundas oportunidades en una novela que te hará suspirar y morder las uñas a partes iguales.",
    genre: "Romance",
    tags: ["Acción", "Aristocracia", "Segundas oportunidades", "Fantasía"],
    chapters: 285,
    volumes: 4,
    status: "En curso",
    rating: 9.3,
    views: 168000,
    lastUpdate: "2026-11-19",
    downloads: [
      { label: "Tomo 1 (Cap. 001-070)", size: "16 MB", link: "https://acortador.ejemplo/lobo-v1" },
      { label: "Tomo 2 (Cap. 071-150)", size: "18 MB", link: "https://acortador.ejemplo/lobo-v2" },
      { label: "Tomo 3 (Cap. 151-220)", size: "17 MB", link: "https://acortador.ejemplo/lobo-v3" },
      { label: "Tomo 4 (Cap. 221-285)", size: "15 MB", link: "https://acortador.ejemplo/lobo-v4", vip: true }
    ]
  },
  {
    id: "ascenso-del-inmortal",
    title: "Ascenso del Inmortal Roto",
    cover: "https://picsum.photos/seed/inmortal/400/600",
    coverColor: "#dc2626",
    synopsis: "Traicionado por sus propios discípulos, el emperador inmortal Chen Feng despierta trescientos años después en el cuerpo de un joven considerado basura por su clan. Con siglos de conocimiento y un rencor que arde más que su corazón inmortal, comenzará de nuevo desde lo más bajo para recuperar lo que le arrebataron. Cultivación, venganza y una voluntad que desafía al cielo.",
    genre: "Cultivación",
    tags: ["Reencarnación", "Venganza", "Xianxia", "Cultivación"],
    chapters: 1820,
    volumes: 18,
    status: "En curso",
    rating: 9.4,
    views: 287000,
    lastUpdate: "2026-11-23",
    downloads: [
      { label: "Tomos 1-4 (Cap. 001-400)", size: "65 MB", link: "https://acortador.ejemplo/inmortal-v1" },
      { label: "Tomos 5-8 (Cap. 401-800)", size: "68 MB", link: "https://acortador.ejemplo/inmortal-v2" },
      { label: "Tomos 9-12 (Cap. 801-1200)", size: "70 MB", link: "https://acortador.ejemplo/inmortal-v3" },
      { label: "Tomos 13-18 (Cap. 1201-1820)", size: "92 MB", link: "https://acortador.ejemplo/inmortal-v4", vip: true }
    ]
  },
  {
    id: "dice-of-fate",
    title: "Dice of Fate: El Jugador Maldito",
    cover: "https://picsum.photos/seed/dice/400/600",
    coverColor: "#16a34a",
    synopsis: "Cada noche, cuando el reloj marca las 12, un misterioso dado aparece en la mesita de noche de Arthur. Lanzarlo le otorga una habilidad única para el día siguiente... pero cada tirada tiene un precio. Mientras las apuestas suben y los premios se vuelven peligrosos, Arthur descubrirá que no es el único jugador en la ciudad y que la partida más importante aún no ha comenzado.",
    genre: "Sistema",
    tags: ["Sobrenatural", "Urbano", "Misterio", "Apuestas"],
    chapters: 320,
    volumes: 4,
    status: "En curso",
    rating: 8.8,
    views: 112000,
    isAdult: true,
    lastUpdate: "2026-11-17",
    downloads: [
      { label: "Tomo 1 (Cap. 001-080)", size: "18 MB", link: "https://acortador.ejemplo/dice-v1" },
      { label: "Tomo 2 (Cap. 081-160)", size: "20 MB", link: "https://acortador.ejemplo/dice-v2" },
      { label: "Tomo 3 (Cap. 161-240)", size: "19 MB", link: "https://acortador.ejemplo/dice-v3" },
      { label: "Tomo 4 (Cap. 241-320)", size: "21 MB", link: "https://acortador.ejemplo/dice-v4", vip: true }
    ]
  },
  {
    id: "nieve-y-fuego",
    title: "Promesa de Nieve y Fuego",
    cover: "https://picsum.photos/seed/nieve-fuego/400/600",
    coverColor: "#0ea5e9",
    synopsis: "Dos reinos separados por una frontera de hielo perpetuo. Dos herederos criados para odiarse. Cuando una profecía obliga a la princesa del norte y al príncipe del sur a unirse en matrimonio, tendrán que decidir si son enemigos por nacimiento o aliados por elección. Romance épico con guerra, magia y el dilema eterno entre el deber y el corazón.",
    genre: "Romance",
    tags: ["Fantasía", "Enemigos a amantes", "Realeza", "Política"],
    chapters: 380,
    volumes: 5,
    status: "En curso",
    rating: 9.2,
    views: 201000,
    lastUpdate: "2026-11-22",
    downloads: [
      { label: "Tomos 1-2 (Cap. 001-150)", size: "24 MB", link: "https://acortador.ejemplo/nieve-v1" },
      { label: "Tomos 3-4 (Cap. 151-300)", size: "26 MB", link: "https://acortador.ejemplo/nieve-v2" },
      { label: "Tomo 5 (Cap. 301-380)", size: "18 MB", link: "https://acortador.ejemplo/nieve-v3", vip: true }
    ]
  },
  {
    id: "arena-y-acero",
    title: "Arena y Acero",
    cover: "https://picsum.photos/seed/arena-acero/400/600",
    coverColor: "#ea580c",
    synopsis: "Capturado y vendido como gladiador a los catorce años, Drago solo conoce dos cosas: el polvo de la arena y el filo del acero. Pero cuando el emperador anuncia un torneo cuya recompensa es la libertad absoluta, Drago se embarcará en una cruzada de sangre donde cada combate lo acerca a descubrir quién realmente lo arrebató de su hogar. Acción brutal en un imperio que se devora a sí mismo.",
    genre: "Acción",
    tags: ["Gladiadores", "Venganza", "Imperio", "Supervivencia"],
    chapters: 290,
    volumes: 4,
    status: "Completado",
    rating: 8.6,
    views: 78000,
    lastUpdate: "2026-08-22",
    downloads: [
      { label: "Tomo 1 (Cap. 001-075)", size: "17 MB", link: "https://acortador.ejemplo/arena-v1" },
      { label: "Tomo 2 (Cap. 076-150)", size: "18 MB", link: "https://acortador.ejemplo/arena-v2" },
      { label: "Tomo 3 (Cap. 151-220)", size: "16 MB", link: "https://acortador.ejemplo/arena-v3" },
      { label: "Tomo Final (Cap. 221-290)", size: "17 MB", link: "https://acortador.ejemplo/arena-v4" }
    ]
  }
];

/* Exponer para uso en app.js */
if (typeof window !== 'undefined') {
  window.NOVELAS = NOVELAS;
}
