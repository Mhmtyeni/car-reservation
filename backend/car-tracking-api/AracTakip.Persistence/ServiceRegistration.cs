using AracTakip.Persistence.Contexts;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using AracTakip.Application.Repositories.Car;
using AracTakip.Persistence.Repositories.Car;
using AracTakip.Application.Repositories.CarBrand;
using AracTakip.Persistence.Repositories.CarBrand;
using AracTakip.Application.Repositories.CarEngineType;
using AracTakip.Persistence.Repositories.CarEngineType;
using AracTakip.Application.Repositories.CarImageFile;
using AracTakip.Persistence.Repositories.CarImageFile;
using AracTakip.Application.Repositories.CarModel;
using AracTakip.Persistence.Repositories.CarModel;
using AracTakip.Persistence.Repositories.CarReservation;
using AracTakip.Application.Repositories.CarReservation;
using AracTakip.Application.Repositories.CarReservationApproval;
using AracTakip.Persistence.Repositories.CarReservationApproval;
using AracTakip.Application.Repositories.CarReservationProcess;
using AracTakip.Persistence.Repositories.CarReservationProcess;
using AracTakip.Application.Repositories.CarReservationUser;
using AracTakip.Persistence.Repositories.CarReservationUser;
using AracTakip.Application.Repositories.CarReservationUserImageFile;
using AracTakip.Persistence.Repositories.CarReservationUserImageFile;
using AracTakip.Application.Repositories.CarType;
using AracTakip.Persistence.Repositories.CarType;
using AracTakip.Application.Repositories.Company;
using AracTakip.Persistence.Repositories.Company;
using AracTakip.Application.Repositories.File;
using AracTakip.Persistence.Repositories.File;
using AracTakip.Application.Repositories.ReservationStatus;
using AracTakip.Persistence.Repositories.ReservationStatus;
using AracTakip.Application.Repositories.UserImageFile;
using AracTakip.Persistence.Repositories.UserImageFile;
using AracTakip.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using AracTakip.Persistence.Repositories;
using AracTakip.Application.Repositories;
using AracTakip.Application.Abstractions.Services.Authentications;
using AracTakip.Application.Abstractions.Services;
using AracTakip.Persistence.Services;
using ETicaretAPI.Persistence.Services;
using AracTakip.Persistence.Repositories.Location;
using AracTakip.Application.Repositories.Location;
using AracTakip.Application.Repositories.CarCaseType;
using AracTakip.Persistence.Repositories.CarCaseType;

namespace AracTakip.Persistence
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceServices(this IServiceCollection services)
        {
            services.AddDbContext<AracTakipAPIDBContext>(options => options.UseSqlServer(Configuration.ConnectionString));
            services.AddIdentity<AppUser, AppRole>(options =>
            {
                options.Password.RequiredLength = 3;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
            }).AddEntityFrameworkStores<AracTakipAPIDBContext>()
            .AddDefaultTokenProviders();

            #region <T>IReadRepository,<T>ReadRepository    
            services.AddScoped<ICarReadRepository, CarReadRepository>();
            services.AddScoped<ICarBrandReadRepository, CarBrandReadRepository>();
            services.AddScoped<ICarEngineTypeReadRepository, CarEngineTypeReadRepository>();
            services.AddScoped<ICarImageFileReadRepository, CarImageFileReadRepository>();
            services.AddScoped<ICarModelReadRepository, CarModelReadRepository>();
            services.AddScoped<ICarReservationReadRepository, CarReservationReadRepository>();
            services.AddScoped<ICarReservationApprovalReadRepository, CarReservationApprovalReadRepository>();
            services.AddScoped<ICarReservationProcessReadRepository, CarReservationProcessReadRepository>();
            services.AddScoped<ICarReservationUserReadRepository, CarReservationUserReadRepository>();
            services.AddScoped<ICarReservationUserImageFileReadRepository, CarReservationUserImageFileReadRepository>();
            services.AddScoped<ICarTypeReadRepository, CarTypeReadRepository>();
            services.AddScoped<ICarCaseTypeReadRepository, CarCaseTypeReadRepository>();
            services.AddScoped<ICompanyReadRepository, CompanyReadRepository>();
            services.AddScoped<IEndpointReadRepository, EndpointReadRepository>();
            services.AddScoped<IFileReadRepository, FileReadRepository>();
            services.AddScoped<ILocationReadRepository, LocationReadRepository>();
            services.AddScoped<IMenuReadRepository, MenuReadRepository>();
            services.AddScoped<IReservationStatusReadRepository, ReservationStatusReadRepository>();
            services.AddScoped<IUserImageFileReadRepository, UserImageFileReadRepository>();

            #endregion
            #region <T>IWriteRepository,<T>WriteRepository    
            services.AddScoped<ICarWriteRepository, CarWriteRepository>();
            services.AddScoped<ICarBrandWriteRepository, CarBrandWriteRepository>();
            services.AddScoped<ICarEngineTypeWriteRepository, CarEngineTypeWriteRepository>();
            services.AddScoped<ICarImageFileWriteRepository, CarImageFileWriteRepository>();
            services.AddScoped<ICarModelWriteRepository, CarModelWriteRepository>();
            services.AddScoped<ICarReservationWriteRepository, CarReservationWriteRepository>();
            services.AddScoped<ICarReservationApprovalWriteRepository, CarReservationApprovalWriteRepository>();
            services.AddScoped<ICarReservationProcessWriteRepository, CarReservationProcessWriteRepository>();
            services.AddScoped<ICarReservationUserWriteRepository, CarReservationUserWriteRepository>();
            services.AddScoped<ICarReservationUserImageFileWriteRepository, CarReservationUserImageFileWriteRepository>();
            services.AddScoped<ICarTypeWriteRepository, CarTypeWriteRepository>();
            services.AddScoped<ICarCaseTypeWriteRepository, CarCaseTypeWriteRepository>();
            services.AddScoped<ICompanyWriteRepository, CompanyWriteRepository>();
            services.AddScoped<IEndpointWriteRepository, EndpointWriteRepository>();
            services.AddScoped<IFileWriteRepository, FileWriteRepository>();
            services.AddScoped<ILocationWriteRepository, LocationWriteRepository>();
            services.AddScoped<IMenuWriteRepository, MenuWriteRepository>();
            services.AddScoped<IReservationStatusWriteRepository, ReservationStatusWriteRepository>();
            services.AddScoped<IUserImageFileWriteRepository, UserImageFileWriteRepository>();
            #endregion

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IInternalAuthentication, AuthService>();
            services.AddScoped<IRoleService, RoleService>();
            services.AddScoped<IAuthorizationEndpointService, AuthorizationEndpointService>();
        }
    }
}
