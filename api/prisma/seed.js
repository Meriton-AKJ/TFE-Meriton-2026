import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import bcrypt from 'bcrypt'

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
    amenities: [
      { icon: 'wifi',        label: 'Wi-Fi gratuit' },
      { icon: 'tv',          label: 'Télévision HD' },
      { icon: 'ac_unit',     label: 'Climatisation' },
      { icon: 'lock',        label: 'Coffre-fort' },
      { icon: 'local_bar',   label: 'Minibar' },
      { icon: 'dry',         label: 'Sèche-cheveux' },
    ],
    image: '/assets/images/standard-room.webp',
  },
  {
    name: 'Chambre Supérieure',
    type: 'superieure',
    capacity: 2,
    family: false,
    price: 185,
    featured: true,
    description: 'Spacieuse et raffinée, la chambre supérieure offre une vue sur la ville et des prestations haut de gamme.',
    amenities: [
      { icon: 'wifi',          label: 'Wi-Fi gratuit' },
      { icon: 'tv',            label: 'Télévision HD' },
      { icon: 'ac_unit',       label: 'Climatisation' },
      { icon: 'lock',          label: 'Coffre-fort' },
      { icon: 'local_bar',     label: 'Minibar' },
      { icon: 'spa',           label: 'Peignoir & chaussons' },
      { icon: 'location_city', label: 'Vue sur la ville' },
    ],
    image: '/assets/images/superior-room.webp',
  },
  {
    name: 'Suite Meriton',
    type: 'suite',
    capacity: 2,
    family: false,
    price: 320,
    featured: true,
    description: 'Notre suite phare, un espace d\'exception avec salon séparé, baignoire balnéo et service de conciergerie dédié.',
    amenities: [
      { icon: 'wifi',          label: 'Wi-Fi gratuit' },
      { icon: 'weekend',       label: 'Salon séparé' },
      { icon: 'bathtub',       label: 'Baignoire balnéo' },
      { icon: 'tv',            label: 'Télévision HD' },
      { icon: 'liquor',        label: 'Minibar premium' },
      { icon: 'spa',           label: 'Peignoir & chaussons' },
      { icon: 'support_agent', label: 'Conciergerie dédiée' },
      { icon: 'panorama',      label: 'Vue panoramique' },
    ],
    image: '/assets/images/suite-room.webp',
  },
  {
    name: 'Chambre Familiale',
    type: 'standard',
    capacity: 4,
    family: true,
    price: 210,
    featured: false,
    description: 'Conçue pour les familles, cette chambre spacieuse accueille jusqu\'à 4 personnes avec tout le confort nécessaire.',
    amenities: [
      { icon: 'wifi',      label: 'Wi-Fi gratuit' },
      { icon: 'bed',       label: 'Deux lits doubles' },
      { icon: 'tv',        label: 'Télévision HD' },
      { icon: 'ac_unit',   label: 'Climatisation' },
      { icon: 'lock',      label: 'Coffre-fort' },
      { icon: 'dry',       label: 'Sèche-cheveux' },
    ],
    image: '/assets/images/standard-room-f.webp',
  },
  {
    name: 'Suite Familiale',
    type: 'suite',
    capacity: 4,
    family: true,
    price: 420,
    featured: false,
    description: 'L\'alliance du luxe et de l\'espace familial : deux chambres communicantes, salon et salle de bains double.',
    amenities: [
      { icon: 'wifi',          label: 'Wi-Fi gratuit' },
      { icon: 'door_front',    label: 'Deux chambres' },
      { icon: 'weekend',       label: 'Salon' },
      { icon: 'bathroom',      label: 'Deux salles de bains' },
      { icon: 'liquor',        label: 'Minibar premium' },
      { icon: 'spa',           label: 'Peignoirs & chaussons' },
      { icon: 'support_agent', label: 'Conciergerie dédiée' },
    ],
    image: '/assets/images/suite-room.webp',
  },
  {
    name: 'Chambre Supérieure Familiale',
    type: 'superieure',
    capacity: 3,
    family: true,
    price: 260,
    featured: false,
    description: 'Idéale pour une famille de trois, cette chambre supérieure combine espace généreux et finitions soignées.',
    amenities: [
      { icon: 'wifi',       label: 'Wi-Fi gratuit' },
      { icon: 'single_bed', label: 'Lit double + lit simple' },
      { icon: 'tv',         label: 'Télévision HD' },
      { icon: 'ac_unit',    label: 'Climatisation' },
      { icon: 'lock',       label: 'Coffre-fort' },
      { icon: 'spa',        label: 'Peignoir & chaussons' },
    ],
    image: '/assets/images/superior-room-f.webp',
  },
]

async function main() {
  console.log('Seeding database...')

  await prisma.room.deleteMany()
  for (const room of rooms) {
    await prisma.room.create({ data: room })
  }
  console.log(`${rooms.length} rooms created.`)

  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD
  const adminName = process.env.ADMIN_NAME || 'Admin'

  if (adminEmail && adminPassword) {
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        name: adminName,
        email: adminEmail,
        password: await bcrypt.hash(adminPassword, 10),
        role: 'ADMIN',
      },
    })
    console.log(`Admin user created: ${adminEmail}`)
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
