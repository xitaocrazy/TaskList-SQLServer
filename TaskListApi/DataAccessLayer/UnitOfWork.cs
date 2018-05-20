using System;
using System.Data.Entity;
using TaskListApi.Models;

namespace TaskListApi.DataAccessLayer {
    public class UnitOfWork : IUnitOfWork, IDisposable {
        private readonly DbContext _context;
        private Repository<TaskListItem> _itensRepository;
        private bool _disposed;

        public UnitOfWork(DbContext context) {
            _context = context;
        }

        public Repository<TaskListItem> TaskListItenRepository => _itensRepository ?? (_itensRepository = new Repository<TaskListItem>(_context));

        public void Save() {
            _context.SaveChanges();
        }
        
        public void Dispose() {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing) {
            if (!_disposed) {
                if (disposing) {
                    _context.Dispose();
                }
            }
            _disposed = true;
        }
    }
}