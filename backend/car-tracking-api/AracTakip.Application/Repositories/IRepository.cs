using AracTakip.Domain.Entities.Common;
using Microsoft.EntityFrameworkCore;

namespace AracTakip.Application.Repositories
{
    public interface IRepository<T> where T : BaseEntity
    {
        DbSet<T> Table { get; }
    }
}
