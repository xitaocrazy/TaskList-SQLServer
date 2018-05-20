using System;
using System.Data.Entity;
using TaskListApi.Models;

namespace TaskListApi.DataBase {
    public class UnitOfWork : IUnitOfWork, IDisposable {
        private readonly DbContext _context;
        private Repository<TaskListIten> _itensRepository;
        private bool _disposed;

        public UnitOfWork(DbContext context) {
            _context = context;
        }

        public Repository<TaskListIten> TaskListItenRepository => _itensRepository ?? (_itensRepository = new Repository<TaskListIten>(_context));

        public void Save() {
            _context.SaveChanges();
        }

        public virtual void Dispose(bool disposing) {
            if (!_disposed) {
                if (disposing) {
                    _context.Dispose();
                }
            }
            _disposed = true;
        }

        public void Dispose() {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}