using AracTakip.Domain.Entities.Common;

namespace AracTakip.Domain.Entities
{
    public class CarBrand : BaseEntity
    {
        public string CarBrandName { get; set; }
        ICollection<CarModel> CarModels { get; set; }
    }
}
