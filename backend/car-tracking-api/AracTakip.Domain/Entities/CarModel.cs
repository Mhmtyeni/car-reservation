using AracTakip.Domain.Entities.Common;

namespace AracTakip.Domain.Entities
{
    public class CarModel : BaseEntity
    {
        public string CarModelName { get; set; }
        public Guid CarBrandId { get; set; }
        public CarBrand CarBrand { get; set; }
    }
}
