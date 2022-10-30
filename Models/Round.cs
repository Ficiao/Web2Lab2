using System.Collections.Generic;

namespace Lab1.Models
{
    public class Round
    {
        public Match[] matches;
        public List<Comment> comments;

        public Round()
        {
            comments = new List<Comment>();
        }
    }
}
