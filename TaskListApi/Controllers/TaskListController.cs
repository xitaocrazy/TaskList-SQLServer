using System;
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
            try {
                var result = _taskListService.GetTasks();
                return Ok(result);
            }
            catch (Exception ex) {
                return InternalServerError(ex);
            }            
        }

        [HttpPost]
        public IHttpActionResult CreateTask([FromBody] TaskListItem task) {
            try {
                _taskListService.CreateTask(task);
                return Ok("The task was created.");
            }
            catch (Exception ex) {
                return InternalServerError(ex);
            }            
        }

        [HttpPut]
        public IHttpActionResult UpdateTask([FromBody] TaskListItem task) {
            try {
                _taskListService.UpdateTask(task);
                return Ok("The task was updated.");
            }
            catch (Exception ex) {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        public IHttpActionResult UpdateTaskStatus(int id, bool status) {
            try {
                _taskListService.UpdateTaskStatus(id, status);
                return Ok("The task was updated.");
            }
            catch (Exception ex) {
                return InternalServerError(ex);
            }
        }

        [HttpDelete]
        public IHttpActionResult DeleteTask(int id) {
            try {
                _taskListService.DeleteTask(id);
                return Ok("The task was removed.");
            }
            catch (Exception ex) {
                return InternalServerError(ex);
            }
        }

        protected override void Dispose(bool disposing) {
            _taskListService.Dispose();
            base.Dispose(disposing);
        }
    }
}