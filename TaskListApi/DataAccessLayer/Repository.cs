using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace TaskListApi.DataAccessLayer {
    public class Repository<T> : IRepository<T> where T : class {
        internal DbContext Context;
        internal DbSet<T> DbSet;
        private bool _disposed;

        public Repository(DbContext context) {
            Context = context;
            DbSet = context.Set<T>();
        }

        public virtual IEnumerable<T> Get(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = "") {IQueryable<T> query = DbSet;
            if (filter != null) {
                query = query.Where(filter);
            }
            query = includeProperties.Split(new[] {','}, StringSplitOptions.RemoveEmptyEntries).Aggregate(query, (current, includeProperty) => current.Include(includeProperty));
            return orderBy?.Invoke(query).ToList() ?? query.ToList();
        }

        public virtual T GetById(object id) {
            return DbSet.Find(id);
        }

        public virtual void Insert(T entity) {
            DbSet.Add(entity);
            Save();
        }

        public virtual void Delete(object id) {
            var entityToDelete = DbSet.Find(id);
            Delete(entityToDelete);
            Save();
        }

        public virtual void Delete(T entityToDelete) {
            if (Context.Entry(entityToDelete).State == EntityState.Detached) {
                DbSet.Attach(entityToDelete);
            }
            DbSet.Remove(entityToDelete);
            Save();
        }

        public virtual void Update(T entityToUpdate) {
            DbSet.Attach(entityToUpdate);
            Context.Entry(entityToUpdate).State = EntityState.Modified;
            Save();
        }
        
        public void Dispose() {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing) {
            if (!_disposed) {
                if (disposing) {
                    Context.Dispose();
                }
            }
            _disposed = true;
        }

        private void Save() {
            Context.SaveChanges();
        }
    }
}