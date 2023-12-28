import express, { Application,Request, Response } from "express";
const app: Application = express();
import cors from 'cors'; 
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";

app.use(cors());
// parser
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

// Routes
app.use('/api/v1', router); 


//global error handler
 app.use(globalErrorHandler);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})
export default app;
