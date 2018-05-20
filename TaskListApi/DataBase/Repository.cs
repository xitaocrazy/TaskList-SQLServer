﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace TaskListApi.DataBase {
    public class Repository<T> : IRepository<T> where T : class {
        internal DbContext Context;
        internal DbSet<T> DbSet;

        public Repository(DbContext context) {
            Context = context;
            DbSet = context.Set<T>();
        }

        public virtual IEnumerable<T> Get(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = "") {
            IQueryable<T> query = DbSet;

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
        }

        public virtual void Delete(object id) {
            var entityToDelete = DbSet.Find(id);
            Delete(entityToDelete);
        }

        public virtual void Delete(T entityToDelete) {
            if (Context.Entry(entityToDelete).State == EntityState.Detached) {
                DbSet.Attach(entityToDelete);
            }
            DbSet.Remove(entityToDelete);
        }

        public virtual void Update(T entityToUpdate) {
            DbSet.Attach(entityToUpdate);
            Context.Entry(entityToUpdate).State = EntityState.Modified;
        }
    }
}