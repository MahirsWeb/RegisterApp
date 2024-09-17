using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using App.Models;
using App.Services;
using MongoDB.Driver;

namespace App.Controllers;
public class UserController : Controller
{
    private readonly MongoDBService _mongoDBService;
    public UserController(MongoDBService mongoDBService)
    {
        _mongoDBService = mongoDBService;
    }

    [HttpGet]
    public IActionResult Register()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Register(PersonModel personModel)
    {
        if (ModelState.IsValid)
        {
            await _mongoDBService.Users.InsertOneAsync(personModel);

           
            return RedirectToAction("Login", "Home");
        }


        return View(personModel);
    }
}
