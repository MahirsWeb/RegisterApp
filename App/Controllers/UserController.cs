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
            var mailExist = await _mongoDBService.Users.Find(u => u.Email == personModel.Email).FirstOrDefaultAsync();
            if(mailExist != null)
            {
                ModelState.AddModelError("Email", "Email already exist.");
                return View(personModel);
            }

            var usernameExist = await _mongoDBService.Users.Find(u => u.Username == personModel.Username).FirstOrDefaultAsync();
            if(usernameExist != null)
            {
                ModelState.AddModelError("Username", "Username already exist.");
                return View(personModel);
            }

            await _mongoDBService.Users.InsertOneAsync(personModel);
            return RedirectToAction("Login", "Home");
        }


        return View(personModel);
    }
}
