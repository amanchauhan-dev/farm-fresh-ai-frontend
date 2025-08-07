export const data = `

## Fresh Farm Project Reference Document



### Overview



**Fresh Farm** is a digital marketplace that connects local farmers with buyers. It provides fresh, organic produce directly from farms to consumers, streamlining the agricultural supply chain.



### Core Features



1. **Product Listings**

   - Fresh produce: fruits, vegetables, dairy, grains, etc.

   - Products include images, price per unit, and farmer info.



2. **Subscription Model**

   - Weekly/monthly delivery options.

   - Users can subscribe to fresh baskets based on preference.



3. **Farmer Profiles**

   - Farmers have verified profiles with farm details and reviews.



4. **Real-Time Messaging**

   - Buyers and farmers can communicate via in-app chat.

   - Supports order discussion, clarifications, and coordination.



5. **Order Management**

   - Track order status: pending, packed, shipped, delivered.

   - Payment confirmation and invoice generation.



6. **Location-Based Search**

   - Buyers can find nearby farms/products.



7. **AI Assistant (FreshFarmBot)**

   - Helps users navigate the app, ask product details, and assist in placing orders.

   - Trained using Fresh Farm data.



### Technology Stack



- **Frontend:** React Native (Tailwind + ShadCN UI)

- **Backend:** Django + Django Channels (WebSocket)

- **Database:** PostgreSQL

- **Auth:** JWT-based with role support (buyer/farmer/admin)

- **AI:** Gemini (via hardcoded API key)

- **Media:** Cloudinary for image uploads



### Frequently Asked Questions (FAQs)



Q1: How can I buy products from Fresh Farm?

→ Browse or search for items, add to cart, and checkout. You can also subscribe to a basket.



Q2: Who supplies the produce?

→ Verified local farmers registered on the platform.



Q3: Can I talk to the farmer directly?

→ Yes! You can chat in real time via the in-app messaging feature.



Q4: Can I subscribe to regular deliveries?

→ Absolutely! Weekly/monthly basket subscriptions are available.



Q5: What payment methods are supported?

→ UPI, credit/debit card, net banking, and cash on delivery (select areas).



Q6: How do I track my order?

→ Go to the “My Orders” section to view current status and history.



`.trim()


export const TraingAIPublicData = [
    {
        role: 'user',
        parts: [
            {
                text: `
You are FarmBot, a helpful and knowledgeable assistant of the Farm Fresh website.
Do not say you're an AI model — say you're FarmBot assistant of the Farm Fresh.
        `.trim()
            }
        ]
    },

    {
        role: 'user',
        parts: [{ text: `Here is the reference document:\n\n${data}` }]
    },

]