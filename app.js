import express from "express";
// import morgan from 'morgan'
// import path from 'path'
import rootRouter from "./routers/root.js";
import categoryRouter from "./routers/category.js";
import itemRouter from "./routers/item.js";
import { getAllCategories } from "./controllers/categories.js";

const app = express();
const PORT = 3000;

// app.set('view engine', 'ejs');
app.set("view engine", "pug");

// app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("static"));

app.use(getAllCategories);
app.use("/", rootRouter);
app.use("/category", categoryRouter);
app.use("/item", itemRouter);
// app.use('/saveItem', saveItemRouter)

app.use(function (req, res, next) {
  res.status(404).render('404')
});

// error-handling middleware, take the same form
// as regular middleware, however they require an
// arity of 4, aka the signature (err, req, res, next).
// when connect has an error, it will invoke ONLY error-handling
// middleware.

// If we were to next() here any remaining non-error-handling
// middleware would then be executed, or if we next(err) to
// continue passing the error, only error-handling middleware
// would remain being executed, however here
// we simply respond with an error page.

app.use(function (err, req, res, next) {
  // we may use properties of the error object
  // here and next(err) appropriately, or if
  // we possibly recovered from the error, simply next().
  res.status(err.status || 500);
  res.render("500", { error500: err });
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server listening on Port", PORT);
});
