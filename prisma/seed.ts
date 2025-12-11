import { PrismaClient } from "../generated/prisma/client"
import { faker } from '@faker-js/faker'
import dotenv from 'dotenv'
dotenv.config()

const prisma = new PrismaClient()
async function main() {
    const materialList = ['wood', 'plastic', 'metal', 'other']
    for (let i = 0; i < 30; i++) {
        const child = await prisma.child.create({
            data: {
                name: faker.person.fullName(),
                address: faker.location.streetAddress(),
                country: faker.location.country(),
                good: faker.datatype.boolean(),
                
            },
        })
    }
    for (let i = 0; i < 30; i++) {
        const toy = await prisma.toy.create({
            data: {
                name: faker.science.chemicalElement().name,
                material: faker.helpers.arrayElement(materialList),
                weight: faker.number.int({ min: 100, max: 2000 }),
            }
        })
    }





}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })