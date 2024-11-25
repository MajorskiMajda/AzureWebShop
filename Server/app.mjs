import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    priceCents: { type: Number, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    category: { type: String },
    image: { type: String },
});

const Product = mongoose.model('Product', productSchema);

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    deliveryDate: { type: String },
    totalOrderPrice: { type: Number, required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, 
            name: { type: String, required: true },
            priceCents: { type: Number, required: true },
            description: { type: String },
            quantity: { type: Number, required: true },
            category: { type: String },
            image: { type: String },
        },
    ],
});
const bestsellerSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
});

const Bestseller = mongoose.model('Bestseller', bestsellerSchema);


const Order = mongoose.model('Order', orderSchema);

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).send('Error fetching products');
    }
});

app.post('/orders', async (req, res) => {
    try {
        const { products, totalOrderPrice, deliveryDate } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ message: 'Products are required' });
        }
        if (typeof totalOrderPrice !== 'number' || totalOrderPrice <= 0) {
            return res.status(400).json({ message: 'Total order price is required and must be greater than zero' });
        }
        if (!deliveryDate) {
            return res.status(400).json({ message: 'Delivery date is required' });
        }

        const validatedProducts = [];

        for (const item of products) {

            if (!item.productId || !mongoose.Types.ObjectId.isValid(item.productId)) {
                return res.status(400).json({ message: `Invalid or missing productId for product ${item.name}` });
            }

            if (!item.quantity || item.quantity <= 0) {
                return res.status(400).json({ message: `Quantity is required and must be greater than zero for product ${item.productId}` });
            }

            const productId = new mongoose.Types.ObjectId(item.productId);

            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.productId}` });
            }

            validatedProducts.push({
                productId: productId,
                name: product.name,
                priceCents: product.priceCents,
                description: product.description,
                category: product.category,
                image: product.image,
                quantity: item.quantity, 
            });
        }

        const newOrder = new Order({
            orderId: uuidv4(),  
            deliveryDate: deliveryDate,
            totalOrderPrice: totalOrderPrice,
            products: validatedProducts,
        });

        const savedOrder = await newOrder.save();

        res.status(201).json({
            message: 'Order created successfully',
            order: savedOrder,
        });
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ message: 'Error creating order' });
    }
});

app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().populate('products.productId'); 
        res.json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: 'Error fetching orders' });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (err) {
        console.error('Error fetching product:', err);
        res.status(500).json({ message: "Error fetching product" });
    }
});
app.get('/bestsellers', async (req, res) => {
    try {
        const bestsellers = await Bestseller.find().populate('productId'); 

        res.json(bestsellers);
    } catch (err) {
        console.error('Error fetching bestsellers:', err);
        res.status(500).json({ message: 'Error fetching bestsellers' });
    }
});

app.get('/add-product', (req, res) => {
    res.render('add-product');
});
app.get('/products', (req, res) => {
    res.send('Products route is working!');
});


app.post('/products/add', async (req, res) => {
    const { name, priceCents, description, quantity, category, image } = req.body;

    if (!name || !priceCents || !description || !quantity || !category) {
        return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    const newProduct = new Product({
        name,
        priceCents,
        description,
        quantity,
        category,
        image,
    });

    try {

        const savedProduct = await newProduct.save();
        
        res.status(201).json({
            message: 'Product added successfully',
            product: savedProduct,
        });
    } catch (err) {
        console.error('Error adding product:', err);
        res.status(500).json({ message: 'Error adding product' });
    }
});


app.get('/add-bestseller', (req, res) => {
    res.render('add-bestseller');
});


app.post('/bestsellers/add', async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid or missing productId' });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const existingBestseller = await Bestseller.findOne({ productId });
        if (existingBestseller) {
            return res.status(400).json({ message: 'Product is already a bestseller' });
        }

        const newBestseller = new Bestseller({
            productId, 
        });

        const savedBestseller = await newBestseller.save();
        res.status(201).json({ message: 'Product added to bestsellers', bestseller: savedBestseller });
    } catch (err) {
        console.error('Error adding to bestsellers:', err);
        res.status(500).json({ message: 'Error adding to bestsellers' });
    }
});




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
