using AracTakip.Domain.Entities;
using AracTakip.Domain.Entities.Common;
using AracTakip.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AracTakip.Persistence.Contexts
{
    public class AracTakipAPIDBContext : IdentityDbContext<AppUser, AppRole, string>
    {
        public AracTakipAPIDBContext(DbContextOptions options) : base(options)
        { }
        public DbSet<Car> Cars { get; set; }
        public DbSet<CarBrand> CarBrands { get; set; }
        public DbSet<CarEngineType> CarEngineTypes { get; set; }
        public DbSet<CarImageFile> CarImageFiles { get; set; }
        public DbSet<CarModel> CarModels { get; set; }
        public DbSet<CarReservation> CarReservations { get; set; }
        public DbSet<CarReservationApproval> CarReservationApprovals { get; set; }
        public DbSet<CarReservationProcess> CarReservationProcesses { get; set; }
        public DbSet<CarReservationUser> CarReservationUsers { get; set; }
        public DbSet<CarReservationUserImageFile> CarReservationUserImageFiles { get; set; }
        public DbSet<CarType> CarTypes { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Endpoint> Endpoints { get; set; }
        public DbSet<Domain.Entities.File> Files { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<ReservationStatus> ReservationStatuses { get; set; }
        public DbSet<UserImageFile> UserImageFiles { get; set; }
      
        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            //ChangeTracker : Entityler üzerinden yapılan değişiklerin ya da yeni eklenen verinin yakalanmasını sağlayan propertydir. Update operasyonlarında Track edilen verileri yakalayıp elde etmemizi sağlar.

            var datas = ChangeTracker
                 .Entries<BaseEntity>();

            foreach (var data in datas)
            {
                _ = data.State switch
                {
                    EntityState.Added => data.Entity.CreatedDate = DateTime.UtcNow,
                    EntityState.Modified => data.Entity.ModifiedDate = DateTime.UtcNow,
                    _ => DateTime.UtcNow
                };
            }

            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}
