using AracTakip.Domain.Entities.Common;
using AracTakip.Domain.Entities;

namespace AracTakip.Domain.Entities
{
    public class Menu : BaseEntity
    {
        public string Name { get; set; }

        public ICollection<Endpoint> Endpoints { get; set; }
    }
}
