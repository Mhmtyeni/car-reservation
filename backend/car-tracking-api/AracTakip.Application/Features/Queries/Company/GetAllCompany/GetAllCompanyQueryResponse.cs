namespace AracTakip.Application.Features.Queries.Company.GetAllCompany
{
    public class GetAllCompanyQueryResponse
    {
        public int TotalCompanyCount { get; set; }
        public object Companies { get; set; }
    }
}