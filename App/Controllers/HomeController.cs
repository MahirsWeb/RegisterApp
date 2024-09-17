using Microsoft.AspNetCore.Mvc;
//using MongoDB.Bson;
//using MongoDB.Driver;
//using App.Models;
using App.Services;

namespace App.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }
    }
}
