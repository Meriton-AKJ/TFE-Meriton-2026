const chambres = [
  {
    id: 1,
    nom: 'Chambre Standard',
    type: 'standard',
    capacite: 2,
    prix: 95,
    featured: true,
    description: 'Chambre élégante avec literie haut de gamme, salle de bain privée et vue sur le jardin intérieur.',
    equipements: ['wifi', 'tv', 'air', 'bathtub'],
    image: '/assets/images/standard-room.webp'
  },
  {
    id: 2,
    nom: 'Chambre Standard Familiale',
    type: 'standard',
    capacite: 4,
    prix: 105,
    featured: false,
    description: 'La même élégance que notre Standard, aménagée pour deux adultes et deux enfants. Lits enfants disponibles sur demande.',
    equipements: ['wifi', 'tv', 'air', 'crib'],
    image: '/assets/images/standard-room-f.webp'
  },
  {
    id: 3,
    nom: 'Chambre Supérieure',
    type: 'superieure',
    capacite: 2,
    prix: 125,
    featured: true,
    description: 'Spacieuse et raffinée, avec vue privilégiée sur la ville. Décoration soignée, literie premium et salle de bain luxueuse.',
    equipements: ['wifi', 'tv', 'air', 'bathtub', 'local_bar'],
    image: '/assets/images/superior-room.webp'
  },
  {
    id: 4,
    nom: 'Chambre Supérieure Familiale',
    type: 'superieure',
    capacite: 4,
    prix: 135,
    featured: false,
    description: 'Tout le confort de notre Supérieure, pensée pour les familles avec un coin nuit séparé pour les enfants.',
    equipements: ['wifi', 'tv', 'air', 'bathtub', 'local_bar', 'crib'],
    image: '/assets/images/superior-room-f.webp'
  },
  {
    id: 5,
    nom: 'Suite Meriton',
    type: 'suite',
    capacite: 2,
    prix: 200,
    featured: true,
    description: 'Notre chambre la plus prestigieuse : salon privé, baignoire balnéo, service en chambre et vue panoramique sur Bruxelles.',
    equipements: ['wifi', 'tv', 'air', 'bathtub', 'local_bar', 'room_service', 'spa'],
    image: '/assets/images/suite-room.webp'
  },
]

export default chambres
