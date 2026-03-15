import { Router } from "express";
import { User } from "../controller/userController.js";
import { Habit } from "../controller/habitController.js";
import { Statistic } from "../controller/statisticController.js";

const route = Router();

//teste de rota
route.get("/", (req,res)=>{
    console.log("rota funcionando")
    res.status(200).json({success:true, message:"Conexão estabelecida"});
});

//classes que serão utilizadas nas rotas
const user = new User();
const habit = new Habit();
const statistic = new Statistic();

//rotas de users
route.post("/create",user.create);
route.post("/login", user.login);
route.put("/changeEmail", user.chageEmail);
route.put("/changePass", user.changePassword);
route.get("/user", user.getUser);
route.delete("/userDelete", user.deleteUser);

//rotas de habit
route.post("/create/habit", habit.create);
route.post("/completed/habit", habit.completed);
route.get("/read/habit", habit.getHabit);


//rotas de statistic





export default route;