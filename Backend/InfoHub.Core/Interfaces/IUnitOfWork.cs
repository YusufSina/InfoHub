using InfoHub.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace InfoHub.Core.Interfaces
{
    public interface IUnitOfWork
    {
        IRepository<T> GetRepository<T>() where T : BaseEntity;
        int Complete();
    }
}
