using Microsoft.Extensions.Options;
using MongoDB.Driver;
using App.Models;
using App.Services;

//var builder prima objekat WebApplication.
//Kreira WebApplication Builder-a
//Kasnije taj builder konfiguira informacije ucitane is JSON file-a
//AddJsonFile("nazivFajla"...)
//optional:false -> (znaci da nije opcionalan izbor, u slucaju da appsettings.json ne radi, ni aplikacija nece raditi)
//reloadOnChange: true -> u slucaju da dode do promjene u appsettings.json-u dok je aplikacija u radu, automatski ce se ponovo ucitati sa izmjenama.
var builder = WebApplication.CreateBuilder(args);

// Load configuration from appsettings.json
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                     .AddEnvironmentVariables();

//Dependency Injection(DI), registrujemo sve servise koje app koristi
//Registruje servise koji omogucavaju koristenje Controllers i Views foldera
builder.Services.AddControllersWithViews();



builder.Services.AddSingleton<MongoDBService>();

var app = builder.Build();


if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Register}/{id?}");

app.Run();
