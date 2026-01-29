using Microsoft.EntityFrameworkCore;
using FinanceTracker.API.Models;

namespace FinanceTracker.API.Data
{
    public class FinanceTrackerContext : DbContext
    {
        public FinanceTrackerContext(DbContextOptions<FinanceTrackerContext> options) : base(options)
        {
        }

        public DbSet<Transaction> Transactions { get; set; }
    }
}