using AracTakip.Application.Abstractions.Hubs;
using AracTakip.Application.Abstractions.Storage;
using AracTakip.Application.Repositories.Car;
using AracTakip.Application.Repositories.CarReservation;
using AracTakip.Application.Repositories.CarReservationApproval;
using AracTakip.Application.Repositories.CarReservationProcess;
using AracTakip.Application.Repositories.CarReservationUser;
using AracTakip.Application.Repositories.CarReservationUserImageFile;
using AracTakip.Application.Repositories.ReservationStatus;
using AracTakip.Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace AracTakip.Application.Features.Commands.CarReservation.CreateCarReservation
{
    public class CreateCarReservationCommandHandler : IRequestHandler<CreateCarReservationCommandRequest, CreateCarReservationCommandResponse>
    {
        readonly IStorageService _storageService;
        readonly ICarReservationHubService _carReservationHubService;
        readonly ICarReservationWriteRepository _carReservationWriteRepository;
        readonly ICarReservationApprovalWriteRepository _carReservationApprovalWriteRepository;
        readonly ICarReservationProcessWriteRepository _carReservationProcessWriteRepository;
        readonly IReservationStatusReadRepository _reservationStatusReadRepository;
        readonly ICarReservationUserImageFileWriteRepository _carReservationUserImageFileWriteRepository;
        readonly ICarReservationUserWriteRepository _carReservationUserWriteRepository;
        readonly ICarReservationUserReadRepository _carReservationUserReadRepository;
        readonly ICarReadRepository _carReadRepository;
        readonly ILogger<CreateCarReservationCommandHandler> _logger;

        public CreateCarReservationCommandHandler(ICarReservationWriteRepository carReservationWriteRepository, ILogger<CreateCarReservationCommandHandler> logger, ICarReservationHubService carReservationHubService, ICarReservationApprovalWriteRepository carReservationApprovalWriteRepository, ICarReservationProcessWriteRepository carReservationProcessWriteRepository, IReservationStatusReadRepository reservationStatusReadRepository, ICarReservationUserImageFileWriteRepository carReservationUserImageFileWriteRepository, ICarReservationUserWriteRepository carReservationUserWriteRepository, IStorageService storageService, ICarReservationUserReadRepository carReservationUserReadRepository, ICarReadRepository carReadRepository)
        {
            _carReservationWriteRepository = carReservationWriteRepository;
            _logger = logger;
            _carReservationHubService = carReservationHubService;
            _carReservationApprovalWriteRepository = carReservationApprovalWriteRepository;
            _carReservationProcessWriteRepository = carReservationProcessWriteRepository;
            _reservationStatusReadRepository = reservationStatusReadRepository;
            _carReservationUserImageFileWriteRepository = carReservationUserImageFileWriteRepository;
            _carReservationUserWriteRepository = carReservationUserWriteRepository;
            _storageService = storageService;
            _carReservationUserReadRepository = carReservationUserReadRepository;
            _carReadRepository = carReadRepository;
        }

        public async Task<CreateCarReservationCommandResponse> Handle(CreateCarReservationCommandRequest request, CancellationToken cancellationToken)
        {

            //var IsCarCommercial = await _carReadRepository.GetByIdAsync(request.CarId);
            //if (IsCarCommercial.IsCarCommercial)
            //{
            //    foreach (var item in request.ReservationUsers)
            //    {
            //        if (item.IsDriver)
            //            if (item.Files.Count != 4)
            //                return new()
            //                {
            //                    Message = "Lütfen ehliyet, src ve psikoteknik dosyalarınızı eksiksiz yükleyeniz."
            //                };
            //    }
            //}
            //else if (!IsCarCommercial.IsCarCommercial)
            //{
            //    foreach (var item in request.ReservationUsers)
            //    {
            //        if (item.IsDriver)
            //            if (item.Files.Count != 2)
            //                return new()
            //                {
            //                    Message = "Lütfen ehliyet dosyalarınızı eksiksiz yükleyeniz."
            //                };
            //    }
            //}
            /////////////
            /// Rezervasyonun oluşturulması
            /////////////
            var carReservation = new Domain.Entities.CarReservation
            {
                CarId = Guid.Parse(request.CarId),
                StartDateTime = request.StartDateTime,
                EndDateTime = request.EndDateTime,
                ReasonForRequest = request.ReasonForRequest,
                SubReasonForRequest = request.SubReasonForRequest,
                ReasonForRequestDetails = request.ReasonForRequestDetails,
                RouteStart = request.RouteStart,
                RouteEnd = request.RouteEnd,
                ReservationStatus = false,
                PeopleCount = request.PeopleCount,
                DriverCount = request.DriverCount,
                AppUserId = request.AppUserId,
                IsActive = true,
                IsDeleted = false,
                CreatedDate = DateTime.UtcNow,
                ModifiedDate = DateTime.UtcNow,
            };
            await _carReservationWriteRepository.AddAsync(carReservation);
            await _carReservationWriteRepository.SaveAsync();
            await _carReservationHubService.CarReservationAddedMessageAsync("Araç rezervasyonu yapılmıştır...");
            _logger.LogInformation("Araç rezervasyonu yapılmıştır...");
            var rezevationStatus = _reservationStatusReadRepository.GetAll(false).Where(x => x.StatusName == "Bekleniyor").FirstOrDefault();
            if (rezevationStatus == null)
            {
                await _carReservationWriteRepository.RemoveAsync(carReservation.Id.ToString());
                return new() { Message = "Bir hata meydana geldi... Rezervasyon durumlarını kontrol ediniz..." };
            }

            /////////////
            /// Rezervasyon kullanıcılarının eklenmesi
            /////////////


            foreach (var item in request.ReservationUsers)
            {
                var reservationUsers = new CarReservationUser
                {

                    NameSurname = item.NameSurname,
                    TC = item.TC != null ? item.TC : "11111111111",
                    Sicil = item.Sicil != null ? item.Sicil : "11111111111",
                    IsDriver = item.IsDriver,
                    CreatedDate = DateTime.UtcNow,
                    ModifiedDate = DateTime.UtcNow,
                    IsActive = true,
                    IsDeleted = false,
                    CarReservationId = carReservation.Id,
                };
                await _carReservationUserWriteRepository.AddAsync(reservationUsers);
                await _carReservationUserWriteRepository.SaveAsync();
                if (item.Files != null)
                {
                    List<(string fileName, string pathOrContainerName)> result = await _storageService.UploadAsync("resource/reservation-users-images", item.Files);
                    CarReservationUser carReservationUser = await _carReservationUserReadRepository.GetByIdAsync(reservationUsers.Id.ToString());
                    await _carReservationUserImageFileWriteRepository.AddRangeAsync(result.Select((x, index) => new CarReservationUserImageFile
                    {
                        FileName = x.fileName,
                        Path = x.pathOrContainerName,
                        Storage = _storageService.StorageName,
                        CreatedDate = DateTime.UtcNow,
                        ModifiedDate = DateTime.UtcNow,
                        IsActive = true,
                        IsDeleted = false,
                        FileDescription = item.FileDescription[index],
                        CarReservationUsers = new List<CarReservationUser>() { carReservationUser }
                    }).ToList());
                }
            }


            /////////////
            /// Rezervasyon onay tablasonun oluşturulması
            /////////////
            await _carReservationApprovalWriteRepository.AddAsync(new()
            {
                CarReservationId = carReservation.Id,
                ReservationStatusId = rezevationStatus.Id,
                CreatedDate = DateTime.UtcNow,
                ModifiedDate = DateTime.UtcNow,
                IsActive = true,
                IsDeleted = false,
                Note = "Rezervasyon Oluşturuldu.",
            });
            await _carReservationApprovalWriteRepository.SaveAsync();

            /////////////
            /// Rezervasyon işlem tablasonun oluşturulması
            /////////////
            await _carReservationProcessWriteRepository.AddAsync(new()
            {
                CarId = Guid.Parse(request.CarId),
                ReservationStatus = false,
                StartDateTime = carReservation.StartDateTime,
                EndDateTime = carReservation.EndDateTime,
                CreatedDate = DateTime.UtcNow,
                ModifiedDate = DateTime.UtcNow,
                IsActive = true,
                IsDeleted = false
            });
            await _carReservationProcessWriteRepository.SaveAsync();

            return new()
            {
                Message = "Rezervasyon başarıyla oluşturulmuştur."
            };
        }

    }

}

