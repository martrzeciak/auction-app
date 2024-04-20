using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Services
{
    public class AuctionSvcHttpClient
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public AuctionSvcHttpClient(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<IEnumerable<Item>> GetItemsForSearchDb()
        {
            var lastUpdated = await DB.Find<Item, string>()
                .Sort(x => x.Descending(a => a.UpdatedAt))
                .Project(x => x.UpdatedAt.ToString())
                .ExecuteFirstAsync();

            return await _httpClient.GetFromJsonAsync<IEnumerable<Item>>(
                _configuration["AuctionServiceUrl"] + "/api/auctions?date=" + lastUpdated);
        }
    }
}
