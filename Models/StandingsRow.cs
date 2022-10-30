namespace Lab1.Models
{
    public class StandingsRow
    {
        public int OrderId;
        public string ClubName { get; private set; }
        public int Games;
        public int Wins;
        public int Loses;
        public int Draws;
        public int GoalDifference;
        public int Points;

        public StandingsRow(string clubName)
        {
            OrderId = -1;
            ClubName = clubName;
            Games = 0;
            Wins = 0;
            Loses = 0;
            Draws = 0;
            GoalDifference = 0;
            Points = 0;
        }
    }
}
