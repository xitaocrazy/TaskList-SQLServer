using System;
using FizzWare.NBuilder;
using NUnit.Framework;
using TaskListApi.Models;

namespace TaskListApi.Tests.Models {
    [TestFixture]
    public class TaskTests {
        private Task _task1;
        private Task _task2;
        private Task _task3;
        private DateTime _data;

        [SetUp]
        public void SetUp() {
            _data = DateTime.Now;
            _task1 = Builder<Task>.CreateNew()
                .With(t => t.Id = 1)
                .With(t => t.Title = "Task 1")
                .With(t => t.Status = true)
                .With(t => t.Description = "Task 1")
                .With(t => t.Creation = _data)
                .With(t => t.LasUpdate = null)
                .With(t => t.Exclusion = null)
                .With(t => t.Conclusion = null)
                .Build();
            _task2 = Builder<Task>.CreateNew()
                .With(t => t.Id = 2)
                .With(t => t.Title = "Task 2")
                .With(t => t.Status = true)
                .With(t => t.Description = "Task 2")
                .With(t => t.Creation = _data)
                .With(t => t.LasUpdate = null)
                .With(t => t.Exclusion = null)
                .With(t => t.Conclusion = null)
                .Build();
            _task3 = Builder<Task>.CreateNew()
                .With(t => t.Id = 1)
                .With(t => t.Title = "Task 1")
                .With(t => t.Status = true)
                .With(t => t.Description = "Task 1")
                .With(t => t.Creation = _data)
                .With(t => t.LasUpdate = null)
                .With(t => t.Exclusion = null)
                .With(t => t.Conclusion = null)
                .Build();
        }

        [Test]
        public void ToString_should_return_the_expected_value() {
            var expected =
                $"Title: Task 1 - Description: Task 1 - Status: On going - Creation: {_data} - LasUpdate:  - Exclusion:  - Conclusion: ";
            var actual = _task1.ToString();
            Assert.AreEqual(expected, actual);
        }

        [Test]
        public void GetHashCode_should_return_the_expected_value() {
            var expected = GetHashCode(_task1);
            var actual = _task1.GetHashCode();
            Assert.AreEqual(expected, actual);
        }

        [Test]
        public void ObjectEquals_should_indicate_that_are_equals() {
            var areEquals = Equals(_task1, _task3);
            Assert.IsTrue(areEquals);
        }

        [Test]
        public void ObjectEquals_should_indicate_that_are_differents() {
            var areEquals = Equals(_task1, _task2);
            Assert.IsFalse(areEquals);
        }

        [Test]
        public void Equals_should_indicate_that_are_equals() {
            var areEquals = _task1.Equals(_task3);
            Assert.IsTrue(areEquals);
        }

        [Test]
        public void Equals_should_indicate_that_are_differents() {
            var areEquals = _task1.Equals(_task2);
            Assert.IsFalse(areEquals);
        }

        [Test]
        public void Equality_operator_should_indicate_that_are_equals() {
            var areEquals = _task1 == _task3;
            Assert.IsTrue(areEquals);
        }

        [Test]
        public void Equality_operator_should_indicate_that_are_differents() {
            var areEquals = _task1 == _task2;
            Assert.IsFalse(areEquals);
        }

        [Test]
        public void Difference_operator_should_indicate_that_are_differents() {
            var areDifferents = _task1 != _task2;
            Assert.IsTrue(areDifferents);
        }

        [Test]
        public void Difference_operator_should_indicate_that_are_not_differents() {
            var areDifferents = _task1 != _task3;
            Assert.IsFalse(areDifferents);
        }

        private static int GetHashCode(Task task) {
            unchecked {
                var hashCode = task.Id.GetHashCode();
                hashCode = (hashCode * 397) ^ task.Title?.GetHashCode() ?? 0;
                hashCode = (hashCode * 397) ^ task.Status.GetHashCode();
                hashCode = (hashCode * 397) ^ task.Description?.GetHashCode() ?? 0;
                hashCode = (hashCode * 397) ^ task.Creation.GetHashCode();
                hashCode = (hashCode * 397) ^ task.LasUpdate?.GetHashCode() ?? 0;
                hashCode = (hashCode * 397) ^ task.Exclusion?.GetHashCode() ?? 0;
                hashCode = (hashCode * 397) ^ task.Conclusion?.GetHashCode() ?? 0;
                return hashCode;
            }
        }
    }
}