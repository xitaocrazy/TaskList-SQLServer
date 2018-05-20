using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web.Http;
using System.Web.Http.Results;
using FizzWare.NBuilder;
using Moq;
using NUnit.Framework;
using TaskListApi.Controllers;
using TaskListApi.Services;
using TaskListApi.Tests.Helpers;
using TaskListApi.Models;

namespace TaskListApi.Tests.Controllers {
    [TestFixture]
    public class TaskListControllerTests {
        private Mock<ITaskListService> _mockTaskListService;
        private IList<Task> _tasks;
        private Task _task;
        private DateTime _data;
        private TaskListController _taskListController;
        private const string ErrorMessage = "Expected Error Message";

        [SetUp]
        public void SetupTest() {
            CreateMocks();
            SetupObjects();
            SetupMocksToSuccess();
        }

        [Test]
        public void GetAllTasks_should_return_all_tasks() {
            var expected = _tasks;
            var actual = _taskListController.GetAllTasks() as OkNegotiatedContentResult<IEnumerable<Task>>;
            CollectionAssert.AreEqual(expected, actual.Content);
        }

        [Test]
        public void GetAllTasks_should_call_taskListService_getTasks() {
            _taskListController.GetAllTasks();
            _mockTaskListService.Verify(r => r.GetTasks(null, It.IsAny<Func<IQueryable<Task>, IOrderedQueryable<Task>>>(), It.IsAny<string>()), Times.Once);
        }

        [Test]
        public void GetAllTasks_should_return_the_expected_error_message(){
            SetupMocksToError();
            const string expected = ErrorMessage;
            var actual = _taskListController.GetAllTasks() as ExceptionResult;
            CollectionAssert.AreEqual(expected, actual.Exception.Message);
        }

        [Test]
        public void GetOnGoingTasks_should_return_only_ongoing_tests() {
            var expected = _tasks.Where(t => t.Status && t.Exclusion == null);
            var actual = _taskListController.GetOnGoingTasks() as OkNegotiatedContentResult<IEnumerable<Task>>;
            CollectionAssert.AreEqual(expected, actual.Content);
        }

        [Test]
        public void GetOnGoingTasks_should_call_taskListService_getTasks() {
            _taskListController.GetOnGoingTasks();
            _mockTaskListService.Verify(r => r.GetTasks(t => t.Status && t.Exclusion == null, It.IsAny<Func<IQueryable<Task>, IOrderedQueryable<Task>>>(), It.IsAny<string>()), Times.Once);
        }

        [Test]
        public void GetOnGoingTasks_should_return_the_expected_error_message() {
            SetupMocksToError();
            const string expected = ErrorMessage;
            var actual = _taskListController.GetOnGoingTasks() as ExceptionResult;
            CollectionAssert.AreEqual(expected, actual.Exception.Message);
        }

        [Test]
        public void GetDoneTasks_should_return_only_done_tasks() {
            var expected = _tasks.Where(t => t.Status == false && t.Exclusion == null);
            var actual = _taskListController.GetDoneTasks() as OkNegotiatedContentResult<IEnumerable<Task>>;
            CollectionAssert.AreEqual(expected, actual.Content);
        }

        [Test]
        public void GetDoneTasks_should_call_taskListService_getTasks() {
            _taskListController.GetDoneTasks();
            _mockTaskListService.Verify(r => r.GetTasks(t => t.Status == false && t.Exclusion == null, It.IsAny<Func<IQueryable<Task>, IOrderedQueryable<Task>>>(), It.IsAny<string>()), Times.Once);
        }

        [Test]
        public void GetDoneTasks_should_return_the_expected_error_message() {
            SetupMocksToError();
            const string expected = ErrorMessage;
            var actual = _taskListController.GetDoneTasks() as ExceptionResult;
            CollectionAssert.AreEqual(expected, actual.Exception.Message);
        }

        [Test]
        public void GetExcludedTasks_should_return_only_exclued_tasks() {
            var expected = _tasks.Where(t => t.Exclusion != null);
            var actual = _taskListController.GetExcludedTasks() as OkNegotiatedContentResult<IEnumerable<Task>>;
            CollectionAssert.AreEqual(expected, actual.Content);
        }

        [Test]
        public void GetExcludedTasks_should_call_taskListService_getTasks() {
            _taskListController.GetExcludedTasks();
            _mockTaskListService.Verify(r => r.GetTasks(t => t.Exclusion != null, It.IsAny<Func<IQueryable<Task>, IOrderedQueryable<Task>>>(), It.IsAny<string>()), Times.Once);
        }

        [Test]
        public void GetExcludedTasks_should_return_the_expected_error_message() {
            SetupMocksToError();
            const string expected = ErrorMessage;
            var actual = _taskListController.GetExcludedTasks() as ExceptionResult;
            CollectionAssert.AreEqual(expected, actual.Exception.Message);
        }

        [Test]
        public void CreateTask_should_return_the_success_message() {
            const string expected = "The task was created.";
            var actual = _taskListController.CreateTask(_task) as OkNegotiatedContentResult<string>;
            CollectionAssert.AreEqual(expected, actual.Content);
        }

        [Test]
        public void CreateTask_should_call_taskListService_createTask() {
            _taskListController.CreateTask(_task);
            _mockTaskListService.Verify(r => r.CreateTask(It.IsAny<Task>()), Times.Once);
        }

        [Test]
        public void CreateTask_should_return_the_expected_error_message() {
            SetupMocksToError();
            const string expected = ErrorMessage;
            var actual = _taskListController.CreateTask(_task) as ExceptionResult;
            CollectionAssert.AreEqual(expected, actual.Exception.Message);
        }

        [Test]
        public void UpdateTask_should_return_the_success_message() {
            const string expected = "The task was updated.";
            var actual = _taskListController.UpdateTask(_task) as OkNegotiatedContentResult<string>;
            CollectionAssert.AreEqual(expected, actual.Content);
        }

        [Test]
        public void UpdateTask_should_call_taskListService_createTask() {
            _taskListController.UpdateTask(_task);
            _mockTaskListService.Verify(r => r.UpdateTask(It.IsAny<Task>()), Times.Once);
        }

        [Test]
        public void UpdateTask_should_return_the_expected_error_message() {
            SetupMocksToError();
            const string expected = ErrorMessage;
            var actual = _taskListController.UpdateTask(_task) as ExceptionResult;
            CollectionAssert.AreEqual(expected, actual.Exception.Message);
        }

        [Test]
        public void UpdateTaskStatus_should_return_the_success_message() {
            const string expected = "The task was updated.";
            var actual = _taskListController.UpdateTaskStatus(1, true) as OkNegotiatedContentResult<string>;
            CollectionAssert.AreEqual(expected, actual.Content);
        }

        [Test]
        public void UpdateTaskStatus_should_call_taskListService_createTask() {
            _taskListController.UpdateTaskStatus(1, true);
            _mockTaskListService.Verify(r => r.UpdateTaskStatus(It.IsAny<int>(), It.IsAny<bool>()), Times.Once);
        }

        [Test]
        public void UpdateTaskStatus_should_return_the_expected_error_message() {
            SetupMocksToError();
            const string expected = ErrorMessage;
            var actual = _taskListController.UpdateTaskStatus(1, true) as ExceptionResult;
            CollectionAssert.AreEqual(expected, actual.Exception.Message);
        }

        [Test]
        public void DeleteTask_should_return_the_success_message() {
            const string expected = "The task was removed.";
            var actual = _taskListController.DeleteTask(1) as OkNegotiatedContentResult<string>;
            CollectionAssert.AreEqual(expected, actual.Content);
        }

        [Test]
        public void DeleteTask_should_call_taskListService_createTask() {
            _taskListController.DeleteTask(1);
            _mockTaskListService.Verify(r => r.DeleteTask(It.IsAny<int>()), Times.Once);
        }

        [Test]
        public void DeleteTask_should_return_the_expected_error_message() {
            SetupMocksToError();
            const string expected = ErrorMessage;
            var actual = _taskListController.DeleteTask(1) as ExceptionResult;
            CollectionAssert.AreEqual(expected, actual.Exception.Message);
        }

        private void CreateMocks() {
            _mockTaskListService = new Mock<ITaskListService>(MockBehavior.Strict);
            _taskListController = new TaskListController(_mockTaskListService.Object);
        }

        private void SetupMocksToSuccess() {
            _mockTaskListService.Setup(r => r.GetTasks(null, It.IsAny<Func<IQueryable<Task>, IOrderedQueryable<Task>>>(), It.IsAny<string>())).Returns(_tasks);
            _mockTaskListService.Setup(r => r.GetTasks(t => t.Status && t.Exclusion == null, It.IsAny<Func<IQueryable<Task>, IOrderedQueryable<Task>>>(), It.IsAny<string>()))
                                .Returns(_tasks.Where(t => t.Status && t.Exclusion == null));
            _mockTaskListService.Setup(r => r.GetTasks(t => t.Status == false && t.Exclusion == null, It.IsAny<Func<IQueryable<Task>, IOrderedQueryable<Task>>>(), It.IsAny<string>()))
                                .Returns(_tasks.Where(t => t.Status == false && t.Exclusion == null));
            _mockTaskListService.Setup(r => r.GetTasks(t => t.Exclusion != null, It.IsAny<Func<IQueryable<Task>, IOrderedQueryable<Task>>>(), It.IsAny<string>()))
                                .Returns(_tasks.Where(t => t.Exclusion != null));
            _mockTaskListService.Setup(r => r.CreateTask(It.IsAny<Task>()));
            _mockTaskListService.Setup(r => r.UpdateTask(It.IsAny<Task>()));
            _mockTaskListService.Setup(r => r.UpdateTaskStatus(It.IsAny<int>(), It.IsAny<bool>()));
            _mockTaskListService.Setup(r => r.DeleteTask(It.IsAny<int>()));
        }

        private void SetupObjects() {
            _data = DateTime.Now;
            _task = Builder<Task>.CreateNew()
                .With(t => t.Id = 1)
                .With(t => t.Title = "Task 1")
                .With(t => t.Status = true)
                .With(t => t.Description = "Task 1")
                .With(t => t.Creation = _data)
                .With(t => t.LasUpdate = null)
                .With(t => t.Exclusion = null)
                .With(t => t.Conclusion = null)
                .Build();
            var intSequence = TestHelper.IntSequentialGenerator;
            intSequence.StartingWith(0);
            _tasks = Builder<Task>
                .CreateListOfSize(3)
                .All()
                .With(t => t.Id = intSequence.Generate())
                .With(t => t.Title = $"Task {t.Id}")
                .With(t => t.Status = true)
                .With(t => t.Description = $"Task {t.Id}")
                .With(t => t.Creation = _data)
                .With(t => t.LasUpdate = null)
                .With(t => t.Exclusion = null)
                .With(t => t.Conclusion = null)
                .With(t => t.Conclusion = null)
                .Build();
            _tasks[1].Status = false;
            _tasks[2].Exclusion = _data;
        }

        private void SetupMocksToError() {
            _mockTaskListService.Setup(r => r.GetTasks(It.IsAny<Expression<Func<Task, bool>>>(), It.IsAny<Func<IQueryable<Task>, IOrderedQueryable<Task>>>(), It.IsAny<string>())).Throws(new Exception(ErrorMessage));
            _mockTaskListService.Setup(r => r.CreateTask(It.IsAny<Task>())).Throws(new Exception(ErrorMessage));
            _mockTaskListService.Setup(r => r.UpdateTask(It.IsAny<Task>())).Throws(new Exception(ErrorMessage));
            _mockTaskListService.Setup(r => r.UpdateTaskStatus(It.IsAny<int>(), It.IsAny<bool>())).Throws(new Exception(ErrorMessage));
            _mockTaskListService.Setup(r => r.DeleteTask(It.IsAny<int>())).Throws(new Exception(ErrorMessage));
        }
    }
}