import { NextResponse } from "next/server";
import User from "@/models/User";

import Movie from "@/models/Movie";
import Comment from "@/models/Comment";

export async function GET() {
    let users = null
    let movies = null
    let activeUser = null
    let comments = null
    try {
        users = await User.find().exec();
        const allUsers = users.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            type: user.type,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            emailVerified: user.emailVerified

        }

        ))
        activeUser = await User.find({ emailVerified: true }).exec();

         const allActiveUsers = activeUser.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            type: user.type,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            emailVerified: user.emailVerified

        }))

        movies = await Movie.find().exec();
        let allmovies = movies.map((m) => ({
            id: m.id,
            name: m.title,
            

        }))

       

        allmovies = allmovies.reverse()

        const actualYears = new Date().getFullYear();
        const Jan_March = (await User.find(
            {
                createdAt: {
                    $gte: new Date(actualYears, 0, 1),
                    $lt: new Date(actualYears, 2, 29)
                }
            }
        ).exec()).length;
        comments= await Comment.find().exec()
        const allcomment = comments.map((c) => ({
            id: c.id,
            name: c.title,
            

        }))
        const Apr_Jun = (await User.find(
            {
                createdAt: {
                    $gte: new Date(actualYears, 3, 1),
                    $lt: new Date(actualYears, 5, 29)
                }
            }
        ).exec()).length;

        const Jul_Sept = (await User.find(
            {
                createdAt: {
                    $gte: new Date(actualYears, 6, 1),
                    $lt: new Date(actualYears, 8, 29)
                }
            }
        ).exec()).length;

        const Oct_Dec = (await User.find(
            {
                createdAt: {
                    $gte: new Date(actualYears, 9, 1),
                    $lt: new Date(actualYears, 11, 29)
                }
            }
        ).exec()).length;
                const intervaleKpi = [
                    [{name:"Jannuary-March",nbr:Jan_March},
                    {name:"April-June",nbr:Apr_Jun},
                    {name:"July-September",nbr:Jul_Sept},
                    {name:"October-December",nbr:Oct_Dec}],
                    [{users:allUsers.length}],
                    [{movies:allmovies.length}],
                    [{activesUsers:allActiveUsers.length}],
                    [{comments:allcomment.length}],
                    
                    // [{movies:5}],
        ]
        
        



        return NextResponse.json(intervaleKpi, { status: 200 });
    } catch (err) {
        console.log(err);

    }

}
