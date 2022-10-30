using Lab1.Models;

namespace Lab1.DB
{
    public interface IDataBase
    {
        public abstract Scedule GetSceduleData();
        public abstract void UpdateSceduleData(Match match, int roundId, int matchId);
        public abstract void SendScedule(Scedule scedule);
    }
}
