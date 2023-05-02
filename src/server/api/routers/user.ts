import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";




const ImageLinkList = ["https://i.ibb.co/qW4kmZT/image.png"
                        , "https://i.ibb.co/kq43mvk/1.png"
                        , "https://i.ibb.co/rmBSp2y/2.png"
                        , "https://i.ibb.co/NKbfwRP/3.png"
                        , "https://i.ibb.co/nrf2BnX/4.png"
                        , "https://i.ibb.co/9VWR1Fx/5.png"
                        , "https://i.ibb.co/4fn5P6d/6.png"
                        , "https://i.ibb.co/yFHNB9n/7.png"
                        , "https://i.ibb.co/Xsy1Mh0/8.png"
                        , "https://i.ibb.co/cN58JbY/9.png"]

export const userRouter = createTRPCRouter({

    // Get the user profile data from userId. If there is no profile then create one. 
    getUser: protectedProcedure.query(async ({ ctx }) => {
        // Find the user profile using the user id
        const user = await ctx.prisma.user.findUniqueOrThrow({where: {id: ctx.session.user.id}});

        let userModified = false;


        // If there is no user name then assign annonymous
        if (!user.name) {
            user.name = "Anonymous";
            userModified = true;
        }

        // If the user does not have an circle profile then create one  
        if (!user.profileImage || !user.userTag) {

            // Generate a number between 0 and 9
            const imageSelector = Math.floor(Math.random() * 10);

            // Lower the user name and remove spaces
            const userNameModified = ctx.session.user.name?.toLowerCase().replace(/\s/g, '') || "";

            // Add a random number to the end of the user name to create a unique user tag
            let usertagGenerator : string = userNameModified.concat(Math.floor(Math.random() * 10000000).toString());

            // Ensure that the user tag is unique by generate a new tag if it already exists
            while (await ctx.prisma.user.findFirst({where: {userTag: usertagGenerator}})) {
                usertagGenerator = userNameModified.concat(Math.floor(Math.random() * 10000000).toString());
            }
            
            user.profileImage = ImageLinkList[imageSelector] || "";
            user.userTag      = usertagGenerator;

            userModified = true;
        }
        
        // Update the user profile if it has been modified
        if (userModified){
          await ctx.prisma.user.update({where: {id: ctx.session.user.id}, data: {name: user.name, profileImage: user.profileImage, userTag: user.userTag}});
        }

        return user;
        
    }),
  });