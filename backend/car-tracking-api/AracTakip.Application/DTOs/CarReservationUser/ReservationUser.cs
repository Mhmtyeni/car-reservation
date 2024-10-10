using Microsoft.AspNetCore.Http;

namespace AracTakip.Application.DTOs.CarReservationUser
{
    public class ReservationUser
    {
        public string NameSurname { get; set; }
        public string? TC { get; set; }
        public string? Sicil { get; set; }
        public bool IsDriver { get; set; }
        public List<string?> FileDescription { get; set; }
        public IFormFileCollection? Files { get; set; }
    }
}
