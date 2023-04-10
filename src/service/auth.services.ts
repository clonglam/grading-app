import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

passport.use(
    new LocalStrategy(async (email, password, done) => {
        // try {
        //     const user = await prisma.user.findUnique({
        //         where: {
        //             email,
        //         },
        //     });
        //     if (!user) {
        //         return done(null, false);
        //     }
        //     const passwordMatch = await compare(password, user.password);
        //     if (!passwordMatch) {
        //         return done(null, false);
        //     }
        //     return done(null, user);
        // } catch (error) {
        //     return done(error);
        // }
    })
);
