using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using FizzWare.NBuilder;
using Moq;
using NUnit.Framework;
using TaskListApi.DataAccessLayer;
using TaskListApi.Services;
using TaskListApi.Models;
using TaskListApi.Tests.Helpers;

namespace TaskListApi.Tests.Services {
    [TestFixture]
    public class TaskListServiceTests {
        private Mock<DbContext> _mockDbContext;
        private Mock<Repository<Task>> _mockRepository;
        private Mock<UnitOfWork> _mockUnityOfWork;
        private TaskListService _taskListService;
        private IList<Task> _tasks;
        private Task _task;
        private DateTime _data;

        [SetUp]
        public void SetupTest() {
            CreateMocks();
            SetupObjects();
            SetupMocks();
        }

        [Test]
        public void GetTasks_should_return_the_expected_task_list() {
            var expected = _tasks;
            var actual = _taskListService.GetTasks();
            CollectionAssert.AreEqual(expected, actual);
        }

        [Test]
        public void GetTasks_should_call_unitOfWork_taskListItenRepository() {
            _taskListService.GetTasks();
            _mockUnityOfWork.Verify(u => u.TaskListItenRepository, Times.Once);
        }

        [Test]
        public void GetTasks_should_call_unitOfWork_taskListItenRepository_get() {
            _taskListService.GetTasks();
            _mockRepository.Verify(
                r => r.Get(It.IsAny<Expression<Func<Task, bool>>>(),
                    It.IsAny<Func<IQueryable<Task>, IOrderedQueryable<Task>>>(), It.IsAny<string>()), Times.Once);
        }

        [Test]
        public void CreateTask_should_call_unitOfWork_taskListItenRepository() {
            _taskListService.CreateTask(_task);
            _mockUnityOfWork.Verify(u => u.TaskListItenRepository, Times.Once);
        }

        [Test]
        public void CreateTask_should_set_creation_date() {
            _taskListService.UpdateTask(_task);
            Assert.AreNotEqual(new DateTime(), _task.Creation);
        }

        [Test]
        public void UpdateTask_should_call_unitOfWork_taskListItenRepository_insert() {
            _taskListService.CreateTask(_task);
            _mockRepository.Verify(r => r.Insert(It.IsAny<Task>()), Times.Once);
        }

        [Test]
        public void UpdateTask_should_call_unitOfWork_taskListItenRepository() {
            _taskListService.UpdateTask(_task);
            _mockUnityOfWork.Verify(u => u.TaskListItenRepository, Times.Once);
        }

        [Test]
        public void CreateTask_should_call_unitOfWork_taskListItenRepository_update() {
            _taskListService.UpdateTask(_task);
            _mockRepository.Verify(r => r.Update(It.IsAny<Task>()), Times.Once);
        }

        [Test]
        public void UpdateTask_should_set_last_update_date() {
            _taskListService.UpdateTask(_task);
            Assert.IsNotNull(_task.LasUpdate);
        }

        [Test]
        public void UpdateTaskStatus_should_call_unitOfWork_taskListItenRepository() {
            _taskListService.UpdateTaskStatus(1, true);
            _mockUnityOfWork.Verify(u => u.TaskListItenRepository, Times.Exactly(2));
        }

        [Test]
        public void UpdateTaskStatus_should_call_unitOfWork_taskListItenRepository_getById() {
            _taskListService.UpdateTaskStatus(1, true);
            _mockRepository.Verify(r => r.GetById(It.IsAny<int>()), Times.Once);
        }

        [Test]
        public void UpdateTaskStatus_should_call_unitOfWork_taskListItenRepository_update() {
            _taskListService.UpdateTaskStatus(1, true);
            _mockRepository.Verify(r => r.Update(It.IsAny<Task>()), Times.Once);
        }

        [Test]
        public void UpdateTaskStatus_should_set_the_expected_values_when_status_true() {
            _taskListService.UpdateTaskStatus(1, true);
            Assert.IsNotNull(_task.LasUpdate);
            Assert.IsNull(_task.Conclusion);
            Assert.IsTrue(_task.Status);
        }

        [Test]
        public void UpdateTaskStatus_should_set_the_expected_values_when_status_false() {
            _taskListService.UpdateTaskStatus(1, false);
            Assert.IsNotNull(_task.LasUpdate);
            Assert.IsNotNull(_task.Conclusion);
            Assert.IsFalse(_task.Status);
        }

        [Test]
        public void DeleteTask_should_call_unitOfWork_taskListItenRepository() {
            _taskListService.DeleteTask(1);
            _mockUnityOfWork.Verify(u => u.TaskListItenRepository, Times.Exactly(2));
        }

        [Test]
        public void DeleteTask_should_call_unitOfWork_taskListItenRepository_getById() {
            _taskListService.DeleteTask(1);
            _mockRepository.Verify(r => r.GetById(It.IsAny<int>()), Times.Once);
        }

        [Test]
        public void DeleteTask_should_call_unitOfWork_taskListItenRepository_update() {
            _taskListService.DeleteTask(1);
            _mockRepository.Verify(r => r.Update(It.IsAny<Task>()), Times.Once);
        }

        [Test]
        public void DeleteTask_should_set_the_expected_values_when_status_true() {
            _taskListService.DeleteTask(1);
            Assert.IsNotNull(_task.LasUpdate);
            Assert.IsNotNull(_task.Exclusion);
        }

        private void CreateMocks() {
            var mockBehavior = MockBehavior.Strict;
            _mockDbContext = new Mock<DbContext>(mockBehavior);
            _mockRepository = new Mock<Repository<Task>>(mockBehavior, _mockDbContext.Object);
            _mockUnityOfWork = new Mock<UnitOfWork>(mockBehavior, _mockDbContext.Object);
            _taskListService = new TaskListService(_mockUnityOfWork.Object);
        }

        private void SetupMocks() {
            _mockUnityOfWork.Setup(u => u.TaskListItenRepository).Returns(_mockRepository.Object);
            _mockRepository.Setup(r => r.Get(It.IsAny<Expression<Func<Task, bool>>>(),
                It.IsAny<Func<IQueryable<Task>, IOrderedQueryable<Task>>>(), It.IsAny<string>())).Returns(_tasks);
            _mockRepository.Setup(r => r.Insert(It.IsAny<Task>()));
            _mockRepository.Setup(r => r.Update(It.IsAny<Task>()));
            _mockRepository.Setup(r => r.GetById(It.IsAny<int>())).Returns(_task);
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
                .CreateListOfSize(5)
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
        }
    }
}