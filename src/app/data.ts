export const data = `

## Fresh Farm Project Reference Document (Updated)

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
   - NEW: Helps users prepare a budget for farm produce.

---

### Technology Stack

- **Frontend:** React Native (Tailwind + ShadCN UI)
- **Backend:** Django + Django Channels (WebSocket)
- **Database:** PostgreSQL
- **Auth:** JWT-based with role support (buyer/farmer/admin)
- **AI:** Gemini (via hardcoded API key)
- **Media:** Cloudinary for image uploads

---

### Frequently Asked Questions (FAQs)

**Q1: How can I buy products from Fresh Farm?**  
→ Browse or search for items, add to cart, and checkout. You can also subscribe to a basket.

**Q2: Who supplies the produce?**  
→ Verified local farmers registered on the platform.

**Q3: Can I talk to the farmer directly?**  
→ Yes! You can chat in real time via the in-app messaging feature.

**Q4: Can I subscribe to regular deliveries?**  
→ Absolutely! Weekly/monthly basket subscriptions are available.

**Q5: What payment methods are supported?**  
→ UPI, credit/debit card, net banking, and cash on delivery (select areas).

**Q6: How do I track my order?**  
→ Go to the “My Orders” section to view current status and history.

---

### 💰 Budget Planning Assistance

FreshFarmBot can assist users in building and managing a personalized grocery budget using farm-fresh produce. Here's how:

#### 1. Smart Basket Recommendations
- Users can input their weekly or monthly budget (e.g., ₹1000/week).
- The bot suggests a custom basket of seasonal and affordable produce.
- Prioritizes high-nutrition, low-cost items (e.g., carrots, spinach, potatoes).

#### 2. Cost Breakdown Tips
- Helps users understand cost per meal and per serving.
- Explains how to stretch ingredients across multiple meals.
  > e.g., “1kg of tomatoes can be used in 3 different dishes.”

#### 3. Budget Calculator (coming soon)
- Users will be able to select preferences (vegetarian, vegan, dairy, etc.), number of people, and get a full budget plan.
- Calculates estimated spend and compares with average savings vs supermarket.

#### 4. Weekly Budgeting Tips
- Buy in-season produce – it's cheaper and fresher.
- Opt for subscription baskets for better value.
- Limit high-cost exotic items unless necessary.
- Plan meals in advance to reduce waste.

---

### Example Q&A for Bot Training

**Q: How can I stick to a ₹1500/month grocery budget on Fresh Farm?**  
→ Try our monthly veggie basket for ₹1200. It includes essentials like leafy greens, root vegetables, and grains. You can also add-on fruits under ₹300.

**Q: What’s the best way to save money while buying fresh produce?**  
→ Use our subscription option for up to 15% discount. Also, buying seasonal produce helps you save and eat fresh.

**Q: Can the AI suggest a budget basket for 2 people?**  
→ Yes! Just share your budget and preferences (e.g., vegetarian), and I’ll suggest a weekly plan with total costs.

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