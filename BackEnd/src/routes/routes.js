import { Router } from "express";
import { User } from "../controller/userController.js";
import { Habit } from "../controller/habitController.js";
import { Statistic } from "../controller/statisticController.js";
import { Auth } from "../middleware/auth.js";

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
route.put("/changeEmail", Auth, user.chageEmail);
route.put("/changePass", Auth, user.changePassword);
route.get("/user", Auth, user.getUser);
route.delete("/userDelete", Auth,user.deleteUser);

//rotas de habit
route.post("/create/habit", Auth,habit.create);
route.post("/completed/habit", Auth,habit.completed);
route.get("/read/habit",Auth,habit.getHabit);



//rotas de statistic
route.get("/statistic/monthly",Auth,statistic.getMonthlyProgress);
route.get("/statistic/user", Auth,statistic.userStatistics);




export default route;