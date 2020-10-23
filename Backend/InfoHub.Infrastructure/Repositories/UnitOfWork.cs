using InfoHub.Core.Interfaces;
using InfoHub.Core.Models;
using InfoHub.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace InfoHub.Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly InfoHubContext _dbContext;

        public UnitOfWork(InfoHubContext dbContext)
        {
            _dbContext = dbContext;
        }

        public int Complete()
        {
            try
            {
                return _dbContext.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public void Dispose()
        {
            _dbContext.Dispose();
        }

        public IRepository<T> GetRepository<T>() where T : BaseEntity
        {
            return new Repository<T>(_dbContext);
        }
    }
}
