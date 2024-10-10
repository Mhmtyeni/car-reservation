using AracTakip.Application.Abstractions.Services;
using AracTakip.Application.DTOs.User;
using AracTakip.Application.Exceptions;
using AracTakip.Application.Helpers;
using AracTakip.Application.Repositories;
using AracTakip.Application.Repositories.File;
using AracTakip.Application.Repositories.UserImageFile;
using AracTakip.Domain.Entities;
using AracTakip.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Drawing;

namespace ETicaretAPI.Persistence.Services
{
    public class UserService : IUserService
    {
        readonly UserManager<AppUser> _userManager;
        readonly IEndpointReadRepository _endpointReadRepository;
        readonly IUserImageFileReadRepository _userImageFileReadRepository;
        readonly IFileReadRepository _fileReadRepository;

        public UserService(UserManager<AppUser> userManager,
            IEndpointReadRepository endpointReadRepository,
            IUserImageFileReadRepository userImageFileReadRepository,
            IFileReadRepository fileReadRepository)
        {
            _userManager = userManager;
            _endpointReadRepository = endpointReadRepository;
            _userImageFileReadRepository = userImageFileReadRepository;
            _fileReadRepository = fileReadRepository;
        }

        public async Task<CreateUserResponse> CreateAsync(CreateUser model)
        {
            IdentityResult result = await _userManager.CreateAsync(new()
            {
                Id = Guid.NewGuid().ToString(),
                UserName = model.Username,
                Email = model.Email,
                Name = model.Name,
                Surname = model.Surname,
                Sicil = model.Sicil,
            }, model.Password);

            CreateUserResponse response = new() { Succeeded = result.Succeeded };

            if (result.Succeeded)
                response.Message = "Kullanıcı başarıyla oluşturulmuştur.";
            else
                foreach (var error in result.Errors)
                    response.Message += $"{error.Code} - {error.Description}\n";

            return response;
        }
        public async Task UpdateRefreshTokenAsync(string refreshToken, AppUser user, DateTime accessTokenDate, int addOnAccessTokenDate)
        {
            if (user != null)
            {
                user.RefreshToken = refreshToken;
                user.RefreshTokenEndDate = accessTokenDate.AddSeconds(addOnAccessTokenDate);
                await _userManager.UpdateAsync(user);
            }
            else
                throw new NotFoundUserException();
        }

        public async Task<List<ListUser>> GetAllUsersAsync(int page, int size)
        {
            var users = await _userManager.Users
                  .Skip(page * size)
                  .Take(size)
                  .Include(x => x.UserImageFiles)
                  .ToListAsync();

            return users.Select(user => new ListUser
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Surname = user.Surname,
                Sicil = user.Sicil,
                UserRoles = GetRolesToUserAsync(user.Id).Result,
                TwoFactorEnabled = user.TwoFactorEnabled,
                UserName = user.UserName,
                UserImages = user.UserImageFiles.Where(x => x.IsActive && !x.IsDeleted).Select(file => new AracTakip.Domain.Entities.File
                {
                    FileName = file.FileName,
                    Path = file.Path,
                    FileDescription = file.FileDescription,
                    Id = file.Id,
                    CreatedDate = file.CreatedDate,
                    IsDeleted = file.IsDeleted,
                    IsActive = file.IsActive,
                    ModifiedDate = file.ModifiedDate,
                    Storage = file.Storage
                }).ToList()
            }).ToList();
        }

        public int TotalUsersCount => _userManager.Users.Count();

        public async Task AssignRoleToUserAsnyc(string userId, string[] roles)
        {
            AppUser user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                await _userManager.RemoveFromRolesAsync(user, userRoles);

                await _userManager.AddToRolesAsync(user, roles);
            }
        }
        public async Task<string[]> GetRolesToUserAsync(string userIdOrName)
        {
            AppUser user = await _userManager.FindByIdAsync(userIdOrName);
            if (user == null)
                user = await _userManager.FindByNameAsync(userIdOrName);

            if (user != null)
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                return userRoles.ToArray();
            }
            return new string[] { };
        }

        public async Task<bool> HasRolePermissionToEndpointAsync(string name, string code)
        {
            var userRoles = await GetRolesToUserAsync(name);

            if (!userRoles.Any())
                return false;

            Endpoint? endpoint = await _endpointReadRepository.Table
                     .Include(e => e.Roles)
                     .FirstOrDefaultAsync(e => e.Code == code);

            if (endpoint == null)
                return false;

            var hasRole = false;
            var endpointRoles = endpoint.Roles.Select(r => r.Name);

            //foreach (var userRole in userRoles)
            //{
            //    if (!hasRole)
            //    {
            //        foreach (var endpointRole in endpointRoles)
            //            if (userRole == endpointRole)
            //            {
            //                hasRole = true;
            //                break;
            //            }
            //    }
            //    else
            //        break;
            //}

            //return hasRole;

            foreach (var userRole in userRoles)
            {
                foreach (var endpointRole in endpointRoles)
                    if (userRole == endpointRole)
                        return true;
            }

            return false;
        }

        public async Task<ListUser> GetByIdUserAsync(string userId)
        {
            var user = await _userManager.Users.Include(x => x.UserImageFiles)
                .FirstOrDefaultAsync(x => x.Id == userId);
            var userRoles = await GetRolesToUserAsync(userId);

            return new()
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Surname = user.Surname,
                Sicil = user.Sicil,
                TwoFactorEnabled = user.TwoFactorEnabled,
                UserName = user.UserName,
                UserRoles = userRoles,
                UserImages = user.UserImageFiles.Select(file => new AracTakip.Domain.Entities.File
                {
                    FileName = file.FileName,
                    Path = file.Path,
                    FileDescription = file.FileDescription,
                    Id = file.Id,
                    CreatedDate = file.CreatedDate,
                    IsDeleted = file.IsDeleted,
                    IsActive = file.IsActive,
                    ModifiedDate = file.ModifiedDate,
                    Storage = file.Storage
                }).ToList()

            };
        }
        public async Task<ListUser> GetByUserNameAsync(string userName)
        {
            var user = await _userManager.Users.Include(x => x.UserImageFiles)
                .FirstOrDefaultAsync(x => x.NormalizedUserName == userName.ToUpper());
            var userRoles = await GetRolesToUserAsync(userName);
            if (user != null)
                return new()
                {
                    Id = user.Id,
                    Email = user.Email,
                    Name = user.Name,
                    Surname = user.Surname,
                    Sicil = user.Sicil,
                    TwoFactorEnabled = user.TwoFactorEnabled,
                    UserName = user.UserName,
                    UserRoles = userRoles,
                    UserImages = user.UserImageFiles.Select(file => new AracTakip.Domain.Entities.File
                    {
                        FileName = file.FileName,
                        Path = file.Path,
                        FileDescription = file.FileDescription,
                        Id = file.Id,
                        CreatedDate = file.CreatedDate,
                        IsDeleted = file.IsDeleted,
                        IsActive = file.IsActive,
                        ModifiedDate = file.ModifiedDate,
                        Storage = file.Storage
                    }).ToList()
                };
            else
                return new();
        }
    }
}
