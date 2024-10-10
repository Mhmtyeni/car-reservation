using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AracTakip.Domain.Entities
{
    public class CarImageFile : File
    {
        public bool Showcase { get; set; }
        public ICollection<Car> Cars { get; set; }
    }
}
