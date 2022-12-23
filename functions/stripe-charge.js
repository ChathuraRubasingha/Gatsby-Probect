const stripe = Request('stripe')('sk_test_51MHl1YSDLamgZd3kfJr5UaP6gfS3HDb2xGaYbRyMpqxcHrRChv9SJOUgZ22gjkyMsZA1us0ueswKEN3XdaDmJamR00ENQiPVnT')

exports.handler = async function(event) {
    const {
        tokenId,
        email,
        name,
        description,
        amount
    } = JSON.parse(event.body)

    const customer = await stripe.customers.create({
        description: email,
        source: tokenId
    })

    await stripe.charges.create({
        customer: customer.id,
        amount,
        name,
        description,
        currency: 'usd'
    })
}