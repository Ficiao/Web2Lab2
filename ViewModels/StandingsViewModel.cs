using Lab1.Models;
using System.Collections.Generic;

namespace Lab1.ViewModels
{
    public class StandingsViewModel
    {
        public List<StandingsRow> Standings;

        public StandingsViewModel()
        {
            Standings = new List<StandingsRow>();
        }
    }
}
