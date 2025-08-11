import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import authRouter from './module/auth/auth.router';
import cookieParser from 'cookie-parser';
import adminRouter from './module/admin/admin.router';
import { ProductRoutes } from './module/product/product.router';
import { RepairRoutes } from './module/repair/repair.router';

const app: Application = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    // origin: ['https://basha-vara-frontend.vercel.app'],
    credentials: true,
  }),
);



app.use(cookieParser());
app.use(express.json());


app.use(express.urlencoded({ extended: true }));

app.use(authRouter);
app.use(adminRouter);
app.use(ProductRoutes);
app.use(RepairRoutes);


app.get('/', (req: Request, res: Response) => {
  res.send('Hello from basha vara');
});

export default app;
