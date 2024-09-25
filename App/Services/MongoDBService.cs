using App.Models;
using MongoDB.Driver;
//using System;

namespace App.Services
{
    public class MongoDBService
    {
        private readonly IMongoDatabase _database;
        private readonly string colName;

        //konstruktor
        public MongoDBService(IConfiguration configuration)
        {
            var connectionString = configuration.GetSection("ConnectionStrings:MongoDB").Value;
            var databaseName = configuration.GetSection("ConnectionStrings:NameDb").Value;
            colName = configuration.GetSection("ConnectionStrings:NameCollection").Value;
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(databaseName);
            _database = client.GetDatabase(databaseName);
        }

        public IMongoCollection<PersonModel> Users => _database.GetCollection<PersonModel>(colName);
    }

}
