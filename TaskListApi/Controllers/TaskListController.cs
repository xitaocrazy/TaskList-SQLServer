using System;
using System.Web.Http;
using System.Web.Http.Cors;
using TaskListApi.Models;
using TaskListApi.Services;

namespace TaskListApi.Controllers {
    public class TaskListController : ApiController {
        private readonly ITaskListService _taskListService;
        private const string AllTasks = "api/TaskList/GetAllTasks";
        private const string OnGoingTasks = "api/TaskList/GetOnGoingTasks";
        private const string DoneTasks = "api/TaskList/GetDoneTasks";
        private const string ExcludedTasks = "api/TaskList/GetExcludedTasks";

        public TaskListController(ITaskListService taskListService) {
            _taskListService = taskListService;
        }

        [HttpGet]
        [Route(AllTasks)]
        [EnableCors("*", "*", "*")]
        public IHttpActionResult GetAllTasks() {
            try {
                var result = _taskListService.GetTasks();
                return Ok(result);
            }
            catch (Exception ex) {
                return InternalServerError(ex);
            }            
        }

        [HttpGet]
        [Route(OnGoingTasks)]
        [EnableCors("*", "*", "*")]
        public IHttpActionResult GetOnGoingTasks() {
            try {
                var result = _taskListService.GetTasks(t => t.Status && t.Exclusion == null);
                return Ok(result);
            }
            catch (Exception ex) {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route(DoneTasks)]
        [EnableCors("*", "*", "*")]
        public IHttpActionResult GetDoneTasks() {
            try {
                var result = _taskListService.GetTasks(t => t.Status == false && t.Exclusion == null);
                return Ok(result);
            }
            catch (Exception ex) {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        [Route(ExcludedTasks)]
        [EnableCors("*", "*", "*")]
        public IHttpActionResult GetExcludedTasks() {
            try {
                var result = _taskListService.GetTasks(t => t.Exclusion != null);
                return Ok(result);
            }
            catch (Exception ex) {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        [EnableCors("*", "*", "*")]
        public IHttpActionResult CreateTask([FromBody] Task task) {
            try {
                _taskListService.CreateTask(task);
                return Ok("The task was created.");
            }
            catch (Exception ex) {
                return InternalServerError(ex);
            }            
        }

        [HttpPut]
        [EnableCors("*", "*", "*")]
        public IHttpActionResult UpdateTask([FromBody] Task task) {
            try {
                _taskListService.UpdateTask(task);
                return Ok("The task was updated.");
            }
            catch (Exception ex) {
                return InternalServerError(ex);
            }
        }

        [HttpPut]
        [EnableCors("*", "*", "*")]
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
        [EnableCors("*", "*", "*")]
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