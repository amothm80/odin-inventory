import express from 'express'
import morgan from 'morgan'
import path from 'path'
import rootRouter from './routers/root.js'
import categoryRouter from './routers/category.js'

// import rootRouter from './routes/root.js'
// import newRouter from './routes/new.js'
// import deleteRouter from './routes/delete.js'

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'))
// app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/',rootRouter)
app.use('/category',categoryRouter)
// app.use('/new',newRouter)
// app.use('/delete',deleteRouter)

app.listen(PORT,(err)=>{
    if (err)  console.log(err)
    console.log("Server listening on Port",PORT)
})