import express from 'express'
import morgan from 'morgan'
import path from 'path'
import rootRouter from './routers/root.js'
import categoryRouter from './routers/category.js'
import addCategoryRouter from './routers/addCategory.js'
import addItemRouter from './routers/addItem.js'
import saveItemRouter from './routers/saveItem.js'
import { getAllCategories } from './controllers/categories.js';

// import rootRouter from './routes/root.js'
// import newRouter from './routes/new.js'
// import deleteRouter from './routes/delete.js'

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
app.use('/addCategory',addCategoryRouter)
app.use('/addItem',addItemRouter)
app.use('/saveItem', saveItemRouter)

app.listen(PORT,(err)=>{
    if (err)  console.log(err)
    console.log("Server listening on Port",PORT)
})