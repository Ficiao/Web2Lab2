using Lab1.DB;
using Lab1.Models;
using Microsoft.AspNetCore.Mvc;

namespace Lab1.Controllers
{
    public class HomeController : Controller
    {
        private readonly IDataBase _dataBase;

        public HomeController(IDataBase database)
        {
            _dataBase = database;
        }

        public IActionResult Index()
        {
            //Scedule scedule = new Scedule();
            //scedule.rounds = new Round[14];
            //for(int i = 0; i < 14; i++)
            //{
            //    scedule.rounds[i] = new Round();
            //    scedule.rounds[i].matches = new Match[4];
            //    for(int j = 0; j < 4; j++)
            //    {
            //        scedule.rounds[i].matches[j] = new Match();
            //        scedule.rounds[i].matches[j].firstTeam = "f";
            //        scedule.rounds[i].matches[j].secondTeam = "s";
            //        scedule.rounds[i].matches[j].goalsFirstTeam = -1;
            //        scedule.rounds[i].matches[j].goalsSecondTeam = -1;
            //    }
            //}

            //_dataBase.SendScedule(scedule);
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
