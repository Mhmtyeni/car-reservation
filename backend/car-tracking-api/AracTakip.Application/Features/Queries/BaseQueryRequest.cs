using System.ComponentModel;

namespace AracTakip.Application.Features.Queries
{
    public class BaseQueryRequest
    {
        [DefaultValue(0)]
        public int Page { get; set; } = 0;
        [DefaultValue(5)]
        public int Size { get; set; } = 5;
        [DefaultValue(true)]
        public bool IsActive { get; set; } = true;
        [DefaultValue(false)]
        public bool IsDeleted { get; set; } = false;
    }
}
