using Lab2.DB;
using Lab2.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Data;

namespace Lab2.Controllers
{
    public class AttackSimController : Controller
    {
        private readonly IDataBase _dataBase;

        public AttackSimController(IDataBase dataBase)
        {
            _dataBase = dataBase;
        }

        [AllowAnonymous]
        public IActionResult SqlInjection()
        {
            return View();
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult SqlInjectionProfileCreate(string email, string password, string firstName, string lastName)
        {
            Profile profile = new Profile()
            {
                email = email,
                password = password,
                firstName = firstName,
                lastName = lastName
            };

            _dataBase.InsertData(profile);

            return View("SqlInjection");
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult SqlInjectionProfileShow(string email, string password, string attackEnabled)
        {
            Profile profile = new Profile()
            {
                email = email,
                password = password
            };

            List<string> dataStrings = new List<string>();
            DataTable data = _dataBase.GetData(profile, attackEnabled.Equals("Enabled"));
            foreach(DataRow row in data.Rows)
            {
                string kek = "";
                foreach(var nesto in row.ItemArray)
                {
                    kek += kek.Length > 0 ? "       " + nesto.ToString().Trim() : nesto.ToString().Trim();
                }
                dataStrings.Add(kek);
            }

            ViewBag.DataStrings = dataStrings;
            return View("SqlInjection");
        }


        [AllowAnonymous]
        [HttpGet]
        public IActionResult CSRF()
        {
            return View();
        }
    }
}
