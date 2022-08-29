using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PersonCarReactRouter.Data
{
    public class PersonCarRepo
    {
        
        private readonly string _connectionString;

        public PersonCarRepo(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.Include(p => p.Cars).ToList();
        }
        public Person GetPersonById(int id)
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.People.Include(p=>p.Cars).FirstOrDefault(p => p.Id == id);
        }

        public void AddPerson(Person person)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }
        public void AddCar(Car car)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Cars.Add(car);
            context.SaveChanges();
        }
        public List<Car> GetCarsForPerson(int personId)
        {
            using var context = new PeopleDataContext(_connectionString);
            return context.Cars.Include(c => c.PersonId).Where(c=>c.PersonId==personId).ToList();
        }
        public void DeleteCars(int personId)
        {
            using var context = new PeopleDataContext(_connectionString);
            context.Database.ExecuteSqlInterpolated($"DELETE FROM Cars WHERE PersonId = {personId}");
            context.SaveChanges();

        }
    }
}

