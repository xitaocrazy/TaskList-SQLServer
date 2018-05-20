using System.Web.Http;
using TaskListApi.Models;

namespace TaskListApi.Controllers {
    public class TaskController : ApiController {

        [HttpGet]
        public IHttpActionResult GetTasks() {
            return Ok("Funcionou");
        }

        [HttpPost]
        public IHttpActionResult CreateTask([FromBody] Task task) {
            return Ok(task);
        }

        [HttpPut]
        public IHttpActionResult UpdateTask([FromBody] Task task) {
            return Ok(task);
        }

        [HttpPut]
        public IHttpActionResult UpdateTaskStatus(int id, bool status) {
            return Ok(status);
        }

        [HttpDelete]
        public IHttpActionResult DeleteTask(int id) {
            return Ok(id);
        }
    }
}