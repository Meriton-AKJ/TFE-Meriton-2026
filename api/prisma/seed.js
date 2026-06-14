import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const dbUrl = new URL(process.env.DB_URL)
const adapter = new PrismaMariaDb({
  host:     dbUrl.hostname,
  user:     dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.slice(1),
  port:     parseInt(dbUrl.port) || 3306,
})
const prisma = new PrismaClient({ adapter })

const rooms = [
  {
    name: 'Chambre Standard',
    type: 'standard',
    capacity: 2,
    family: false,
    price: 120,
    featured: true,
    description: 'Une chambre confortable et élégante, idéale pour un séjour d\'affaires ou de loisirs au cœur de Bruxelles.',
    amenities: ['Wi-Fi gratuit', 'Télévision HD', 'Climatisation', 'Coffre-fort', 'Minibar', 'Sèche-cheveux'],
    image: '/assets/images/chambre-standard.webp',
  },
  {
    name: 'Chambre Supérieure',
    type: 'superieure',
    capacity: 2,
    family: false,
    price: 185,
    featured: true,
    description: 'Spacieuse et raffinée, la chambre supérieure offre une vue sur la ville et des prestations haut de gamme.',
    amenities: ['Wi-Fi gratuit', 'Télévision HD', 'Climatisation', 'Coffre-fort', 'Minibar', 'Peignoir & chaussons', 'Vue sur la ville'],
    image: '/assets/images/chambre-superieure.webp',
  },
  {
    name: 'Suite Meriton',
    type: 'suite',
    capacity: 2,
    family: false,
    price: 320,
    featured: true,
    description: 'Notre suite phare, un espace d\'exception avec salon séparé, baignoire balnéo et service de conciergerie dédié.',
    amenities: ['Wi-Fi gratuit', 'Salon séparé', 'Baignoire balnéo', 'Télévision HD', 'Minibar premium', 'Peignoir & chaussons', 'Conciergerie dédiée', 'Vue panoramique'],
    image: '/assets/images/suite-meriton.webp',
  },
  {
    name: 'Chambre Familiale',
    type: 'standard',
    capacity: 4,
    family: true,
    price: 210,
    featured: false,
    description: 'Conçue pour les familles, cette chambre spacieuse accueille jusqu\'à 4 personnes avec tout le confort nécessaire.',
    amenities: ['Wi-Fi gratuit', 'Deux lits doubles', 'Télévision HD', 'Climatisation', 'Coffre-fort', 'Sèche-cheveux'],
    image: '/assets/images/chambre-familiale.webp',
  },
  {
    name: 'Suite Familiale',
    type: 'suite',
    capacity: 4,
    family: true,
    price: 420,
    featured: false,
    description: 'L\'alliance du luxe et de l\'espace familial : deux chambres communicantes, salon et salle de bains double.',
    amenities: ['Wi-Fi gratuit', 'Deux chambres', 'Salon', 'Deux salles de bains', 'Minibar premium', 'Peignoirs & chaussons', 'Conciergerie dédiée'],
    image: '/assets/images/suite-familiale.webp',
  },
  {
    name: 'Chambre Supérieure Familiale',
    type: 'superieure',
    capacity: 3,
    family: true,
    price: 260,
    featured: false,
    description: 'Idéale pour une famille de trois, cette chambre supérieure combine espace généreux et finitions soignées.',
    amenities: ['Wi-Fi gratuit', 'Lit double + lit simple', 'Télévision HD', 'Climatisation', 'Coffre-fort', 'Peignoir & chaussons'],
    image: '/assets/images/chambre-superieure-familiale.webp',
  },
]

async function main() {
  console.log('Seeding database...')
  await prisma.room.deleteMany()
  for (const room of rooms) {
    await prisma.room.create({ data: room })
  }
  console.log(`${rooms.length} rooms created.`)
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
