using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using ElectraDbRepository;
using ElectraProjDB.DTOs;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ElectraProjDB.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class LoginController : ControllerBase
    {
        private readonly DbRepository _db;

        public LoginController(DbRepository db)
        {
            _db = db;
        }



        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUserName()
        {
            object param = new
            {};

            string query = "SELECT * FROM LoginUsers";

            var TheUser = await _db.GetRecordsAsync<LoginDTO>(query, param);

            List<LoginDTO> usersinfo = TheUser.ToList();

            return Ok(usersinfo);


        }


    }

}

