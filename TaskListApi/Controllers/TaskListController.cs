using System.Web.Http;
using TaskListApi.Models;
using TaskListApi.Services;

namespace TaskListApi.Controllers {
    public class TaskListController : ApiController {
        private readonly ITaskListService _taskListService;

        public TaskListController(ITaskListService taskListService) {
            _taskListService = taskListService;
        }

        [HttpGet]
        public IHttpActionResult GetTasks() {
            var result = _taskListService.GetTasks();
            return Ok(result);
        }

        [HttpPost]
        public IHttpActionResult CreateTask([FromBody] TaskListIten task) {
            var result = _taskListService.CreateTask(task);
            return Ok(result);
        }

        [HttpPut]
        public IHttpActionResult UpdateTask([FromBody] TaskListIten task) {
            var result = _taskListService.UpdateTask(task);
            return Ok(result);
        }

        [HttpPut]
        public IHttpActionResult UpdateTaskStatus(int id, bool status) {
            var result = _taskListService.UpdateTaskStatus(id, status);
            return Ok(result);
        }

        [HttpDelete]
        public IHttpActionResult DeleteTask(int id) {
            var result = _taskListService.DeleteTask(id);
            return Ok(result);
        }
    }
}