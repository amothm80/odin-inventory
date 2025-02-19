import express from 'express'
// import morgan from 'morgan'
// import path from 'path'
import rootRouter from './routers/root.js'
import categoryRouter from './routers/category.js'
import itemRouter from './routers/item.js'
import { getAllCategories } from './controllers/categories.js';

const app = express();
const PORT = 3000;

// app.set('view engine', 'ejs');
app.set('view engine', 'pug');

// app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'))

app.use(getAllCategories)
app.use('/',rootRouter)
app.use('/category',categoryRouter)
app.use('/item',itemRouter)
// app.use('/saveItem', saveItemRouter)

app.listen(PORT,(err)=>{
    if (err)  console.log(err)
    console.log("Server listening on Port",PORT)
})