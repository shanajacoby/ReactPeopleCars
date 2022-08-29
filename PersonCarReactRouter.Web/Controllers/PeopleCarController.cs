using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PersonCarReactRouter.Data;
using PersonCarReactRouter.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PersonCarReactRouter.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleCarController : ControllerBase
    {
        private IConfiguration _configuration;


        public PeopleCarController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Route("getall")]
        [HttpGet]
        public List<Person> GetAll()
        {
            var repo = new PersonCarRepo(_configuration.GetConnectionString("ConStr"));
            return repo.GetAll();
        }

        [HttpPost]
        [Route("addperson")]
        public void AddPerson(Person person)
        {
            var repo = new PersonCarRepo(_configuration.GetConnectionString("ConStr"));
            repo.AddPerson(person);
        }
        [HttpPost]
        [Route("addcar")]
        public void AddCar(Car car)
        {
            var repo = new PersonCarRepo(_configuration.GetConnectionString("ConStr"));
            repo.AddCar(car);
        }

        [Route("getcars")]
        [HttpGet]
        public List<Car> GetCars(int id)
        {
            var repo = new PersonCarRepo(_configuration.GetConnectionString("ConStr"));
            return repo.GetCarsForPerson(id);
        }

        [HttpPost]
        [Route("deletecars")]
        public void DeleteCars(DeleteCarsVm vm)
        {
            var repo = new PersonCarRepo(_configuration.GetConnectionString("ConStr"));
            repo.DeleteCars(vm.id);
        }
        [Route("getpersonbyid")]
        [HttpGet]
        public Person GetPersonById(int id)
        {
            var repo = new PersonCarRepo(_configuration.GetConnectionString("ConStr"));
            return repo.GetPersonById(id);
        }
    }
}
