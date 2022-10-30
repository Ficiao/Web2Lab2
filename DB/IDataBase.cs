using Lab1.Models;
using System.Collections.Generic;

namespace Lab1.DB
{
    public interface IDataBase
    {
        public abstract Scedule GetSceduleData();
        public abstract void UpdateMatchData(Match match, int roundId, int matchId);
        public abstract void UpdateRoundCommentsData(List<Comment> comments, int roundId);
        public abstract void DeleteComment(int roundId, int commentId);
        public abstract void SendScedule(Scedule scedule);
    }
}
