namespace AracTakip.Application.Abstractions.Hubs
{
    public interface ICompanyHubService
    {
        Task CompanyAddedMessageAsync(string message);
    }
}
