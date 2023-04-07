import { PrismaClient } from "@prisma/client";
import { add } from "date-fns";

// Instantiate Prisma Client
const prisma = new PrismaClient();

// A `main` function so that we can use async/await
async function main() {
  await prisma.testResult.deleteMany({});
  await prisma.courseEnrollment.deleteMany({});
  await prisma.test.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.course.deleteMany({});

  const grace = await prisma.user.create({
    data: {
      email: "grace@hey.com",
      firstName: "Grace",
      lastName: "Bell",
      social: {
        facebook: "gracebell",
        twitter: "therealgracebell",
      },
    },
  });

  const weekFromNow = add(new Date(), { days: 7 });
  const twoWeekFromNow = add(new Date(), { days: 14 });
  const monthFromNow = add(new Date(), { days: 28 });

  const course = await prisma.course.create({
    data: {
      name: "CRUD with Prisma",
      courseDetails: "A soft introduction to CRUD with Prisma",
      tests: {
        create: [
          {
            date: weekFromNow,
            name: "First test",
          },
          {
            date: twoWeekFromNow,
            name: "Second test",
          },
          {
            date: monthFromNow,
            name: "Final exam",
          },
        ],
      },
      members: {
        create: {
          role: "TEACHER",
          user: {
            connect: { email: grace.email },
          },
        },
      },
    },
    include: {
      tests: true,
      members: {
        include: { user: true },
      },
    },
  });

  const david = await prisma.user.create({
    data: {
      email: "david@hey.com",
      firstName: "David",
      lastName: "white",
      social: {
        facebook: "davidwhit",
      },
      courses: {
        create: {
          role: "STUDENT",
          course: { connect: { id: course.id } },
        },
      },
    },
  });

  const tom = await prisma.user.create({
    data: {
      email: "tom@hey.com",
      firstName: "Tom",
      lastName: "Lee",
      social: {
        twitter: "tomleeeeee",
      },
      courses: {
        create: {
          role: "STUDENT",
          course: { connect: { id: course.id } },
        },
      },
    },
  });

  const testResult = [800, 905, 700];
  let counter = 0;

  for (const test of course.tests) {
    const tomTestResult = await prisma.testResult.create({
      data: {
        gradedBy: {
          connect: {
            email: grace.email,
          },
        },
        student: {
          connect: { email: tom.email },
        },
        test: {
          connect: { id: test.id },
        },
        result: testResult[counter],
      },
    });
    counter++;
  }

  const results = await prisma.testResult.aggregate({
    where: { studentId: tom.id },
    _avg: { result: true },
    _count: { result: true },
    _max: { result: true },
  });

  // const testUser = await prisma.user.upsert({
  //   create: {
  //     email: "test@prisma.io",
  //     firstName: "Grace",
  //     lastName: "Bell",
  //   },
  //   update: {
  //     firstName: "Grace",
  //     lastName: "Bell",
  //   },
  //   where: {
  //     email: "test@prisma.io",
  //   },
  // });
  // const testAdmin = await prisma.user.upsert({
  //   create: {
  //     email: "test-admin@prisma.io",
  //     firstName: "Raini",
  //     lastName: "Goenka",
  //   },
  //   update: {
  //     firstName: "Raini",
  //     lastName: "Goenka",
  //   },
  //   where: {
  //     email: "test-admin@prisma.io",
  //   },
  // });

  console.log(`Created test user\tid: ${grace.id} | email: ${grace.email} `);
  // console.log(`Created test a Course : ${JSON.stringify(course)} `);
  console.log(course);
  // console.log(
  //   `Created test admin\tid: ${testAdmin.id} | email: ${testAdmin.email} `
  // );
}

main()
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Disconnect Prisma Client
    await prisma.$disconnect();
  });
