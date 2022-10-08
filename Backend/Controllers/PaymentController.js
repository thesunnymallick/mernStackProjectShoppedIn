const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.proccssToPayment=async(req, res, next)=>{

    try {
        const myPayment=await stripe.paymentIntents.create(
            {
               amount:req.body.amount,
               currency:"inr",
               metadata:{
               company:"ShoopedIn",

               },
            })

            res.status(200).send({
                success:true,
                client_secret:myPayment.client_secret
            })
        
    } catch (error) {
        res.status(404).send(error)
        
    }

}

exports.stripeApiKey=async(req, res, next)=>{
    try {
        res.status(200).send({stripeApiKey:process.env.STRIPE_API_KEY})
        
    } catch (error) {
        res.send(404).send(error)
    }
}