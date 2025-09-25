import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import apiRouter from './routes/routes';

const app = new Koa();

app.use(cors({
  origin: 'http://localhost:8081', // * to allow all origins
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE',],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// Body parser middleware
app.use(bodyParser());

// Middleware to log requests
app.use(async (ctx, next) => {
    console.log(`Request received from path: ${ctx.path}, method: ${ctx.method}`);
    await next();
})



// Use the API routes
app.use(apiRouter.routes());
app.use(apiRouter.allowedMethods());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
